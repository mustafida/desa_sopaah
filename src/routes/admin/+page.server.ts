import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Akan diredirect ke dashboard.
	// Jika belum login, hooks.server.ts akan otomatis mencegat
	// dan me-redirect-nya ke /admin/login
	throw redirect(302, '/admin/dashboard');
};
