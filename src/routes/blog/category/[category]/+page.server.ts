import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { articles as fallbackArticles, categories as fallbackCategories } from '$lib/data/blog';

export const load: PageServerLoad = async ({ locals, params }) => {
	const catSlug = (params.category || '').toLowerCase();

	try {
		const [category, allCats, allBlogs] = await Promise.all([
			locals.pb.collection('blog_categories').getFirstListItem(`slug="${catSlug}"`),
			locals.pb.collection('blog_categories').getFullList({ sort: 'title' }),
			locals.pb.collection('blogs').getFullList({ sort: '-created', expand: 'category' })
		]);

		if (category) {
			const catCounts = new Map<string, number>();
			for (const b of allBlogs) {
				const cSlug = b.expand?.category?.slug;
				if (cSlug) {
					catCounts.set(cSlug, (catCounts.get(cSlug) || 0) + 1);
				}
			}

			const filterList = [
				{ name: 'All', count: allBlogs.length.toString().padStart(2, '0'), slug: 'all' },
				...allCats.map((c) => ({
					name: c.title,
					count: (catCounts.get(c.slug) || 0).toString().padStart(2, '0'),
					slug: c.slug
				}))
			];

			const catBlogs = allBlogs.filter(
				(b) => b.category === category.id || b.expand?.category?.slug === catSlug
			);

			const articles = catBlogs.map((b) => {
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
					category: category.title,
					categorySlug: category.slug,
					readTime,
					createdDate,
					summary: cleanText.substring(0, 160) + '...'
				};
			});

			return {
				categoryInfo: {
					name: category.title,
					slug: category.slug,
					tagline: category.title,
					description: category.description
						? category.description.replace(/<[^>]+>/g, ' ').trim()
						: 'Practical articles and strategic notes.',
					count: articles.length.toString().padStart(2, '0')
				},
				articles,
				filterList
			};
		}
	} catch (err: unknown) {
		console.warn('Category fetch from PocketBase not found, trying fallback:', err);
	}

	const fallbackCat = fallbackCategories.find((c) => c.slug === catSlug);
	if (!fallbackCat) {
		throw error(404, 'Category not found');
	}

	const fallbackArts = fallbackArticles
		.filter((a) => a.categorySlug === fallbackCat.slug)
		.map((a) => ({
			id: a.slug,
			slug: a.slug,
			title: a.title,
			category: a.category,
			categorySlug: a.categorySlug,
			readTime: a.readTime,
			createdDate: a.createdDate,
			summary: a.summary
		}));

	const filterList = [
		{ name: 'All', count: fallbackArticles.length.toString().padStart(2, '0'), slug: 'all' },
		...fallbackCategories.map((c) => ({ name: c.name, count: c.count, slug: c.slug }))
	];

	return {
		categoryInfo: fallbackCat,
		articles: fallbackArts,
		filterList
	};
};
