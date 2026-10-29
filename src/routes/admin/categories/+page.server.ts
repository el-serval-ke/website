import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const categories = await locals.pb.collection('blog_categories').getFullList({
			sort: 'title'
		});

		// Count blogs per category
		const blogs = await locals.pb.collection('blogs').getFullList({
			fields: 'id,category'
		});

		const countMap = new Map<string, number>();
		for (const b of blogs) {
			if (b.category) {
				countMap.set(b.category, (countMap.get(b.category) || 0) + 1);
			}
		}

		return {
			categories: categories.map((c) => ({
				id: c.id,
				title: c.title,
				slug: c.slug,
				description: c.description || '',
				featured_image: c.featured_image || '',
				blogsCount: countMap.get(c.id) || 0,
				created: c.created,
				updated: c.updated
			}))
		};
	} catch (err: any) {
		console.error('Error loading blog categories:', err);
		return { categories: [] };
	}
};

export const actions: Actions = {
	save: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const title = formData.get('title') as string;
		const slug = formData.get('slug') as string;
		const description = formData.get('description') as string;
		const featuredImage = formData.get('featured_image') as File;

		if (!title || !slug) {
			return fail(400, { error: 'Title and Slug are required fields.' });
		}

		try {
			const data = new FormData();
			data.append('title', title);
			data.append('slug', slug.trim().toLowerCase());
			data.append('description', description || '');

			if (featuredImage && featuredImage.size > 0) {
				data.append('featured_image', featuredImage);
			}

			if (id) {
				await locals.pb.collection('blog_categories').update(id, data);
			} else {
				await locals.pb.collection('blog_categories').create(data);
			}

			return { success: true };
		} catch (err: any) {
			console.error('Save category error:', err);
			return fail(400, { error: err?.message || 'Failed to save category.' });
		}
	},

	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { error: 'Category ID is missing.' });
		}

		try {
			await locals.pb.collection('blog_categories').delete(id);
			return { success: true };
		} catch (err: any) {
			console.error('Delete category error:', err);
			return fail(400, { error: err?.message || 'Failed to delete category.' });
		}
	}
};
