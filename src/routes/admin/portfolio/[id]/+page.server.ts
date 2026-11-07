import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	// Fetch all services for the foreign key multi-select
	const services = await locals.pb.collection('services').getFullList({ sort: 'title' });

	if (params.id === 'new') {
		return {
			portfolioItem: null,
			availableServices: services.map((s) => ({ id: s.id, title: s.title, slug: s.slug }))
		};
	}

	try {
		const item = await locals.pb.collection('portfolio_items').getOne(params.id, {
			expand: 'category'
		});

		// Ensure category is array of IDs
		let categoryIds: string[] = [];
		if (Array.isArray(item.category)) {
			categoryIds = item.category;
		} else if (item.category) {
			categoryIds = [item.category];
		}

		return {
			portfolioItem: {
				id: item.id,
				title: item.title,
				slug: item.slug,
				client: {
					name: item.client?.name || '',
					company: item.client?.company || '',
					logo: item.client?.logo || '',
					contact_details: item.client?.contact_details || ''
				},
				description: item.description || '',
				categoryIds,
				tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
				featured_image: item.featured_image || '',
				link: item.link || '',
				screenshots: Array.isArray(item.screenshots)
					? item.screenshots
					: item.screenshots
						? [item.screenshots]
						: [],
				video: item.video || '',
				start_date: item.start_date ? item.start_date.substring(0, 10) : '',
				end_date: item.end_date ? item.end_date.substring(0, 10) : '',
				status: item.status || 'ongoing',
				client_testimonial: item.client_testimonial || '',
				collectionId: item.collectionId,
				created: item.created,
				updated: item.updated
			},
			availableServices: services.map((s) => ({ id: s.id, title: s.title, slug: s.slug }))
		};
	} catch {
		throw redirect(303, '/admin/portfolio');
	}
};

export const actions: Actions = {
	save: async ({ request, locals, params }) => {
		const formData = await request.formData();

		const title = formData.get('title') as string;
		const slug = formData.get('slug') as string;
		const description = formData.get('description') as string;
		const link = formData.get('link') as string;
		const video = formData.get('video') as string;
		const start_date = formData.get('start_date') as string;
		const end_date = formData.get('end_date') as string;
		const status = formData.get('status') as string;
		const client_testimonial = formData.get('client_testimonial') as string;
		const tagsRaw = formData.get('tags') as string;

		// Client details JSON
		const client_name = formData.get('client_name') as string;
		const client_company = formData.get('client_company') as string;
		const client_logo = formData.get('client_logo') as string;
		const client_contact = formData.get('client_contact') as string;

		const clientObj = {
			name: client_name || '',
			company: client_company || '',
			logo: client_logo || '',
			contact_details: client_contact || ''
		};

		// Categories (foreign key relation to services, multi-select)
		const selectedServices = formData.getAll('category') as string[];

		// Files
		const featuredImage = formData.get('featured_image') as File;
		const removeFeaturedImage = formData.get('remove_featured_image') === '1';
		const screenshotFiles = formData.getAll('screenshots') as File[];
		const deleteScreenshots = formData.getAll('delete_screenshots') as string[];

		if (!title || !slug) {
			return fail(400, { error: 'Project Title and Slug are required.' });
		}

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
			data.append('link', link || '');
			data.append('video', video || '');
			if (start_date) data.append('start_date', start_date);
			if (end_date) data.append('end_date', end_date);
			data.append('status', status || 'ongoing');
			data.append('client_testimonial', client_testimonial || '');
			data.append('tags', JSON.stringify(tags));
			data.append('client', JSON.stringify(clientObj));

			// Append each selected service ID for the multi-relation category field
			if (selectedServices.length === 0) {
				data.append('category', '');
			} else {
				for (const svcId of selectedServices) {
					if (svcId) data.append('category', svcId);
				}
			}

			// Featured image
			if (removeFeaturedImage) {
				data.append('featured_image', '');
			} else if (featuredImage && featuredImage.size > 0) {
				data.append('featured_image', featuredImage);
			}

			// Screenshots - new uploads
			for (const file of screenshotFiles) {
				if (file && file.size > 0) {
					data.append('screenshots', file);
				}
			}

			// Screenshots to remove
			for (const filename of deleteScreenshots) {
				if (filename) {
					data.append('screenshots-', filename);
				}
			}

			if (params.id !== 'new') {
				await locals.pb.collection('portfolio_items').update(params.id, data);
			} else {
				await locals.pb.collection('portfolio_items').create(data);
			}

			throw redirect(303, '/admin/portfolio');
		} catch (err: unknown) {
			if (
				typeof err === 'object' &&
				err !== null &&
				'status' in err &&
				(err as { status: number }).status === 303
			)
				throw err;
			console.error('Portfolio save error:', err);
			const msg = err instanceof Error ? err.message : 'Failed to save portfolio item.';
			return fail(400, { error: msg });
		}
	}
};
