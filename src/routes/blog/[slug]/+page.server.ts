import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { articles as fallbackArticles } from '$lib/data/blog';
import { getFileUrl } from '$lib/pocketbase';

export const load: PageServerLoad = async ({ locals, params }) => {
	try {
		const b = await locals.pb
			.collection('blogs')
			.getFirstListItem(`slug="${params.slug}"`, { expand: 'category' });

		if (b) {
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

			const summary = cleanText.substring(0, 180) + '...';
			const heroImage = b.featured_image ? getFileUrl(b, b.featured_image) : '';

			// Extract headings and inject IDs into descriptionHtml
			let sectionIndex = 0;
			const sections: Array<{ id: string; title: string }> = [];
			const htmlWithIds = (b.description || '').replace(
				/<h2([^>]*)>(.*?)<\/h2>/gi,
				(_match: string, attrs: string, content: string) => {
					const id = `section-${sectionIndex++}`;
					const text = content.replace(/<[^>]+>/g, '').trim();
					sections.push({ id, title: text });
					return `<h2 id="${id}"${attrs}>${content}</h2>`;
				}
			);

			// Fetch 2 related articles
			let relatedList: Array<{
				slug: string;
				title: string;
				category: string;
				readTime: string;
				summary: string;
			}> = [];
			try {
				const relatedPb = await locals.pb.collection('blogs').getList(1, 2, {
					filter: `slug!="${b.slug}"`,
					sort: '-created',
					expand: 'category'
				});

				relatedList = relatedPb.items.map((r) => {
					const rText = (r.description || '')
						.replace(/<[^>]+>/g, ' ')
						.replace(/\s+/g, ' ')
						.trim();
					const rWords = rText ? rText.split(/\s+/).length : 0;
					return {
						slug: r.slug,
						title: r.title,
						category: r.expand?.category?.title || 'General',
						readTime: `${Math.max(2, Math.ceil(rWords / 180))} min read`,
						summary: rText.substring(0, 120) + '...'
					};
				});
			} catch {
				// No related articles or query error
			}

			return {
				article: {
					id: b.id,
					slug: b.slug,
					title: b.title,
					category: cat?.title || 'General',
					categorySlug: cat?.slug || 'general',
					readTime,
					createdDate,
					updatedDate: b.updated || b.created,
					summary,
					descriptionHtml: htmlWithIds,
					heroImage,
					sections,
					tags: Array.isArray(b.tags) ? b.tags : [],
					legacySections: null,
					takeaway: null
				},
				relatedArticles: relatedList
			};
		}
	} catch (err: unknown) {
		console.warn('Blog post fetch from PocketBase not found, trying fallback:', err);
	}

	const fallback = fallbackArticles.find((a) => a.slug === params.slug);
	if (!fallback) {
		throw error(404, 'Article not found');
	}

	const related = fallbackArticles
		.filter((a) => a.slug !== fallback.slug)
		.slice(0, 2)
		.map((r) => ({
			slug: r.slug,
			title: r.title,
			category: r.category,
			readTime: r.readTime,
			summary: r.summary
		}));

	return {
		article: {
			id: fallback.slug,
			slug: fallback.slug,
			title: fallback.title,
			category: fallback.category,
			categorySlug: fallback.categorySlug,
			readTime: fallback.readTime,
			createdDate: fallback.createdDate,
			updatedDate: fallback.updatedDate,
			summary: fallback.summary,
			descriptionHtml: '',
			heroImage: '',
			sections: fallback.sections.map((s, i) => ({ id: `section-${i}`, title: s.title })),
			tags: [],
			legacySections: fallback.sections,
			takeaway: fallback.takeaway
		},
		relatedArticles: related
	};
};
