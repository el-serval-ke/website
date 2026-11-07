import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
	const page = Number(url.searchParams.get('page') || 1);
	const search = url.searchParams.get('q') || '';
	const perPage = 20;

	try {
		const filter = search ? `title ~ "${search}" || slug ~ "${search}"` : undefined;
		const result = await locals.pb.collection('services').getList(page, perPage, {
			sort: '-created',
			filter
		});

		return {
			services: result.items.map((s) => ({
				id: s.id,
				title: s.title,
				slug: s.slug,
				price_range: s.price_range || '',
				price_period: s.price_period || '',
				featured_image: s.featured_image || '',
				created: s.created,
				updated: s.updated
			})),
			totalPages: result.totalPages,
			totalItems: result.totalItems,
			currentPage: page,
			search
		};
	} catch (err: unknown) {
		console.error('Services list error:', err);
		return { services: [], totalPages: 1, totalItems: 0, currentPage: 1, search };
	}
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) return fail(400, { error: 'Missing service ID.' });

		try {
			await locals.pb.collection('services').delete(id);
			return { success: true };
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Delete failed.';
			return fail(400, { error: msg });
		}
	}
};
