import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (params.id === 'new') {
		return { service: null };
	}

	try {
		const service = await locals.pb.collection('services').getOne(params.id);
		return {
			service: {
				id: service.id,
				title: service.title,
				slug: service.slug,
				description: service.description || '',
				price_range: service.price_range || '',
				price_period: service.price_period || '',
				featured_image: service.featured_image || '',
				collectionId: service.collectionId,
				created: service.created,
				updated: service.updated
			}
		};
	} catch {
		throw redirect(303, '/admin/services');
	}
};

export const actions: Actions = {
	save: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const slug = formData.get('slug') as string;
		const description = formData.get('description') as string;
		const price_range = formData.get('price_range') as string;
		const price_period = formData.get('price_period') as string;
		const featuredImage = formData.get('featured_image') as File;
		const removeFeaturedImage = formData.get('remove_featured_image') === '1';

		if (!title || !slug) return fail(400, { error: 'Title and Slug are required fields.' });

		try {
			const data = new FormData();
			data.append('title', title);
			data.append('slug', slug.trim().toLowerCase());
			data.append('description', description || '');
			data.append('price_range', price_range || '');
			data.append('price_period', price_period || '');

			if (removeFeaturedImage) data.append('featured_image', '');
			if (featuredImage && featuredImage.size > 0) data.append('featured_image', featuredImage);

			if (params.id !== 'new') {
				await locals.pb.collection('services').update(params.id, data);
			} else {
				await locals.pb.collection('services').create(data);
			}

			throw redirect(303, '/admin/services');
		} catch (err: unknown) {
			if (
				typeof err === 'object' &&
				err !== null &&
				'status' in err &&
				(err as { status: number }).status === 303
			)
				throw err;
			const msg = err instanceof Error ? err.message : 'Failed to save service.';
			return fail(400, { error: msg });
		}
	}
};
