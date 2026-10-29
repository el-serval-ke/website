import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const isLoginPage = url.pathname === '/admin/login';
	const isAuthenticated = locals.pb.authStore.isValid && !!locals.user;

	if (!isAuthenticated && !isLoginPage) {
		throw redirect(303, '/admin/login');
	}

	if (isAuthenticated && isLoginPage) {
		throw redirect(303, '/admin');
	}

	return {
		user: locals.user ? { email: locals.user.email, id: locals.user.id } : null
	};
};
