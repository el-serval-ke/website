import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
	const pbUrl = env.POCKETBASE_URL || 'http://127.0.0.1:8090';
	event.locals.pb = new PocketBase(pbUrl);

	// Load auth state from cookie
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			// In PocketBase v0.23+/v0.40+, superusers are under _superusers collection
			await event.locals.pb.collection('_superusers').authRefresh();
		}
	} catch {
		// Clear auth if refresh fails
		event.locals.pb.authStore.clear();
	}

	event.locals.user = event.locals.pb.authStore.record;

	const response = await resolve(event);

	// Send updated auth cookie back to client
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			httpOnly: true,
			secure: false,
			sameSite: 'lax',
			path: '/'
		})
	);

	return response;
};
