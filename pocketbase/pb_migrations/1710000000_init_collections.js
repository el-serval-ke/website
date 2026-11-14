/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		// ── 1. SERVICES (must come first — portfolio references it) ─────────────
		const services = new Collection({
			name: 'services',
			type: 'base',
			listRule: '',
			viewRule: '',
			createRule: "@request.auth.id != ''",
			updateRule: "@request.auth.id != ''",
			deleteRule: "@request.auth.id != ''",
			fields: [
				{ name: 'title', type: 'text', required: true },
				{ name: 'slug', type: 'text', required: true },
				{ name: 'description', type: 'editor', required: false },
				{ name: 'price_range', type: 'text', required: false },
				{ name: 'price_period', type: 'text', required: false },
				{
					name: 'featured_image',
					type: 'file',
					maxSelect: 1,
					maxSize: 15728640,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
				},
				{ name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
				{ name: 'updated', type: 'autodate', onCreate: true, onUpdate: true }
			],
			indexes: ['CREATE UNIQUE INDEX `idx_services_slug` ON `services` (`slug`)']
		});
		app.save(services);

		// ── 2. BLOG CATEGORIES ───────────────────────────────────────────────────
		const blogCategories = new Collection({
			name: 'blog_categories',
			type: 'base',
			listRule: '',
			viewRule: '',
			createRule: "@request.auth.id != ''",
			updateRule: "@request.auth.id != ''",
			deleteRule: "@request.auth.id != ''",
			fields: [
				{ name: 'title', type: 'text', required: true },
				{ name: 'slug', type: 'text', required: true },
				{ name: 'description', type: 'editor', required: false },
				{
					name: 'featured_image',
					type: 'file',
					maxSelect: 1,
					maxSize: 15728640,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
				},
				{ name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
				{ name: 'updated', type: 'autodate', onCreate: true, onUpdate: true }
			],
			indexes: ['CREATE UNIQUE INDEX `idx_blog_categories_slug` ON `blog_categories` (`slug`)']
		});
		app.save(blogCategories);

		// ── 3. BLOGS ─────────────────────────────────────────────────────────────
		const blogs = new Collection({
			name: 'blogs',
			type: 'base',
			listRule: '',
			viewRule: '',
			createRule: "@request.auth.id != ''",
			updateRule: "@request.auth.id != ''",
			deleteRule: "@request.auth.id != ''",
			fields: [
				{ name: 'title', type: 'text', required: true },
				{ name: 'slug', type: 'text', required: true },
				{ name: 'description', type: 'editor', required: false },
				{
					name: 'featured_image',
					type: 'file',
					maxSelect: 1,
					maxSize: 15728640,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
				},
				{ name: 'tags', type: 'json', required: false },
				{
					name: 'category',
					type: 'relation',
					collectionId: blogCategories.id,
					cascadeDelete: false,
					maxSelect: 1,
					required: false
				},
				{ name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
				{ name: 'updated', type: 'autodate', onCreate: true, onUpdate: true }
			],
			indexes: ['CREATE UNIQUE INDEX `idx_blogs_slug` ON `blogs` (`slug`)']
		});
		app.save(blogs);

		// ── 4. PORTFOLIO ITEMS ───────────────────────────────────────────────────
		// category → relation to services, maxSelect null = unlimited (many-to-many)
		const portfolioItems = new Collection({
			name: 'portfolio_items',
			type: 'base',
			listRule: '',
			viewRule: '',
			createRule: "@request.auth.id != ''",
			updateRule: "@request.auth.id != ''",
			deleteRule: "@request.auth.id != ''",
			fields: [
				{ name: 'title', type: 'text', required: true },
				{ name: 'slug', type: 'text', required: true },
				{ name: 'client', type: 'json', required: false },
				{ name: 'description', type: 'editor', required: false },
				// Many-to-many relation to services — one portfolio item can have several services as categories
				{
					name: 'category',
					type: 'relation',
					collectionId: services.id,
					cascadeDelete: false,
					maxSelect: 99, // unlimited multi-service relation
					required: false
				},
				{ name: 'tags', type: 'json', required: false },
				{
					name: 'featured_image',
					type: 'file',
					maxSelect: 1,
					maxSize: 15728640,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
				},
				{ name: 'link', type: 'text', required: false },
				{
					name: 'screenshots',
					type: 'file',
					maxSelect: 10,
					maxSize: 15728640,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
				},
				{ name: 'video', type: 'text', required: false },
				{ name: 'start_date', type: 'date', required: false },
				{ name: 'end_date', type: 'date', required: false },
				{
					name: 'status',
					type: 'select',
					maxSelect: 1,
					values: ['just_started', 'ongoing', 'concluding', 'concluded'],
					required: false
				},
				{ name: 'client_testimonial', type: 'editor', required: false },
				{ name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
				{ name: 'updated', type: 'autodate', onCreate: true, onUpdate: true }
			],
			indexes: ['CREATE UNIQUE INDEX `idx_portfolio_items_slug` ON `portfolio_items` (`slug`)']
		});
		app.save(portfolioItems);
	},
	(app) => {
		// Down: delete in reverse dependency order
		const collections = ['portfolio_items', 'blogs', 'blog_categories', 'services'];
		for (const name of collections) {
			try {
				const collection = app.findCollectionByNameOrId(name);
				app.delete(collection);
			} catch (_) {}
		}
	}
);
