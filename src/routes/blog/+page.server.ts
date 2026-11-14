import type { PageServerLoad } from './$types';
import { articles as fallbackArticles, categories as fallbackCategories } from '$lib/data/blog';
import { getFileUrl } from '$lib/pocketbase';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const [pbBlogs, pbCats] = await Promise.all([
			locals.pb.collection('blogs').getFullList({
				sort: '-created',
				expand: 'category'
			}),
			locals.pb.collection('blog_categories').getFullList({
				sort: 'title'
			})
		]);

		if (pbBlogs.length > 0) {
			// Category counts
			const catCounts = new Map<string, number>();
			for (const b of pbBlogs) {
				const cSlug = b.expand?.category?.slug;
				if (cSlug) {
					catCounts.set(cSlug, (catCounts.get(cSlug) || 0) + 1);
				}
			}

			const categories = pbCats.map((c) => ({
				id: c.id,
				slug: c.slug,
				name: c.title,
				title: c.title,
				tagline: c.title,
				count: (catCounts.get(c.slug) || 0).toString().padStart(2, '0'),
				description: c.description || ''
			}));

			const articles = pbBlogs.map((b, i) => {
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

				const summary = cleanText.substring(0, 160) + '...';
				const heroImage = b.featured_image ? getFileUrl(b, b.featured_image) : '';

				return {
					id: b.id,
					slug: b.slug,
					title: b.title,
					category: cat?.title || 'General',
					categorySlug: cat?.slug || 'general',
					readTime,
					createdDate,
					updatedDate: b.updated || b.created,
					summary,
					descriptionHtml: b.description || '',
					heroImage,
					tags: Array.isArray(b.tags) ? b.tags : [],
					isEditorPick: i === 0 // First article is editor's pick
				};
			});

			return {
				articles,
				categories
			};
		}
	} catch (err: unknown) {
		console.error('Blog public load error:', err);
	}

	return {
		articles: fallbackArticles.map((a) => ({
			...a,
			id: a.slug,
			descriptionHtml: '',
			heroImage: '',
			tags: []
		})),
		categories: fallbackCategories.map((c) => ({
			...c,
			id: c.slug,
			title: c.name
		}))
	};
};
