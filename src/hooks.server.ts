import { redirect, type Handle } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// Only protect /admin routes (except /admin/login)
	if (event.url.pathname.startsWith('/admin') && !event.url.pathname.startsWith('/admin/login')) {
		const user = await validateSession(event.cookies);

		if (!user) {
			throw redirect(303, '/admin/login');
		}

		// Attach user data to event.locals so pages can access it
		event.locals.user = user;
	}

	return resolve(event);
};
