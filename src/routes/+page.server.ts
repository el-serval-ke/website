import type { PageServerLoad } from './$types';
import { services as fallbackServices } from '$lib/data/services';
import { articles as fallbackArticles } from '$lib/data/blog';
import { portfolioItems as fallbackPortfolio } from '$lib/data/portfolio';
import { getFileUrl } from '$lib/pocketbase';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const [pbServices, pbBlogs, pbPortfolio] = await Promise.all([
			locals.pb.collection('services').getList(1, 6, {
				sort: '-created'
			}),
			locals.pb.collection('blogs').getList(1, 3, {
				sort: '-created',
				expand: 'category'
			}),
			locals.pb.collection('portfolio_items').getList(1, 3, {
				sort: '-created',
				expand: 'category'
			})
		]);

		const services =
			pbServices.items.length > 0
				? pbServices.items.map((s, i) => {
						const cleanSummary = s.description
							? s.description
									.replace(/<[^>]+>/g, ' ')
									.replace(/\s+/g, ' ')
									.trim()
									.substring(0, 160) + '...'
							: 'Bespoke digital architecture tailored for your commercial goals.';

						return {
							id: s.id,
							slug: s.slug,
							index: (i + 1).toString().padStart(2, '0'),
							title: s.title,
							tagline: s.title,
							summary: cleanSummary,
							priceRange: s.price_range || 'Custom',
							pricePeriod: s.price_period || '',
							featured_image: s.featured_image ? getFileUrl(s, s.featured_image) : ''
						};
					})
				: fallbackServices;

		const articles =
			pbBlogs.items.length > 0
				? pbBlogs.items.map((b) => {
						const cat = b.expand?.category;
						const cleanText = (b.description || '')
							.replace(/<[^>]+>/g, ' ')
							.replace(/\s+/g, ' ')
							.trim();
						const words = cleanText ? cleanText.split(/\s+/).length : 0;
						const readTime = `${Math.max(2, Math.ceil(words / 180))} min read`;

						const createdDate = b.created
							? new Date(b.created).toLocaleDateString('en-GB', {
									day: 'numeric',
									month: 'short',
									year: 'numeric'
								})
							: 'Recent';

						return {
							id: b.id,
							slug: b.slug,
							title: b.title,
							category: cat?.title || 'General',
							categorySlug: cat?.slug || 'general',
							readTime,
							createdDate,
							summary: cleanText.substring(0, 140) + '...'
						};
					})
				: fallbackArticles.slice(0, 3).map((a) => ({
						id: a.slug,
						slug: a.slug,
						title: a.title,
						category: a.category,
						categorySlug: a.categorySlug,
						readTime: a.readTime,
						createdDate: a.createdDate,
						summary: a.summary
					}));

		const portfolio =
			pbPortfolio.items.length > 0
				? pbPortfolio.items.map((p) => {
						const categories = Array.isArray(p.expand?.category)
							? p.expand.category
							: p.expand?.category
								? [p.expand.category]
								: [];

						const categoryDisplay =
							categories
								.map((c: { title?: string }) => c.title || '')
								.filter(Boolean)
								.join(' & ') || 'Digital Specialist';

						return {
							id: p.id,
							slug: p.slug,
							title: p.title,
							category: categoryDisplay,
							heroImage: p.featured_image
								? getFileUrl(p, p.featured_image)
								: '/images/kilimo-home-feature.png',
							summary: p.description
								? p.description
										.replace(/<[^>]+>/g, ' ')
										.trim()
										.substring(0, 140) + '...'
								: ''
						};
					})
				: fallbackPortfolio.slice(0, 3).map((f) => ({
						id: f.slug,
						slug: f.slug,
						title: f.title,
						category: f.category,
						heroImage: f.heroImage,
						summary: f.summary
					}));

		return {
			services,
			articles,
			portfolio
		};
	} catch (err: unknown) {
		console.warn('Home page SSR load error, using fallbacks:', err);
		return {
			services: fallbackServices,
			articles: fallbackArticles.slice(0, 3).map((a) => ({
				id: a.slug,
				slug: a.slug,
				title: a.title,
				category: a.category,
				categorySlug: a.categorySlug,
				readTime: a.readTime,
				createdDate: a.createdDate,
				summary: a.summary
			})),
			portfolio: fallbackPortfolio.slice(0, 3).map((f) => ({
				id: f.slug,
				slug: f.slug,
				title: f.title,
				category: f.category,
				heroImage: f.heroImage,
				summary: f.summary
			}))
		};
	}
};
