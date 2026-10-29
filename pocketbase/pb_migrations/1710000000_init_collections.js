/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		// 1. Blog Categories
		const blogCategories = new Collection({
			name: 'blog_categories',
			type: 'base',
			listRule: '',
			viewRule: '',
			createRule: "@request.auth.id != ''",
			updateRule: "@request.auth.id != ''",
			deleteRule: "@request.auth.id != ''",
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true
				},
				{
					name: 'slug',
					type: 'text',
					required: true
				},
				{
					name: 'description',
					type: 'editor',
					required: false
				},
				{
					name: 'featured_image',
					type: 'file',
					maxSelect: 1,
					maxSize: 15728640,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
				}
			],
			indexes: ['CREATE UNIQUE INDEX `idx_blog_categories_slug` ON `blog_categories` (`slug`)']
		});
		app.save(blogCategories);

		// 2. Blogs
		const blogs = new Collection({
			name: 'blogs',
			type: 'base',
			listRule: '',
			viewRule: '',
			createRule: "@request.auth.id != ''",
			updateRule: "@request.auth.id != ''",
			deleteRule: "@request.auth.id != ''",
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true
				},
				{
					name: 'slug',
					type: 'text',
					required: true
				},
				{
					name: 'description',
					type: 'editor',
					required: false
				},
				{
					name: 'featured_image',
					type: 'file',
					maxSelect: 1,
					maxSize: 15728640,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
				},
				{
					name: 'tags',
					type: 'json',
					required: false
				},
				{
					name: 'category',
					type: 'relation',
					collectionId: blogCategories.id,
					cascadeDelete: false,
					maxSelect: 1,
					required: false
				}
			],
			indexes: ['CREATE UNIQUE INDEX `idx_blogs_slug` ON `blogs` (`slug`)']
		});
		app.save(blogs);

		// 3. Portfolio Items
		const portfolioItems = new Collection({
			name: 'portfolio_items',
			type: 'base',
			listRule: '',
			viewRule: '',
			createRule: "@request.auth.id != ''",
			updateRule: "@request.auth.id != ''",
			deleteRule: "@request.auth.id != ''",
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true
				},
				{
					name: 'slug',
					type: 'text',
					required: true
				},
				{
					name: 'client',
					type: 'json',
					required: false
				},
				{
					name: 'description',
					type: 'editor',
					required: false
				},
				{
					name: 'category',
					type: 'text',
					required: false
				},
				{
					name: 'tags',
					type: 'json',
					required: false
				},
				{
					name: 'featured_image',
					type: 'file',
					maxSelect: 1,
					maxSize: 15728640,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
				},
				{
					name: 'link',
					type: 'text',
					required: false
				},
				{
					name: 'screenshots',
					type: 'file',
					maxSelect: 10,
					maxSize: 15728640,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
				},
				{
					name: 'video',
					type: 'text',
					required: false
				},
				{
					name: 'start_date',
					type: 'date',
					required: false
				},
				{
					name: 'end_date',
					type: 'date',
					required: false
				},
				{
					name: 'status',
					type: 'select',
					maxSelect: 1,
					values: ['just_started', 'ongoing', 'concluding', 'concluded'],
					required: false
				},
				{
					name: 'client_testimonial',
					type: 'editor',
					required: false
				}
			],
			indexes: ['CREATE UNIQUE INDEX `idx_portfolio_items_slug` ON `portfolio_items` (`slug`)']
		});
		app.save(portfolioItems);

		// 4. Services
		const services = new Collection({
			name: 'services',
			type: 'base',
			listRule: '',
			viewRule: '',
			createRule: "@request.auth.id != ''",
			updateRule: "@request.auth.id != ''",
			deleteRule: "@request.auth.id != ''",
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true
				},
				{
					name: 'slug',
					type: 'text',
					required: true
				},
				{
					name: 'description',
					type: 'editor',
					required: false
				},
				{
					name: 'price_range',
					type: 'text',
					required: false
				},
				{
					name: 'price_period',
					type: 'text',
					required: false
				},
				{
					name: 'featured_image',
					type: 'file',
					maxSelect: 1,
					maxSize: 15728640,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
				}
			],
			indexes: ['CREATE UNIQUE INDEX `idx_services_slug` ON `services` (`slug`)']
		});
		app.save(services);
	},
	(app) => {
		const collections = ['services', 'portfolio_items', 'blogs', 'blog_categories'];
		for (const name of collections) {
			try {
				const collection = app.findCollectionByNameOrId(name);
				app.delete(collection);
			} catch (_) {}
		}
	}
);
