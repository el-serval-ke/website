import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const [blogsRes, categoriesRes, portfolioRes, servicesRes] = await Promise.all([
			locals.pb.collection('blogs').getList(1, 5, {
				sort: '-created',
				expand: 'category'
			}),
			locals.pb.collection('blog_categories').getList(1, 50, {
				sort: 'title'
			}),
			locals.pb.collection('portfolio_items').getList(1, 5, {
				sort: '-created'
			}),
			locals.pb.collection('services').getList(1, 10, {
				sort: '-created'
			})
		]);

		return {
			stats: {
				blogsCount: blogsRes.totalItems,
				categoriesCount: categoriesRes.totalItems,
				portfolioCount: portfolioRes.totalItems,
				servicesCount: servicesRes.totalItems
			},
			recentBlogs: blogsRes.items.map((b) => ({
				id: b.id,
				title: b.title,
				slug: b.slug,
				category: b.expand?.category?.title || 'Uncategorized',
				created: b.created
			})),
			recentPortfolio: portfolioRes.items.map((p) => ({
				id: p.id,
				title: p.title,
				slug: p.slug,
				category: p.category || 'General',
				status: p.status || 'ongoing',
				clientName: p.client?.company || p.client?.name || 'Client',
				created: p.created
			})),
			services: servicesRes.items.map((s) => ({
				id: s.id,
				title: s.title,
				slug: s.slug,
				priceRange: s.price_range || 'Custom',
				pricePeriod: s.price_period || ''
			}))
		};
	} catch (err: any) {
		console.error('Error fetching admin dashboard data:', err);
		return {
			stats: { blogsCount: 0, categoriesCount: 0, portfolioCount: 0, servicesCount: 0 },
			recentBlogs: [],
			recentPortfolio: [],
			services: []
		};
	}
};
