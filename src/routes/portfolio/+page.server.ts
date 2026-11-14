import type { PageServerLoad } from './$types';
import { portfolioItems as fallbackItems } from '$lib/data/portfolio';
import { getFileUrl } from '$lib/pocketbase';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const [pbItems] = await Promise.all([
			locals.pb.collection('portfolio_items').getFullList({
				sort: '-created',
				expand: 'category'
			})
		]);

		if (pbItems.length > 0) {
			const items = pbItems.map((p) => {
				const categories = Array.isArray(p.expand?.category)
					? p.expand.category
					: p.expand?.category
						? [p.expand.category]
						: [];

				const categoryNames = categories
					.map((c: { title?: string }) => c.title || '')
					.filter(Boolean);
				const categoryDisplay = categoryNames.join(' & ') || 'Digital Specialist';

				// Extract clean text summary from TinyMCE HTML description
				const cleanSummary = p.description
					? p.description
							.replace(/<[^>]+>/g, ' ')
							.replace(/\s+/g, ' ')
							.trim()
							.substring(0, 180) + '...'
					: 'Bespoke implementation tailored for commercial goals.';

				// Compute timeline string
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

				const heroImage = p.featured_image
					? getFileUrl(p, p.featured_image)
					: '/images/kilimo-home-feature.png';

				return {
					id: p.id,
					slug: p.slug,
					title: p.title,
					tagline: categoryDisplay,
					category: categoryDisplay,
					services: categories.map((c: { id: string; title: string; slug: string }) => ({
						id: c.id,
						title: c.title,
						slug: c.slug
					})),
					tags: Array.isArray(p.tags) ? p.tags : [],
					client: p.client?.name ? `${p.client.name} (${p.client.company || 'Client'})` : 'Client',
					timeline: timeline || 'Recent Project',
					heroImage,
					summary: cleanSummary,
					status: p.status || 'concluded'
				};
			});

			// Build dynamic filter list from services
			const filterSet = new Set<string>();
			for (const item of items) {
				for (const s of item.services) {
					if (s.title) filterSet.add(s.title);
				}
				for (const t of item.tags) {
					if (t) filterSet.add(t);
				}
			}

			const filters = ['All work', ...Array.from(filterSet).slice(0, 6)];

			return {
				items,
				filters
			};
		}
	} catch (err: unknown) {
		console.error('Portfolio public load error:', err);
	}

	return {
		items: fallbackItems.map((f) => ({
			...f,
			id: f.slug,
			services: [],
			status: 'concluded'
		})),
		filters: ['All work', 'Web Development', 'Website Revamp', 'SEO Foundations']
	};
};
