export interface BlogSection {
	title: string;
	paragraphs: string[];
	bulletPoints?: string[];
	callout?: {
		title: string;
		desc: string;
	};
}

export interface Article {
	slug: string;
	title: string;
	category: string;
	categorySlug: string;
	readTime: string;
	createdDate: string;
	updatedDate: string;
	summary: string;
	isEditorPick?: boolean;
	sections: BlogSection[];
	takeaway?: {
		title: string;
		desc: string;
	};
}

export interface CategoryInfo {
	slug: string;
	name: string;
	count: string;
	tagline: string;
	description: string;
}

export const categories: CategoryInfo[] = [
	{
		slug: 'seo',
		name: 'SEO',
		count: '03',
		tagline: 'Get found. Stay useful.',
		description:
			'Search Engine Optimization without the smoke and mirrors. Practical notes on local visibility, service-page content, and search signals that guide your next move.'
	},
	{
		slug: 'performance',
		name: 'Performance',
		count: '01',
		tagline: 'Faster visits. Lower friction.',
		description:
			'Practical approaches to trimming page weight, improving Core Web Vitals, and ensuring smooth mobile visits across Kenyan networks.'
	},
	{
		slug: 'maintenance',
		name: 'Maintenance',
		count: '01',
		tagline: 'Routine care. Less downtime.',
		description:
			'Checklists, updates, and backup schedules that protect your digital presence from avoidable breakdowns.'
	},
	{
		slug: 'security',
		name: 'Security',
		count: '01',
		tagline: 'Sensible hygiene. Reduced risk.',
		description:
			'Straightforward steps for small and medium businesses to protect their domains, customer forms, and admin logins.'
	}
];

export const articles: Article[] = [
	{
		slug: 'local-seo',
		title: 'Local SEO: help nearby customers find your business',
		category: 'SEO',
		categorySlug: 'seo',
		readTime: '7 min read',
		createdDate: '08 Oct 2026',
		updatedDate: '15 Oct 2026',
		summary:
			'A practical starting point for Kenyan small businesses, from accurate business details to useful service pages.',
		isEditorPick: true,
		sections: [
			{
				title: 'Get your business details straight',
				paragraphs: [
					'Write down a single, accurate version of your business name, contact details, opening hours and service area. Use this as the reference when updating your website and genuine business profiles. Do not add locations where you do not operate.',
					'If customers visit a real business location, explain how to find it. If you travel to customers or work remotely, describe the service area honestly instead of presenting a private or virtual address as a walk-in office.'
				],
				bulletPoints: [
					'Use the name your customers actually know.',
					'Keep hours accurate, including seasonal changes.',
					'Check the contact route on every important page.',
					'Explain whether visits require an appointment.'
				]
			},
			{
				title: 'Review the profile people find first',
				paragraphs: [
					'If your business is eligible for a Google Business Profile, claim or manage the genuine profile through the official process. Choose a suitable primary category, describe your services clearly and keep the information aligned with your website.',
					'Add real photographs that help a customer recognise your business or understand your work. A clear image of your products, premises or completed work is more useful than an unrelated stock picture.'
				],
				callout: {
					title: 'A useful boundary',
					desc: 'Do not create duplicate profiles, add keywords to the business name that are not part of your real name, or claim a location you cannot genuinely represent. Accuracy is far more sustainable than shortcuts.'
				}
			},
			{
				title: 'Give each important service a useful home',
				paragraphs: [
					'A page that only says “we offer quality services” leaves too much work for the visitor. Describe the specific service, who it is for, what is included and what the next step looks like. Use the words a customer would use, not just the terms your industry prefers.',
					'Avoid making many near-identical pages with different town names. If a location changes the information a customer needs, explain that difference. Otherwise, a strong service page and an honest service-area explanation is much more useful than a collection of thin pages.'
				],
				bulletPoints: [
					'State the service and audience near the top.',
					'Answer common questions before the enquiry form.',
					'Use descriptive links instead of repeated “click here” labels.',
					'Give visitors one obvious next action.'
				]
			},
			{
				title: 'Make the mobile visit feel easy',
				paragraphs: [
					'Most local customers will discover your business while browsing on their phones. Check your key pages on mobile: Can you read the copy comfortably without pinching or zooming? Can you open the menu, understand the offer, and tap the enquiry button easily?',
					'Start with obvious friction. Resize oversized images, remove elements that block the content, and test forms from start to finish on a real mobile device.'
				]
			},
			{
				title: 'Read search signals, not daily fluctuations',
				paragraphs: [
					'Google Search Console helps you see which searches lead to impressions and clicks, which pages appear, and whether pages have indexing issues.',
					'Look for patterns over 28-day and 3-month moving averages. Are people finding the services you want to be known for? Keep a simple change log so you can connect observations with improvements you have actually made.'
				]
			}
		],
		takeaway: {
			title: 'Be accurate. Be useful. Keep improving.',
			desc: 'Local SEO is an ongoing practice, not a one-time badge. A clear website and honest business information give you a dependable foundation for the work that follows.'
		}
	},
	{
		slug: 'faster-website-lighter-pages',
		title: 'A faster website starts with lighter pages',
		category: 'Performance',
		categorySlug: 'performance',
		readTime: '5 min read',
		createdDate: '06 Oct 2026',
		updatedDate: '12 Oct 2026',
		summary: 'What to check before adding another plugin or paying for a bigger hosting tier.',
		sections: [
			{
				title: 'Audit your media before paying for more server power',
				paragraphs: [
					'Most small business websites are slow not because their hosting server lacks RAM, but because their pages download 10MB of uncompressed photographic assets, heavy webfonts, and unused JavaScript libraries.',
					'Before considering expensive hosting upgrades, convert JPEG and PNG graphics into WebP or AVIF formats, size images to their actual render viewport, and remove slider plugins that nobody interacts with.'
				]
			},
			{
				title: 'Every tracking snippet has an engineering cost',
				paragraphs: [
					'Chat widgets, heatmaps, multiple pixel tags, and font loaders each halt HTML parsing. Audit every external script: if a tool has not been opened in three months, remove it immediately.'
				]
			}
		],
		takeaway: {
			title: 'Speed is respect for your visitor.',
			desc: 'A fast site on a 3G network builds instant credibility and ensures potential clients never abandon your enquiry form out of frustration.'
		}
	},
	{
		slug: 'monthly-website-maintenance-checklist',
		title: 'Your monthly website maintenance checklist',
		category: 'Maintenance',
		categorySlug: 'maintenance',
		readTime: '6 min read',
		createdDate: '03 Oct 2026',
		updatedDate: '10 Oct 2026',
		summary:
			'A repeatable routine for backups, updates, content and the forms your customers rely on.',
		sections: [
			{
				title: 'An untested backup is a gamble',
				paragraphs: [
					'Do not wait until a server crash or corrupted database to find out if your backup plugin actually creates restorable archives. Test restoring to a staging environment once every quarter.'
				]
			},
			{
				title: 'Submit your own contact form once a month',
				paragraphs: [
					'SMTP configurations break silently when email hosts update their security policies. Test your forms regularly to confirm enquiries actually reach your team inbox.'
				]
			}
		],
		takeaway: {
			title: 'Consistency over heroics.',
			desc: 'One hour of disciplined monthly care saves weeks of stressful troubleshooting and lost customer business.'
		}
	},
	{
		slug: 'small-business-stronger-website-security',
		title: 'Small business, stronger website security',
		category: 'Security',
		categorySlug: 'security',
		readTime: '6 min read',
		createdDate: '01 Oct 2026',
		updatedDate: '09 Oct 2026',
		summary:
			'Prioritise safer access, sensible updates and a recovery plan before something goes wrong.',
		sections: [
			{
				title: 'Two-factor authentication is the single biggest win',
				paragraphs: [
					'Most compromised small business sites are breached via brute-force password guessing on default admin accounts. Enforce two-factor authentication on every user account with administrative rights.'
				]
			},
			{
				title: 'Delete inactive plugins and themes',
				paragraphs: [
					'Even disabled plugins contain executable PHP or JavaScript code that automated bots can exploit. Keep only what is active and required.'
				]
			}
		],
		takeaway: {
			title: 'Eliminate low-hanging fruit.',
			desc: 'Automated scanners look for easy vulnerabilities. Implementing the fundamentals makes your website significantly harder to compromise.'
		}
	},
	{
		slug: 'write-service-pages-real-questions',
		title: 'Write service pages that answer real questions',
		category: 'SEO',
		categorySlug: 'seo',
		readTime: '5 min read',
		createdDate: '25 Sep 2026',
		updatedDate: '07 Oct 2026',
		summary: 'Turn a vague list of services into useful pages for people and search engines.',
		sections: [
			{
				title: 'Who is this for, and what happens next?',
				paragraphs: [
					'Customers do not search for generic corporate buzzwords. They search for solutions to immediate bottlenecks. Clearly define who your service is designed for, what is included in the scope, and what the engagement timeline looks like.'
				]
			}
		],
		takeaway: {
			title: 'Clarity converts.',
			desc: 'Search engines reward pages that satisfy search intent and help users answer their questions quickly.'
		}
	},
	{
		slug: 'search-console-signals-worth-checking',
		title: 'Search Console: the signals worth checking',
		category: 'SEO',
		categorySlug: 'seo',
		readTime: '8 min read',
		createdDate: '20 Sep 2026',
		updatedDate: '05 Oct 2026',
		summary: 'Understand queries, indexing and trends without mistaking every change for a crisis.',
		sections: [
			{
				title: 'Look at 28-day and 3-month moving averages',
				paragraphs: [
					'Daily fluctuations in impressions and clicks are normal. Watch the broader direction of queries that lead visitors to your key commercial pages.'
				]
			}
		],
		takeaway: {
			title: 'Data is a compass.',
			desc: 'Use Search Console to identify what your prospective customers are actually looking for, then refine your service pages to match.'
		}
	}
];
