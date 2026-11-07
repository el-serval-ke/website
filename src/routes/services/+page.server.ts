import type { PageServerLoad } from './$types';
import { services as fallbackServices } from '$lib/data/services';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const pbServices = await locals.pb.collection('services').getFullList({
			sort: '-created'
		});

		if (pbServices.length > 0) {
			const services = pbServices.map((s, i) => {
				// Strip HTML tags for summary preview if needed
				const cleanSummary = s.description
					? s.description
							.replace(/<[^>]+>/g, ' ')
							.replace(/\s+/g, ' ')
							.trim()
							.substring(0, 160) + '...'
					: 'Bespoke implementation tailored for your commercial goals.';

				return {
					id: s.id,
					slug: s.slug,
					index: (i + 1).toString().padStart(2, '0'),
					title: s.title,
					tagline: s.title,
					summary: cleanSummary,
					descriptionHtml: s.description || '',
					audience: 'For Kenyan small and medium businesses.',
					priceRange: s.price_range || 'Custom',
					pricePeriod: s.price_period || '',
					featured_image: s.featured_image || '',
					scope: [
						'Detailed technical scope',
						'Implementation & QA testing',
						'Handover & ongoing care'
					]
				};
			});

			return { services };
		}
	} catch (err: unknown) {
		console.error('Services public load error:', err);
	}

	return { services: fallbackServices };
};
