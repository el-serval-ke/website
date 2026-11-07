import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
	const page = Number(url.searchParams.get('page') || 1);
	const search = url.searchParams.get('q') || '';
	const perPage = 15;

	try {
		const filter = search ? `title ~ "${search}" || slug ~ "${search}"` : undefined;
		const result = await locals.pb.collection('blogs').getList(page, perPage, {
			sort: '-created',
			filter,
			expand: 'category'
		});

		const categories = await locals.pb.collection('blog_categories').getFullList({ sort: 'title' });

		return {
			blogs: result.items.map((b) => ({
				id: b.id,
				title: b.title,
				slug: b.slug,
				category: b.expand?.category?.title || 'Uncategorized',
				categoryId: b.category,
				tags: b.tags || [],
				created: b.created,
				updated: b.updated
			})),
			totalPages: result.totalPages,
			totalItems: result.totalItems,
			currentPage: page,
			search,
			categories: categories.map((c) => ({ id: c.id, title: c.title, slug: c.slug }))
		};
	} catch (err: unknown) {
		console.error('Blogs list error:', err);
		return { blogs: [], totalPages: 1, totalItems: 0, currentPage: 1, search, categories: [] };
	}
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) return fail(400, { error: 'Missing ID.' });
		try {
			await locals.pb.collection('blogs').delete(id);
			return { success: true };
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Delete failed.';
			return fail(400, { error: msg });
		}
	}
};
