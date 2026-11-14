import PocketBase from 'pocketbase';

const PB_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@elserval.com';
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || 'password123456';

async function seed() {
	const pb = new PocketBase(PB_URL);
	console.log(`Connecting to PocketBase at ${PB_URL}...`);

	try {
		await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
		console.log('Superuser authenticated.');
	} catch (err) {
		console.error('Failed to authenticate:', err.message);
		process.exit(1);
	}

	// ── 1. Services (must be seeded before portfolio so we can link IDs) ────────
	const servicesData = [
		{
			slug: 'search-engine-optimization',
			title: 'Search Engine Optimization (SEO)',
			price_range: 'KES 20,000–60,000',
			price_period: '/ month',
			description: `<h2>Be found by people already looking for what you do</h2><p>Search audits, on-page clarity and technical foundations that help the right customers find your business in organic search.</p><h3>What is Included</h3><ul><li>Review of indexing, crawling and key landing pages</li><li>Search intent and keyword mapping for core services</li><li>Page titles, headings, internal links and content recommendations</li><li>Google Business Profile and local search optimisation</li><li>Clear monthly reporting with actionable recommendations</li></ul>`
		},
		{
			slug: 'ai-engine-optimization',
			title: 'AI Engine Optimization (AIEO)',
			price_range: 'KES 25,000–65,000',
			price_period: '/ month',
			description: `<h2>Position your brand for AI answers and conversational search</h2><p>Ensure modern AI answer engines (ChatGPT, Google Gemini, Claude, Perplexity) cite and recommend your business when prospective clients ask for industry recommendations.</p><h3>What is Included</h3><ul><li>Entity optimization and structured schema markup (JSON-LD)</li><li>Citation footprint across trustworthy Kenyan directories</li><li>Knowledge-graph alignment so LLMs accurately understand your services</li><li>Natural language FAQ and conversational content architecture</li></ul>`
		},
		{
			slug: 'website-maintenance',
			title: 'Website Maintenance & Care',
			price_range: 'KES 15,000–40,000',
			price_period: '/ month',
			description: `<h2>Routine care. Zero downtime headaches.</h2><p>Proactive software updates, tested off-site backups, uptime monitoring and form health checks that keep your website running reliably every day.</p><ul><li>Weekly core, theme and dependency updates tested in staging</li><li>Automated encrypted off-site daily backups</li><li>24/7 uptime monitoring with immediate alerts</li><li>Monthly contact form and SMTP delivery verification</li></ul>`
		},
		{
			slug: 'website-cyber-security',
			title: 'Website & Cyber Security',
			price_range: 'KES 30,000–75,000',
			price_period: 'one-time audit or retainer',
			description: `<h2>Sensible hygiene. Hardened protection against threats.</h2><p>Security hardening, SSL/TLS configuration, brute-force defence, malware scanning and access policy reviews that protect customer data and business reputation.</p><ul><li>Full vulnerability assessment and attack surface audit</li><li>Two-factor authentication enforcement on administrative accounts</li><li>Web Application Firewall (WAF) rule configuration and rate limiting</li><li>Security header configuration (CSP, HSTS, X-Content-Type-Options)</li><li>Emergency response and malware cleanup protocol</li></ul>`
		},
		{
			slug: 'web-development',
			title: 'Custom Web Development',
			price_range: 'KES 80,000–250,000',
			price_period: 'per project',
			description: `<h2>Fast, mobile-crafted digital homes built to convert</h2><p>Bespoke web applications and marketing websites engineered for speed, clean code, accessibility and high conversion rates.</p><ul><li>Complete discovery, sitemap planning and UX wireframing</li><li>Mobile-first development optimized for Kenyan network conditions</li><li>Self-hosted headless CMS / PocketBase integration for effortless management</li><li>Strict accessibility and WCAG AA contrast compliance</li></ul>`
		},
		{
			slug: 'website-revamp',
			title: 'Website Revamp & Redesign',
			price_range: 'KES 60,000–180,000',
			price_period: 'per project',
			description: `<h2>Transform an outdated site into a modern, revenue-driving asset</h2><p>Modern visual polish, streamlined visitor navigation, mobile restructuring and preserved search engine rankings for established businesses.</p><ul><li>Information architecture overhaul and content decluttering</li><li>Modern typography and responsive design system</li><li>301 redirect mapping to protect existing SEO rankings and backlinks</li><li>Speed optimisation reducing payload size by up to 70%</li></ul>`
		}
	];

	const serviceMap = new Map(); // slug → id
	for (const s of servicesData) {
		try {
			const existing = await pb.collection('services').getFirstListItem(`slug="${s.slug}"`);
			serviceMap.set(s.slug, existing.id);
			console.log(`Service exists: ${s.title}`);
		} catch {
			const created = await pb.collection('services').create(s);
			serviceMap.set(s.slug, created.id);
			console.log(`Created service: ${s.title}`);
		}
	}

	// ── 2. Blog Categories ────────────────────────────────────────────────────
	const categoryMap = new Map(); // slug → id
	const categoriesData = [
		{
			slug: 'seo',
			title: 'Search Engine Optimization',
			description:
				'<p>Practical notes on local visibility, service-page content and search signals that guide your next move.</p>'
		},
		{
			slug: 'performance',
			title: 'Performance & Speed',
			description:
				'<p>Practical approaches to trimming page weight, improving Core Web Vitals and ensuring smooth mobile visits across Kenyan networks.</p>'
		},
		{
			slug: 'maintenance',
			title: 'Website Maintenance',
			description:
				'<p>Checklists, updates and backup schedules that protect your digital presence from avoidable breakdowns.</p>'
		},
		{
			slug: 'security',
			title: 'Website Security',
			description:
				'<p>Straightforward steps for small and medium businesses to protect their domains, customer forms and admin logins.</p>'
		}
	];
	for (const cat of categoriesData) {
		try {
			const existing = await pb
				.collection('blog_categories')
				.getFirstListItem(`slug="${cat.slug}"`);
			categoryMap.set(cat.slug, existing.id);
			console.log(`Category exists: ${cat.title}`);
		} catch {
			const created = await pb.collection('blog_categories').create(cat);
			categoryMap.set(cat.slug, created.id);
			console.log(`Created category: ${cat.title}`);
		}
	}

	// ── 3. Blogs ─────────────────────────────────────────────────────────────
	const blogsData = [
		{
			slug: 'local-seo',
			title: 'Local SEO: Help Nearby Customers Find Your Business',
			categorySlug: 'seo',
			tags: ['SEO', 'Local Search', 'Google Business', 'SME'],
			description: `<h2>Get your business details straight</h2><p>Write down a single, accurate version of your business name, contact details, opening hours and service area. Use this as the reference when updating your website and genuine business profiles.</p><ul><li>Use the name your customers actually know.</li><li>Keep hours accurate, including seasonal changes.</li><li>Check the contact route on every important page.</li></ul><h2>Give each important service a useful home</h2><p>A page that only says "we offer quality services" leaves too much work for the visitor. Describe the specific service, who it is for, what is included and what the next step looks like.</p>`
		},
		{
			slug: 'faster-website-lighter-pages',
			title: 'A Faster Website Starts with Lighter Pages',
			categorySlug: 'performance',
			tags: ['Speed', 'Core Web Vitals', 'Optimization'],
			description: `<h2>Audit your media before paying for more server power</h2><p>Most small business websites are slow not because their hosting server lacks RAM, but because their pages download 10MB of uncompressed photographic assets, heavy webfonts and unused JavaScript libraries.</p><p>Before considering expensive hosting upgrades, convert JPEG and PNG graphics into WebP or AVIF formats.</p>`
		},
		{
			slug: 'monthly-website-maintenance-checklist',
			title: 'Your Monthly Website Maintenance Checklist',
			categorySlug: 'maintenance',
			tags: ['Maintenance', 'Backups', 'Security', 'Checklist'],
			description: `<h2>An untested backup is a gamble</h2><p>Do not wait until a server crash to find out if your backup actually creates restorable archives. Test restoring to a staging environment once every quarter.</p><h2>Submit your own contact form once a month</h2><p>SMTP configurations break silently when email hosts update their security policies. Test your forms regularly.</p>`
		},
		{
			slug: 'small-business-stronger-website-security',
			title: 'Small Business, Stronger Website Security',
			categorySlug: 'security',
			tags: ['Cybersecurity', 'SSL', 'Hardening', '2FA'],
			description: `<h2>Two-factor authentication is the single biggest win</h2><p>Most compromised small business sites are breached via brute-force password guessing on default admin accounts. Enforce two-factor authentication on every user account with administrative rights.</p><h2>Delete inactive plugins and themes</h2><p>Even disabled plugins contain executable code that automated bots can exploit. Keep only what is active and required.</p>`
		}
	];
	for (const blog of blogsData) {
		try {
			await pb.collection('blogs').getFirstListItem(`slug="${blog.slug}"`);
			console.log(`Blog exists: ${blog.title}`);
		} catch {
			await pb.collection('blogs').create({
				title: blog.title,
				slug: blog.slug,
				description: blog.description,
				tags: blog.tags,
				category: categoryMap.get(blog.categorySlug) || null
			});
			console.log(`Created blog: ${blog.title}`);
		}
	}

	// ── 4. Portfolio Items — category is now a relation to services ───────────
	const portfolioData = [
		{
			slug: 'kilimo-table',
			title: 'Kilimo Table',
			// References both web-development AND seo service IDs
			categoryServices: ['web-development', 'search-engine-optimization'],
			tags: ['Web Development', 'SEO', 'Agriculture'],
			status: 'concluded',
			start_date: '2026-08-01',
			end_date: '2026-09-15',
			link: 'https://kilimotable.co.ke',
			client: {
				name: 'Wanjiku Mwangi',
				company: 'Kilimo Table Co.',
				logo: '',
				contact_details: 'wanjiku@kilimotable.co.ke | +254 700 000 001'
			},
			client_testimonial:
				'<p>"El Serval built us a platform that our customers actually enjoy using on mobile. Our WhatsApp inquiries doubled within three weeks of launch."</p>',
			description: `<h2>Fresh Produce. A Clearer Digital Presence.</h2><p>A warm, mobile-minded website for an agricultural produce collective. Built around product clarity, seasonal sourcing transparency and an effortless path to enquiry.</p>`
		},
		{
			slug: 'pamoja-studio',
			title: 'Pamoja Studio',
			categoryServices: ['website-revamp', 'web-development'],
			tags: ['Website Revamp', 'Interiors', 'UI Design'],
			status: 'concluded',
			start_date: '2026-07-10',
			end_date: '2026-08-20',
			link: 'https://pamojastudio.co.ke',
			client: {
				name: 'David Ochieng',
				company: 'Pamoja Studio Interiors',
				logo: '',
				contact_details: 'david@pamojastudio.co.ke | +254 711 000 002'
			},
			client_testimonial:
				'<p>"The attention to detail was exceptional. Our architectural clients constantly comment on the elegance of the new portfolio."</p>',
			description: `<h2>Spaces for Everyday Living. Made in Kenya.</h2><p>A considered storefront for an artisanal Kenyan furniture and interiors workshop. A clearer collection structure paired with materials-led art direction.</p>`
		},
		{
			slug: 'pwani-stays',
			title: 'Pwani Stays',
			categoryServices: ['web-development', 'website-maintenance'],
			tags: ['Web Development', 'Hospitality', 'Booking'],
			status: 'ongoing',
			start_date: '2026-09-01',
			end_date: '2026-11-30',
			link: 'https://pwanistays.co.ke',
			client: {
				name: 'Fatma Said',
				company: 'Pwani Stays Ltd.',
				logo: '',
				contact_details: 'fatma@pwanistays.co.ke | +254 722 000 003'
			},
			client_testimonial:
				'<p>"Direct bookings through WhatsApp increased significantly because guests can now check availability and room photos effortlessly on their phones."</p>',
			description: `<h2>Slow Down. Stay by the Sea.</h2><p>A calm, enquiry-led site for a coastal Kenyan boutique guesthouse. Clear stay information, thoughtful mobile layouts and a direct reservation flow.</p>`
		}
	];

	for (const item of portfolioData) {
		try {
			const existing = await pb
				.collection('portfolio_items')
				.getFirstListItem(`slug="${item.slug}"`);
			const categoryIds = item.categoryServices.map((s) => serviceMap.get(s)).filter(Boolean);
			await pb.collection('portfolio_items').update(existing.id, { category: categoryIds });
			console.log(`Portfolio item updated: ${item.title}`);
		} catch {
			// Map service slugs to IDs for the relation field
			const categoryIds = item.categoryServices.map((s) => serviceMap.get(s)).filter(Boolean);

			await pb.collection('portfolio_items').create({
				title: item.title,
				slug: item.slug,
				client: item.client,
				description: item.description,
				category: categoryIds,
				tags: item.tags,
				status: item.status,
				start_date: item.start_date,
				end_date: item.end_date,
				link: item.link,
				client_testimonial: item.client_testimonial
			});
			console.log(
				`Created portfolio item: ${item.title} (services: ${item.categoryServices.join(', ')})`
			);
		}
	}

	console.log('\nSeed completed successfully!');
}

seed().catch((err) => {
	console.error('Seed error:', err);
	process.exit(1);
});
