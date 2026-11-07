import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	const categories = await locals.pb.collection('blog_categories').getFullList({ sort: 'title' });

	if (params.id === 'new') {
		return {
			blog: null,
			categories: categories.map((c) => ({ id: c.id, title: c.title }))
		};
	}

	try {
		const blog = await locals.pb.collection('blogs').getOne(params.id, { expand: 'category' });
		return {
			blog: {
				id: blog.id,
				title: blog.title,
				slug: blog.slug,
				description: blog.description || '',
				tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
				categoryId: blog.category || '',
				featured_image: blog.featured_image || '',
				collectionId: blog.collectionId,
				created: blog.created,
				updated: blog.updated
			},
			categories: categories.map((c) => ({ id: c.id, title: c.title }))
		};
	} catch {
		throw redirect(303, '/admin/blogs');
	}
};

export const actions: Actions = {
	save: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const slug = formData.get('slug') as string;
		const description = formData.get('description') as string;
		const tagsRaw = formData.get('tags') as string;
		const categoryId = formData.get('category') as string;
		const featuredImage = formData.get('featured_image') as File;
		const removeFeaturedImage = formData.get('remove_featured_image') === '1';

		if (!title || !slug) return fail(400, { error: 'Title and Slug are required.' });

		const tags = tagsRaw
			? tagsRaw
					.split(',')
					.map((t) => t.trim())
					.filter(Boolean)
			: [];

		try {
			const data = new FormData();
			data.append('title', title);
			data.append('slug', slug.trim().toLowerCase());
			data.append('description', description || '');
			data.append('tags', JSON.stringify(tags));
			if (categoryId) data.append('category', categoryId);
			if (removeFeaturedImage) data.append('featured_image', '');
			if (featuredImage && featuredImage.size > 0) data.append('featured_image', featuredImage);

			if (params.id !== 'new') {
				await locals.pb.collection('blogs').update(params.id, data);
			} else {
				await locals.pb.collection('blogs').create(data);
			}

			throw redirect(303, '/admin/blogs');
		} catch (err: unknown) {
			if (
				typeof err === 'object' &&
				err !== null &&
				'status' in err &&
				(err as { status: number }).status === 303
			)
				throw err;
			const msg = err instanceof Error ? err.message : 'Save failed.';
			return fail(400, { error: msg });
		}
	}
};
