import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.pb.authStore.isValid && locals.user) {
		throw redirect(303, '/admin');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'Please provide both email and password.' });
		}

		try {
			// Superuser auth in PocketBase
			await locals.pb.collection('_superusers').authWithPassword(email, password);

			// Store auth cookie
			const cookieVal = locals.pb.authStore.exportToCookie({
				httpOnly: true,
				secure: false,
				sameSite: 'lax',
				path: '/'
			});

			// Extract cookie attributes and set via cookies helper
			const [cookieNameVal] = cookieVal.split(';');
			const [name, val] = cookieNameVal.split('=');
			cookies.set(name.trim(), val.trim(), {
				path: '/',
				httpOnly: true,
				secure: false,
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 7 // 7 days
			});
		} catch (err: any) {
			return fail(401, {
				error: err?.message || 'Invalid administrator credentials. Please check and retry.'
			});
		}

		throw redirect(303, '/admin');
	}
};
