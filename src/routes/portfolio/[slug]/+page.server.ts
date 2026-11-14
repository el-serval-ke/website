import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { portfolioItems as fallbackItems } from '$lib/data/portfolio';
import { getFileUrl } from '$lib/pocketbase';

export const load: PageServerLoad = async ({ locals, params }) => {
	try {
		const p = await locals.pb
			.collection('portfolio_items')
			.getFirstListItem(`slug="${params.slug}"`, { expand: 'category' });

		if (p) {
			const categories = Array.isArray(p.expand?.category)
				? p.expand.category
				: p.expand?.category
					? [p.expand.category]
					: [];

			const categoryNames = categories
				.map((c: { title?: string }) => c.title || '')
				.filter(Boolean);
			const categoryDisplay = categoryNames.join(' & ') || 'Digital Specialist';

			const heroImage = p.featured_image
				? getFileUrl(p, p.featured_image)
				: '/images/kilimo-home-feature.png';

			const screenshots = Array.isArray(p.screenshots)
				? p.screenshots.map((s: string) => getFileUrl(p, s)).filter(Boolean)
				: [];

			let timeline = '';
			if (p.start_date && p.end_date) {
				const start = new Date(p.start_date).toLocaleDateString('en-GB', {
					month: 'short',
					year: 'numeric'
				});
				const end = new Date(p.end_date).toLocaleDateString('en-GB', {
					month: 'short',
					year: 'numeric'
				});
				timeline = `${start} — ${end}`;
			} else if (p.start_date) {
				timeline = `Started ${new Date(p.start_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`;
			}

			// Clean summary from description
			const cleanSummary = p.description
				? p.description
						.replace(/<[^>]+>/g, ' ')
						.replace(/\s+/g, ' ')
						.trim()
						.substring(0, 180) + '...'
				: '';

			return {
				item: {
					id: p.id,
					title: p.title,
					slug: p.slug,
					tagline: categoryDisplay,
					category: categoryDisplay,
					services: categories.map((c: { id: string; title: string; slug: string }) => ({
						id: c.id,
						title: c.title,
						slug: c.slug
					})),
					tags: Array.isArray(p.tags) ? p.tags : [],
					client: p.client || { name: 'Direct Client', company: '', contact_details: '' },
					timeline: timeline || 'Recent Project',
					scope: categoryNames.length > 0 ? categoryNames.join(', ') : 'End-to-end implementation',
					heroImage,
					summary: cleanSummary,
					descriptionHtml: p.description || '',
					client_testimonial: p.client_testimonial || '',
					link: p.link || '',
					status: p.status || 'concluded',
					screenshots,
					video: p.video || '',
					// Fallback structure for legacy challenge/approach/solution if descriptionHtml is short
					challenge: null,
					approach: null,
					solution: null
				}
			};
		}
	} catch (err: unknown) {
		console.warn('Portfolio item fetch from PocketBase not found, trying fallback:', err);
	}

	const fallback = fallbackItems.find((p) => p.slug === params.slug);
	if (!fallback) {
		throw error(404, 'Portfolio item not found');
	}

	return {
		item: {
			id: fallback.slug,
			title: fallback.title,
			slug: fallback.slug,
			tagline: fallback.tagline,
			category: fallback.category,
			services: [],
			tags: fallback.tags,
			client: { name: fallback.client, company: '', contact_details: '' },
			timeline: fallback.timeline,
			scope: fallback.scope,
			heroImage: fallback.heroImage,
			summary: fallback.summary,
			descriptionHtml: '',
			client_testimonial: '',
			link: '',
			status: 'concluded',
			screenshots: [],
			video: '',
			challenge: fallback.challenge,
			approach: fallback.approach,
			solution: fallback.solution
		}
	};
};
