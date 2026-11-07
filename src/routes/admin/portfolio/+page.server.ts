import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
	const page = Number(url.searchParams.get('page') || 1);
	const search = url.searchParams.get('q') || '';
	const perPage = 15;

	try {
		const filter = search ? `title ~ "${search}" || slug ~ "${search}"` : undefined;
		const result = await locals.pb.collection('portfolio_items').getList(page, perPage, {
			sort: '-created',
			filter,
			expand: 'category'
		});

		return {
			portfolioItems: result.items.map((p) => {
				const serviceCategories: string[] = Array.isArray(p.expand?.category)
					? (p.expand.category as Array<{ title: string }>).map((s) => s.title)
					: (p.expand?.category as { title?: string } | undefined)?.title
						? [(p.expand.category as { title: string }).title]
						: [];

				return {
					id: p.id,
					title: p.title,
					slug: p.slug,
					clientCompany: p.client?.company || p.client?.name || 'Private Client',
					clientName: p.client?.name || '',
					services: serviceCategories,
					status: p.status || 'ongoing',
					featured_image: p.featured_image || '',
					link: p.link || '',
					start_date: p.start_date || '',
					end_date: p.end_date || '',
					created: p.created,
					updated: p.updated
				};
			}),
			totalPages: result.totalPages,
			totalItems: result.totalItems,
			currentPage: page,
			search
		};
	} catch (err: unknown) {
		console.error('Portfolio list error:', err);
		return { portfolioItems: [], totalPages: 1, totalItems: 0, currentPage: 1, search };
	}
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) return fail(400, { error: 'Missing portfolio item ID.' });

		try {
			await locals.pb.collection('portfolio_items').delete(id);
			return { success: true };
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Delete failed.';
			return fail(400, { error: msg });
		}
	}
};
