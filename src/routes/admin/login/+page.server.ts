import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { adminUsers } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword, createSession, validateSession } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies }) => {
	// If already logged in, redirect to dashboard
	const user = await validateSession(cookies);
	if (user) {
		throw redirect(303, '/admin/dashboard');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username')?.toString().trim();
		const password = formData.get('password')?.toString();

		if (!username || !password) {
			return fail(400, { error: 'Username dan password harus diisi', username });
		}

		// Find user in database
		const users = await db
			.select()
			.from(adminUsers)
			.where(eq(adminUsers.username, username))
			.limit(1);

		if (users.length === 0) {
			return fail(401, { error: 'Username atau password salah', username });
		}

		const user = users[0];

		// Verify password
		if (!verifyPassword(password, user.passwordHash)) {
			return fail(401, { error: 'Username atau password salah', username });
		}

		// Create session
		await createSession(user.id, cookies);

		throw redirect(303, '/admin/dashboard');
	}
};
