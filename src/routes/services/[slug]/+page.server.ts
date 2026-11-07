import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { services as fallbackServices } from '$lib/data/services';

export const load: PageServerLoad = async ({ locals, params }) => {
	try {
		const s = await locals.pb.collection('services').getFirstListItem(`slug="${params.slug}"`);
		if (s) {
			const cleanSummary = s.description
				? s.description
						.replace(/<[^>]+>/g, ' ')
						.replace(/\s+/g, ' ')
						.trim()
						.substring(0, 180) + '...'
				: '';

			return {
				service: {
					id: s.id,
					slug: s.slug,
					index: '01',
					title: s.title,
					tagline: s.title,
					summary: cleanSummary,
					descriptionHtml: s.description || '',
					audience: 'For Kenyan small and medium businesses.',
					priceRange: s.price_range || 'Custom',
					pricePeriod: s.price_period || '',
					scope: [
						'Detailed technical scope',
						'Implementation & QA testing',
						'Handover & ongoing care'
					],
					deliverables: ['Full configuration', 'Production testing', 'Handover documentation'],
					benefits: [
						{
							title: 'Relevant visibility',
							desc: 'Attract qualified prospective clients searching locally.'
						},
						{
							title: 'Reliable performance',
							desc: 'Ensure smooth visits across mobile devices and local networks.'
						}
					],
					timeline: [
						{
							step: 'Phase 1',
							title: 'Audit & priorities',
							desc: 'Understanding your baseline and immediate fixes.'
						},
						{
							step: 'Phase 2',
							title: 'Implementation',
							desc: 'Focused technical execution and verification.'
						}
					],
					faqs: []
				}
			};
		}
	} catch {
		// Try fallback
	}

	const fallback = fallbackServices.find((s) => s.slug === params.slug);
	if (!fallback) {
		throw error(404, 'Service not found');
	}

	return { service: fallback };
};
