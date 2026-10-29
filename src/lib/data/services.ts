export interface Service {
	slug: string;
	index: string;
	title: string;
	tagline: string;
	summary: string;
	audience: string;
	priceRange: string;
	pricePeriod: string;
	scope: string[];
	deliverables: string[];
	benefits: { title: string; desc: string }[];
	timeline: { step: string; title: string; desc: string }[];
	faqs: { q: string; a: string }[];
}

export const services: Service[] = [
	{
		slug: 'search-engine-optimization',
		index: '01',
		title: 'Search Engine Optimization',
		tagline: 'Be found by people already looking for what you do.',
		summary:
			'Search audits, on-page clarity and technical foundations that help the right customers find you.',
		audience: 'For businesses with a live website that is difficult to find in organic search.',
		priceRange: 'KES 20,000–60,000',
		pricePeriod: '/ month',
		scope: ['Search audit', 'Keyword mapping', 'On-page improvements', 'Monthly reporting'],
		deliverables: [
			'Review of indexing, crawling and key landing pages',
			'Search intent and keyword mapping for core services',
			'Page titles, headings, internal links and content recommendations',
			'Google Business Profile and local search optimisation',
			'Clear monthly reporting with actionable recommendations'
		],
		benefits: [
			{
				title: 'Relevant visibility',
				desc: 'Make it straightforward for customers in your area to discover your services.'
			},
			{
				title: 'Clear visitor journeys',
				desc: 'Give visitors direct answers to their questions and an easy path to enquire.'
			},
			{
				title: 'Data-driven priorities',
				desc: 'Use real search data to guide site improvements rather than chasing vanity metrics.'
			}
		],
		timeline: [
			{
				step: 'Weeks 1–2',
				title: 'Audit & priorities',
				desc: 'Access setup, baseline Search Console review, and identifying immediate fixes.'
			},
			{
				step: 'Weeks 3–4',
				title: 'Foundational fixes',
				desc: 'On-page optimisations, technical corrections, and heading structure improvements.'
			},
			{
				step: 'Month 2+',
				title: 'Review & refine',
				desc: 'Track indexing progress, monitor search queries, and expand service-page reach.'
			}
		],
		faqs: [
			{
				q: 'How long does SEO take to show results?',
				a: 'Technical fixes can take effect within days of re-indexing, but sustained organic search growth typically requires consistent work over 2 to 3 months as search engines update rankings.'
			},
			{
				q: 'Do I need Google Search Console access?',
				a: 'Yes, it provides the most accurate first-party data on your site’s real queries and indexing status. If you don’t have it set up yet, we will configure it as part of onboarding.'
			},
			{
				q: 'Will you write all the website content?',
				a: 'Content reviews, outlines, and page copy recommendations are included. Brand new copywriting or extensive blog production can be added as agreed.'
			}
		]
	},
	{
		slug: 'website-maintenance',
		index: '02',
		title: 'Website Maintenance',
		tagline: 'Keep the essentials working, month after month.',
		summary: 'Updates, backups and routine checks so your website stays secure and dependable.',
		audience:
			'For owners who need reliable upkeep without managing every technical detail themselves.',
		priceRange: 'KES 5,000–20,000',
		pricePeriod: '/ month',
		scope: [
			'Core & plugin updates',
			'Automated backups',
			'Uptime monitoring',
			'Minor content changes'
		],
		deliverables: [
			'Monthly core, plugin, and theme update checks',
			'Off-site automated backups verified regularly',
			'Continuous uptime monitoring with incident alerts',
			'Enquiry form health tests to prevent missed leads',
			'Dedicated monthly support for minor text and image updates'
		],
		benefits: [
			{
				title: 'Uptime & backups',
				desc: 'Verified off-site backups stored securely, ready for immediate recovery if needed.'
			},
			{
				title: 'Proactive updates',
				desc: 'Carefully staged update passes to prevent plugins from breaking contact forms or layouts.'
			},
			{
				title: 'Peace of mind',
				desc: 'One accountable specialist watching your site so you can focus on running your business.'
			}
		],
		timeline: [
			{
				step: 'Week 1',
				title: 'Onboarding & audit',
				desc: 'Verify server access, inspect existing backups, and review current plugin health.'
			},
			{
				step: 'Ongoing',
				title: 'Monthly care cycles',
				desc: 'Scheduled updates, uptime checks, form testing, and content support.'
			}
		],
		faqs: [
			{
				q: 'What happens if a plugin update breaks something?',
				a: 'Backups are verified prior to any update. If an incompatibility occurs, the site is immediately restored to its clean state and tested in staging.'
			},
			{
				q: 'Can unused maintenance hours roll over?',
				a: 'Maintenance retainers reserve dedicated monthly time and infrastructure monitoring, so hours apply to that month’s active care.'
			}
		]
	},
	{
		slug: 'website-optimization',
		index: '03',
		title: 'Website Optimization',
		tagline: 'Make every visit faster, clearer and more useful.',
		summary:
			'Find and eliminate friction in loading speed, mobile usability and the path to enquiry.',
		audience: 'For existing websites that feel slow, clunky, or lose visitors on mobile devices.',
		priceRange: 'KES 15,000–50,000',
		pricePeriod: '/ project',
		scope: ['Speed audit', 'Image & asset tuning', 'Mobile responsiveness', 'Form flow checks'],
		deliverables: [
			'Comprehensive speed and Core Web Vitals audit',
			'Next-gen image formatting (WebP/AVIF) and asset compression',
			'Removal of unused third-party scripts and render-blocking CSS/JS',
			'Mobile viewport touch target and layout shift corrections',
			'Before-and-after speed benchmark report'
		],
		benefits: [
			{
				title: 'Lighter payload',
				desc: 'Drastically smaller page weights that load quickly even on Kenyan mobile connections.'
			},
			{
				title: 'Smoother mobile visits',
				desc: 'Eliminate shifting layouts and slow taps that cause prospective clients to leave.'
			},
			{
				title: 'Higher conversions',
				desc: 'A friction-free enquiry experience that turns casual visitors into enquiries.'
			}
		],
		timeline: [
			{
				step: 'Week 1',
				title: 'Diagnostic baseline',
				desc: 'Record baseline loading speeds and map out the highest-impact bottlenecks.'
			},
			{
				step: 'Weeks 2–3',
				title: 'Code & asset optimization',
				desc: 'Compress assets, streamline scripts, and verify improvements on mobile devices.'
			}
		],
		faqs: [
			{
				q: 'Will optimization change how my website looks?',
				a: 'No. The visual design remains intact. Only the underlying code, asset formats, and delivery pipeline are tuned for performance.'
			},
			{
				q: 'Can optimization fix poor web hosting?',
				a: 'Optimization significantly cuts server load, but if your host has severe latency, we will recommend practical hosting alternatives.'
			}
		]
	},
	{
		slug: 'website-revamp',
		index: '04',
		title: 'Website Revamp',
		tagline: 'Give an existing website a sharper purpose.',
		summary:
			'Rework an outdated website around clear information, modern design and a better customer journey.',
		audience: 'For established businesses that have outgrown their current website or messaging.',
		priceRange: 'KES 40,000–120,000',
		pricePeriod: '/ project',
		scope: ['Content restructuring', 'Modern UI redesign', 'SEO preservation', 'Mobile rebuild'],
		deliverables: [
			'Site architecture overhaul and revised page flow',
			'Modern, responsive visual redesign tailored to your brand',
			'Full 301 redirect mapping to protect existing search equity',
			'Clean content migration and contact form streamlining',
			'Cross-device testing and post-launch handover'
		],
		benefits: [
			{
				title: 'Clear information hierarchy',
				desc: 'Restructure your pages so customers instantly understand what you do and how to hire you.'
			},
			{
				title: 'Contemporary visual polish',
				desc: 'A confident, modern design that elevates brand perception from the first visit.'
			},
			{
				title: 'Preserved search rankings',
				desc: 'Careful redirect management so you keep the search visibility you have already earned.'
			}
		],
		timeline: [
			{
				step: 'Weeks 1–2',
				title: 'Discovery & wireframes',
				desc: 'Audit existing content, map new page structure, and agree on visual direction.'
			},
			{
				step: 'Weeks 3–4',
				title: 'Design & build',
				desc: 'Build responsive templates, migrate copy, and configure search redirects.'
			},
			{
				step: 'Week 5',
				title: 'Testing & launch',
				desc: 'Device testing, form verification, DNS cutover, and client walkthrough.'
			}
		],
		faqs: [
			{
				q: 'Will my current search rankings drop during a revamp?',
				a: 'When executed properly with thorough 301 redirects and preserved content relevance, search rankings are protected and often improve with better page structure.'
			},
			{
				q: 'Can we keep our existing domain and emails?',
				a: 'Yes. Your domain registration, email accounts, and business records remain completely uninterrupted.'
			}
		]
	},
	{
		slug: 'cybersecurity',
		index: '05',
		title: 'Cybersecurity',
		tagline: 'Reduce avoidable risk. Protect business continuity.',
		summary:
			'Practical website security reviews and hardening, explained in straightforward language.',
		audience:
			'For small and medium businesses that want to understand and eliminate everyday website vulnerabilities.',
		priceRange: 'KES 15,000–60,000',
		pricePeriod: '/ assessment',
		scope: [
			'Access audit',
			'Security header configuration',
			'Hardening plan',
			'Incident recovery checklist'
		],
		deliverables: [
			'Comprehensive website and CMS vulnerability scan',
			'Implementation of essential HTTP security headers (CSP, HSTS)',
			'Admin portal protection, 2FA enforcement, and brute-force defence',
			'Outdated software and vulnerable plugin cleanup',
			'Emergency recovery documentation and credential hygiene guide'
		],
		benefits: [
			{
				title: 'Closed access vulnerabilities',
				desc: 'Eliminate default logins, weak passwords, and unattended admin permissions.'
			},
			{
				title: 'Browser security hardening',
				desc: 'Configure security headers that instruct modern browsers to block malicious injection.'
			},
			{
				title: 'Continuity assurance',
				desc: 'Clear recovery procedures so a single security incident cannot bring business to a standstill.'
			}
		],
		timeline: [
			{
				step: 'Week 1',
				title: 'Vulnerability assessment',
				desc: 'Inspect permissions, dependencies, and server configurations for open vectors.'
			},
			{
				step: 'Week 2',
				title: 'Hardening & verification',
				desc: 'Apply security configuration fixes, test defenses, and deliver recovery guides.'
			}
		],
		faqs: [
			{
				q: 'Can you guarantee my website will never be hacked?',
				a: 'No honest security professional can guarantee 100% immunity, but implementing baseline hygiene eliminates the automated, low-effort attacks that affect 99% of small business sites.'
			},
			{
				q: 'Will security hardening slow down my website?',
				a: 'No. Security headers and access controls add virtually zero overhead and often improve performance by blocking malicious bot traffic.'
			}
		]
	},
	{
		slug: 'web-development',
		index: '06',
		title: 'Web Development',
		tagline: 'Build a reliable home for your business online.',
		summary:
			'Purpose-built, fast websites with accessible layouts, clean code and manageable content.',
		audience:
			'For businesses launching a new venture or needing a dependable modern web foundation.',
		priceRange: 'KES 60,000–200,000',
		pricePeriod: '/ project',
		scope: [
			'Discovery & planning',
			'Responsive frontend build',
			'Technical SEO setup',
			'Testing & handover'
		],
		deliverables: [
			'Custom responsive frontend built for high performance',
			'Intuitive content editing and manageable structure',
			'Complete technical SEO setup: sitemaps, OpenGraph metadata, and semantic markup',
			'Tested across modern smartphones, tablets, and desktop browsers',
			'Full code ownership, zero platform lock-in, and clear documentation'
		],
		benefits: [
			{
				title: 'Speed by default',
				desc: 'Modern architecture that loads near-instantly without bloated templates.'
			},
			{
				title: 'Mobile-first craft',
				desc: 'Every layout tested thoroughly on small screens without horizontal scroll or clipping.'
			},
			{
				title: 'Complete ownership',
				desc: 'You own 100% of your code and assets, with no recurring proprietary lock-in.'
			}
		],
		timeline: [
			{
				step: 'Weeks 1–2',
				title: 'Discovery & sitemap',
				desc: 'Define goals, target audience, page structure, and design direction.'
			},
			{
				step: 'Weeks 3–4',
				title: 'Development & content',
				desc: 'Build responsive components, integrate assets, and assemble core pages.'
			},
			{
				step: 'Week 5',
				title: 'QA & launch',
				desc: 'Cross-device verification, SEO checklist, DNS configuration, and handover.'
			}
		],
		faqs: [
			{
				q: 'Who owns the website and code after launch?',
				a: 'You do. 100% of the code, domain settings, hosting accounts, and content remain your direct property.'
			},
			{
				q: 'Will my website be mobile-friendly?',
				a: 'Yes. Every page is crafted mobile-first and tested thoroughly on real phones before deployment.'
			}
		]
	}
];
