export interface PortfolioItem {
	slug: string;
	title: string;
	tagline: string;
	category: string;
	tags: string[];
	client: string;
	scope: string;
	timeline: string;
	heroImage: string;
	summary: string;
	challenge: {
		title: string;
		desc: string;
	};
	approach: {
		title: string;
		desc: string;
		points: string[];
	};
	solution: {
		title: string;
		desc: string;
	};
}

export const portfolioItems: PortfolioItem[] = [
	{
		slug: 'kilimo-table',
		title: 'Kilimo Table',
		tagline: 'Fresh produce. A clearer digital presence.',
		category: 'Web Development & SEO',
		tags: ['All work', 'Web Development', 'SEO Foundations'],
		client: 'Kilimo Table (Concept)',
		scope: 'Web development, SEO architecture, mobile interface',
		timeline: '6 weeks',
		heroImage: '/images/kilimo-home-feature.png',
		summary:
			'A warm, mobile-minded website concept for a Kenyan produce business. Built around product clarity, sourcing transparency, and a simpler path to enquiry.',
		challenge: {
			title: 'Make a fresh produce catalogue easy to navigate on mobile.',
			desc: 'Local produce customers need to quickly see what is currently harvested, where it is sourced, and how to place an order or enquiry without getting trapped in a complicated checkout maze.'
		},
		approach: {
			title: 'Clarity first. Character in the details.',
			desc: 'We created an intentional visual hierarchy that prioritises seasonal availability, clear category navigation, and direct WhatsApp or call enquiry links.',
			points: [
				'Focused homepage with a single primary enquiry path',
				'Seasonal produce groupings rather than complex unmanageable inventory lists',
				'Mobile-first layouts designed for quick scanning and one-thumb actions',
				'Search-optimized service and category page structure'
			]
		},
		solution: {
			title: 'A dependable digital storefront built for local trade.',
			desc: 'The result is a clean, responsive web presence that communicates product quality honestly, loads instantly on 3G connections, and turns casual visitors into direct buyers.'
		}
	},
	{
		slug: 'pamoja-studio',
		title: 'Pamoja Studio',
		tagline: 'Spaces for everyday living. Made in Kenya.',
		category: 'Website Revamp & UI Design',
		tags: ['All work', 'Website Revamp'],
		client: 'Pamoja Studio (Concept)',
		scope: 'Website revamp, collection restructuring, art direction',
		timeline: '5 weeks',
		heroImage: '/images/kilimo-hero-preview.png',
		summary:
			'A considered storefront concept for an artisanal Kenyan furniture and interiors workshop. A clearer collection structure paired with materials-led art direction.',
		challenge: {
			title: 'Highlight craftsmanship without visual clutter.',
			desc: 'Bespoke furniture studios need a digital portfolio that highlights wood grains, joinery details, and custom dimensions without burying visitors in bloated e-commerce software.'
		},
		approach: {
			title: 'Materials forward. Restrained navigation.',
			desc: 'Clean, high-contrast layouts organized by living spaces, highlighting indigenous hardwoods and providing direct workshop commission enquiry routes.',
			points: [
				'High-contrast layout that lets timber textures breathe',
				'Direct commission enquiry actions per furniture piece',
				'Transparent fabrication lead times and dimension specifications',
				'Optimised image galleries with instant mobile loading'
			]
		},
		solution: {
			title: 'Elevated brand perception for bespoke makers.',
			desc: 'A refined, editorial storefront that establishes credibility, shows craftsmanship at its best, and generates qualified interior commission enquiries.'
		}
	},
	{
		slug: 'pwani-stays',
		title: 'Pwani Stays',
		tagline: 'Slow down. Stay by the sea.',
		category: 'Web Development & Booking Flow',
		tags: ['All work', 'Web Development'],
		client: 'Pwani Stays (Concept)',
		scope: 'Web development, enquiry booking flow, mobile optimisation',
		timeline: '4 weeks',
		heroImage: '/images/serval-home-section.png',
		summary:
			'A calm, enquiry-led site concept for a coastal Kenyan guesthouse. Clear stay information, thoughtful mobile layouts, and a direct reservation flow.',
		challenge: {
			title: 'Deliver tranquil coastal hospitality on small screens.',
			desc: 'Travellers researching coastal getaways are often on mobile devices with fluctuating connectivity. Complex multi-step booking engines lead to high drop-offs.'
		},
		approach: {
			title: 'Lightweight, atmospheric, friction-free.',
			desc: 'Atmospheric photography paired with a streamlined 3-step availability check that connects guests directly with hosts via WhatsApp and email.',
			points: [
				'Optimised hero photography with instant mobile rendering',
				'Transparent seasonal rate cards and room amenity breakdowns',
				'Clear location and local travel guidance',
				'Direct WhatsApp and email reservation actions'
			]
		},
		solution: {
			title: 'Hospitality without the booking maze.',
			desc: 'A serene online experience that reflects the calm of the stay itself, reducing booking friction and answering guests’ essential questions immediately.'
		}
	}
];
