<script lang="ts">
	import SearchConsoleWidget from '$lib/components/SearchConsoleWidget.svelte';
	import NextMoveCta from '$lib/components/NextMoveCta.svelte';
	import { services } from '$lib/data/services';
	import { articles } from '$lib/data/blog';

	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

	const faqs = [
		{
			q: 'I’m not sure which service I need. Where do I start?',
			a: 'Start with the business problem. Tell me what is not working and share your website if you have one. We can identify the priority before choosing a service.'
		},
		{
			q: 'Do you only work with Kenyan businesses?',
			a: 'The primary focus is Kenyan small and medium-sized businesses. Work is scoped around your local audience, commercial goals, and ability to maintain the website over time.'
		},
		{
			q: 'Can you improve a website someone else built?',
			a: 'Often, yes. I first review the platform, hosting access and overall condition of the site. If it is safer or more practical to rebuild, I will explain why before we agree on work.'
		},
		{
			q: 'Can you guarantee first-place rankings or complete security?',
			a: 'No. Search rankings and security depend on many factors. You can expect clear priorities, careful implementation and honest reporting, not impossible guarantees.'
		}
	];

	const engagementSteps = [
		{
			id: '01',
			title: 'Understand',
			desc: 'A conversation about your business, your customers, and what is getting in the way.'
		},
		{
			id: '02',
			title: 'Map the work',
			desc: 'A clear scope, priorities, indicative timing, and a quote to approve before work starts.'
		},
		{
			id: '03',
			title: 'Build & check',
			desc: 'Focused implementation with visible checkpoints and testing against the agreed scope.'
		},
		{
			id: '04',
			title: 'Hand over well',
			desc: 'A practical walkthrough, useful documentation, and a plan for ongoing care if you need it.'
		}
	];

	const samplePrices = [
		{
			title: 'Ongoing website care',
			price: 'KES 5,000–20,000',
			period: '/ month · Website Maintenance',
			href: '/services/website-maintenance'
		},
		{
			title: 'Search visibility',
			price: 'KES 20,000–60,000',
			period: '/ month · Search Engine Optimization',
			href: '/services/search-engine-optimization'
		},
		{
			title: 'A new website',
			price: 'KES 60,000–200,000',
			period: '/ project · Web Development',
			href: '/services/web-development'
		}
	];
</script>

<svelte:head>
	<title>El Serval KE — Independent Digital Specialist / Kenya</title>
	<meta
		name="description"
		content="Websites that work harder for Kenyan businesses. Search visibility, performance and security — handled by one accountable specialist."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
			<!-- Hero Left Column -->
			<div class="flex flex-col justify-center lg:col-span-6">
				<div class="mb-5 inline-flex items-center gap-2">
					<span
						class="border border-[#ea9c5a]/40 bg-[#341608] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
					>
						Independent Digital Specialist · Kenya
					</span>
				</div>

				<h1
					class="mb-6 font-serif text-5xl leading-[1.08] font-bold tracking-tight text-text-main sm:text-6xl xl:text-7xl"
				>
					Built to be <br />
					<span class="text-[#ea9c5a]">found.</span> <br />
					Ready to last.
				</h1>

				<p class="mb-8 max-w-xl font-sans text-lg leading-relaxed text-text-muted sm:text-xl">
					Websites that work harder for Kenyan businesses. Search visibility, performance and
					security — handled by one accountable specialist.
				</p>

				<!-- Hero CTA Buttons with Chamfered Futuristic Edges -->
				<div class="mb-8 flex flex-wrap items-center gap-4">
					<a
						href="/contact"
						class="chamfer-tr inline-flex items-center gap-2 border border-[#ea9c5a]/40 bg-[#ea9c5a] px-7 py-4 font-semibold tracking-tight text-[#180e05] transition-all duration-200 hover:bg-[#f0ab6b] hover:shadow-lg hover:shadow-[#ea9c5a]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a] active:translate-y-0.5"
					>
						<span>Start a project</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="h-4 w-4"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>

					<a
						href="/services"
						class="inline-flex items-center gap-2 border border-border-subtle bg-surface px-6 py-4 font-medium tracking-tight text-text-main transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a]"
					>
						<span>Explore services</span>
					</a>
				</div>

				<!-- Selling Point -->
				<div class="flex items-center gap-3 font-mono text-xs text-text-muted sm:text-sm">
					<span class="h-2 w-2 bg-[#ea9c5a]"></span>
					<span>One specialist. A clear plan. No agency layers.</span>
				</div>
			</div>

			<!-- Hero Right Column: Search Console Preview -->
			<div class="w-full lg:col-span-6">
				<SearchConsoleWidget />
			</div>
		</div>
	</div>
</section>

<!-- Section 01: Value Pillars with Sharp Cards -->
<section class="border-y border-border-subtle/80 py-20 sm:py-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
			<div class="lg:col-span-4">
				<div class="mb-3 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase">
					Clarity & Focus
				</div>
				<h2 class="font-serif text-3xl leading-tight font-bold text-text-main sm:text-4xl">
					Your business <br />
					deserves more than <br />
					<span class="text-[#ea9c5a]">“just online”.</span>
				</h2>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:col-span-8">
				<!-- Card 1 -->
				<div
					class="group border border-border-subtle bg-surface p-6 transition-all duration-200 hover:border-[#ea9c5a]/40 hover:shadow-lg"
				>
					<div
						class="mb-5 flex h-10 w-10 items-center justify-center border border-[#ea9c5a]/30 bg-[#341608] text-[#ea9c5a]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-5 w-5"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</div>
					<h3
						class="mb-2 font-serif text-lg font-bold text-text-main transition-colors group-hover:text-[#ea9c5a]"
					>
						Unseen in search?
					</h3>
					<p class="text-sm leading-relaxed text-text-muted">
						Make your services easier for nearby prospective clients to discover.
					</p>
				</div>

				<!-- Card 2 -->
				<div
					class="group border border-border-subtle bg-surface p-6 transition-all duration-200 hover:border-[#ea9c5a]/40 hover:shadow-lg"
				>
					<div
						class="mb-5 flex h-10 w-10 items-center justify-center border border-[#ea9c5a]/30 bg-[#341608] text-[#ea9c5a]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-5 w-5"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
							/>
						</svg>
					</div>
					<h3
						class="mb-2 font-serif text-lg font-bold text-text-main transition-colors group-hover:text-[#ea9c5a]"
					>
						Slow or outdated?
					</h3>
					<p class="text-sm leading-relaxed text-text-muted">
						Give mobile visitors a lighter, faster, friction-free path to enquire.
					</p>
				</div>

				<!-- Card 3 -->
				<div
					class="group border border-border-subtle bg-surface p-6 transition-all duration-200 hover:border-[#ea9c5a]/40 hover:shadow-lg"
				>
					<div
						class="mb-5 flex h-10 w-10 items-center justify-center border border-[#ea9c5a]/30 bg-[#341608] text-[#ea9c5a]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-5 w-5"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
							/>
						</svg>
					</div>
					<h3
						class="mb-2 font-serif text-lg font-bold text-text-main transition-colors group-hover:text-[#ea9c5a]"
					>
						Unsure what’s secure?
					</h3>
					<p class="text-sm leading-relaxed text-text-muted">
						Understand real risks and implement practical security hygiene.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Section 02: Capabilities & Services with Sharp Borders -->
<section class="border-b border-border-subtle/80 py-20 sm:py-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="mb-12 max-w-3xl">
			<div class="mb-3 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase">
				Core Disciplines
			</div>
			<h2 class="mb-4 font-serif text-3xl leading-tight font-bold text-text-main sm:text-5xl">
				Six disciplines. One joined-up website.
			</h2>
			<p class="text-lg leading-relaxed text-text-muted">
				Start with the real bottleneck, not a generic package. Get the right mix of digital support
				for where your business is today.
			</p>
		</div>

		<!-- List of services -->
		<div class="divide-y divide-border-subtle">
			{#each services as svc (svc.slug)}
				<a
					href="/services/{svc.slug}"
					class="group flex flex-col justify-between gap-4 py-6 transition-colors hover:bg-surface/50 sm:px-4 sm:py-7 md:flex-row md:items-center"
				>
					<div class="flex items-baseline gap-4 sm:gap-6">
						<span class="font-mono text-sm font-bold text-[#ea9c5a]">{svc.index}</span>
						<h3
							class="font-serif text-xl font-bold text-text-main transition-colors group-hover:text-[#ea9c5a] sm:text-2xl"
						>
							{svc.title}
						</h3>
					</div>

					<div class="flex items-center justify-between gap-6 md:w-1/2 md:justify-end">
						<p class="line-clamp-1 text-sm text-text-muted">{svc.tagline}</p>
						<span
							class="transform font-mono text-lg text-[#ea9c5a] transition-transform group-hover:translate-x-1"
						>
							→
						</span>
					</div>
				</a>
			{/each}
		</div>

		<div class="mt-10">
			<a
				href="/services"
				class="chamfer-tr inline-flex items-center gap-2 border border-[#ea9c5a]/40 bg-[#ea9c5a] px-6 py-3.5 text-sm font-semibold tracking-tight text-[#180e05] transition-all hover:bg-[#f0ab6b]"
			>
				<span>View all services</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-4 w-4"
				>
					<path
						fill-rule="evenodd"
						d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- Section 03: Featured Concept with Sharp Edge Frame -->
<section class="border-b border-border-subtle/80 py-20 sm:py-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<div class="mb-2 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase">
					Featured Concept
				</div>
				<h2 class="font-serif text-3xl font-bold text-text-main sm:text-4xl">
					A fresh digital home for local produce.
				</h2>
			</div>
			<div>
				<a
					href="/portfolio/kilimo-table"
					class="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-[#ea9c5a] hover:underline"
				>
					<span>View case study</span>
					<span>→</span>
				</a>
			</div>
		</div>

		<!-- Kilimo Table Showcase Card with Sharp Edges -->
		<a
			href="/portfolio/kilimo-table"
			class="group relative block overflow-hidden border border-border-subtle bg-surface transition-all duration-300 hover:border-[#ea9c5a]/40 hover:shadow-2xl"
		>
			<div class="relative aspect-video w-full overflow-hidden bg-[#0c0e0e] sm:aspect-21/9">
				<img
					src="/images/kilimo-home-feature.png"
					alt="Kilimo Table Concept Preview"
					class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
				/>
			</div>

			<div class="flex flex-col justify-between gap-6 p-6 sm:p-8 md:flex-row md:items-center">
				<div>
					<h3
						class="mb-1 font-serif text-2xl font-bold text-text-main transition-colors group-hover:text-[#ea9c5a] sm:text-3xl"
					>
						Kilimo Table
					</h3>
					<p class="text-sm text-text-muted">A clearer digital presence for fresh Kenyan produce</p>
				</div>
				<div
					class="border border-[#ea9c5a]/30 bg-[#341608] px-3.5 py-1 font-mono text-xs font-medium text-[#ea9c5a] uppercase"
				>
					Web Development · SEO Architecture
				</div>
			</div>
		</a>
	</div>
</section>

<!-- Section 04: Independent by Design with Sharp Frame -->
<section class="border-b border-border-subtle/80 py-20 sm:py-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
			<!-- Image Column -->
			<div class="relative lg:col-span-5">
				<div class="relative aspect-square overflow-hidden border border-border-subtle bg-surface">
					<img
						src="/images/serval-home-section.png"
						alt="Serval cat representation"
						class="h-full w-full object-cover"
					/>
				</div>
			</div>

			<!-- Text Column -->
			<div class="lg:col-span-7">
				<div class="mb-3 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase">
					Independent Practice
				</div>
				<h2
					class="mb-6 font-serif text-3xl leading-tight font-bold text-text-main sm:text-4xl lg:text-5xl"
				>
					No agency layers between your idea and the person building it.
				</h2>
				<p class="mb-4 font-sans leading-relaxed text-text-muted sm:text-lg">
					El Serval KE is an independent specialist practice based in Nairobi. I bring deliberate
					craft and accountability to the everyday digital challenges of Kenyan businesses.
				</p>
				<p class="mb-8 font-sans leading-relaxed text-text-muted sm:text-lg">
					The serval is the inspiration: attentive, resourceful, and precise. That means
					understanding your actual operational needs before writing code.
				</p>
				<a
					href="/about"
					class="chamfer-tr inline-flex items-center gap-2 border border-[#ea9c5a]/40 bg-[#ea9c5a] px-6 py-3.5 text-sm font-semibold tracking-tight text-[#180e05] transition-all hover:bg-[#f0ab6b]"
				>
					<span>About the practice</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-4 w-4"
					>
						<path
							fill-rule="evenodd"
							d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Section 05: How We Work (The Engagement) with Sharp Cards -->
<section class="border-b border-border-subtle/80 py-20 sm:py-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="mb-12 max-w-2xl">
			<div class="mb-3 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase">Our Process</div>
			<h2 class="font-serif text-3xl leading-tight font-bold text-text-main sm:text-5xl">
				A clear route. No guesswork.
			</h2>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{#each engagementSteps as step (step.id)}
				<div
					class="relative flex flex-col justify-between border border-border-subtle bg-surface p-6 transition-all hover:border-[#ea9c5a]/40 sm:p-7"
				>
					<span class="mb-4 font-mono text-2xl font-bold text-[#ea9c5a]">{step.id}</span>
					<div>
						<h3 class="mb-2 font-serif text-xl font-bold text-text-main">{step.title}</h3>
						<p class="text-sm leading-relaxed text-text-muted">{step.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Section 06: Indicative Pricing with Sharp Cards -->
<section class="border-b border-border-subtle/80 py-20 sm:py-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
			<div class="lg:col-span-5">
				<div class="mb-3 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase">
					Pricing Transparency
				</div>
				<h2 class="mb-4 font-serif text-3xl leading-tight font-bold text-text-main sm:text-4xl">
					Know the investment before you commit.
				</h2>
				<p class="mb-6 leading-relaxed text-text-muted sm:text-lg">
					Scope comes first. These illustrative ranges help you plan an informed conversation —
					final quotes are confirmed after reviewing your exact requirements.
				</p>
				<a
					href="/services"
					class="inline-flex items-center gap-2 border border-border-subtle bg-surface px-6 py-3.5 text-sm font-medium tracking-tight text-text-main transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a]"
				>
					<span>Explore all services</span>
					<span>→</span>
				</a>
			</div>

			<div class="flex flex-col gap-4 lg:col-span-7">
				{#each samplePrices as sp (sp.title)}
					<a
						href={sp.href}
						class="group flex flex-col justify-between gap-4 border border-border-subtle bg-surface p-6 transition-colors hover:border-[#ea9c5a]/40 sm:flex-row sm:items-center"
					>
						<div>
							<h3
								class="mb-1 font-serif text-lg font-bold text-text-main transition-colors group-hover:text-[#ea9c5a]"
							>
								{sp.title}
							</h3>
							<span class="font-mono text-xs text-text-muted">{sp.period}</span>
						</div>
						<div class="font-mono text-xl font-bold text-[#ea9c5a] sm:text-2xl">
							{sp.price}
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Section 07: FAQ with Sharp Borders -->
<section class="border-b border-border-subtle/80 py-20 sm:py-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
			<div class="lg:col-span-5">
				<div class="mb-3 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase">
					Common Questions
				</div>
				<h2 class="mb-4 font-serif text-3xl leading-tight font-bold text-text-main sm:text-4xl">
					A little clarity goes a long way.
				</h2>
				<p class="leading-relaxed text-text-muted sm:text-lg">
					Straightforward answers to the questions clients ask most before getting started.
				</p>
			</div>

			<div
				class="divide-y divide-border-subtle border border-border-subtle bg-surface lg:col-span-7"
				role="region"
				aria-label="Frequently Asked Questions"
			>
				{#each faqs as faq, i (faq.q)}
					<div class="p-6">
						<button
							type="button"
							id="faq-header-{i}"
							aria-expanded={openFaq === i}
							aria-controls="faq-panel-{i}"
							class="group flex w-full items-center justify-between text-left focus:outline-none focus-visible:text-[#ea9c5a]"
							onclick={() => toggleFaq(i)}
						>
							<span
								class="pr-6 font-serif text-lg font-bold text-text-main transition-colors group-hover:text-[#ea9c5a] sm:text-xl"
							>
								{faq.q}
							</span>
							<span
								class="transform font-mono text-xl text-[#ea9c5a] transition-transform duration-200"
								aria-hidden="true"
							>
								{openFaq === i ? '−' : '+'}
							</span>
						</button>
						{#if openFaq === i}
							<div
								id="faq-panel-{i}"
								role="region"
								aria-labelledby="faq-header-{i}"
								class="animate-in fade-in pt-3 font-sans text-sm leading-relaxed text-text-muted sm:text-base"
							>
								{faq.a}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Section 08: From the Blog with Sharp Cards -->
<section class="border-b border-border-subtle/80 py-20 sm:py-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
			<div>
				<div class="mb-3 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase">
					From the Blog
				</div>
				<h2 class="font-serif text-3xl font-bold text-text-main sm:text-4xl">
					Useful thinking. No noise.
				</h2>
			</div>
			<div>
				<a
					href="/blog"
					class="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-[#ea9c5a] hover:underline"
				>
					<span>All articles</span>
					<span>→</span>
				</a>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each articles.slice(0, 3) as art (art.slug)}
				<a
					href="/blog/{art.slug}"
					class="group flex flex-col justify-between border border-border-subtle bg-surface p-6 transition-all duration-200 hover:border-[#ea9c5a]/40 hover:shadow-lg sm:p-7"
				>
					<div>
						<div class="mb-3 flex items-center justify-between text-xs">
							<span
								class="border border-[#ea9c5a]/30 bg-[#341608] px-2.5 py-0.5 font-mono text-xs text-[#ea9c5a] uppercase"
							>
								{art.category}
							</span>
							<span class="font-mono text-text-dim">{art.readTime}</span>
						</div>

						<h3
							class="mb-3 font-serif text-xl font-bold text-text-main transition-colors group-hover:text-[#ea9c5a]"
						>
							{art.title}
						</h3>

						<p class="mb-6 font-sans text-sm leading-relaxed text-text-muted">
							{art.summary}
						</p>
					</div>

					<div
						class="flex items-center justify-between border-t border-border-subtle/60 pt-4 font-mono text-xs text-text-dim"
					>
						<span>{art.createdDate}</span>
						<span class="font-medium text-[#ea9c5a] group-hover:underline">Read article →</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Bottom CTA -->
<NextMoveCta />
