<script lang="ts">
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';
	import SearchConsoleWidget from '$lib/components/SearchConsoleWidget.svelte';
	import NextMoveCta from '$lib/components/NextMoveCta.svelte';
	import { services, type Service } from '$lib/data/services';

	let service = $derived.by<Service>(() => {
		const s = services.find((item) => item.slug === page.params.slug);
		if (!s) {
			throw error(404, 'Service not found');
		}
		return s;
	});

	let openFaq = $state<number | null>(null);

	function toggleFaq(i: number) {
		openFaq = openFaq === i ? null : i;
	}
</script>

<svelte:head>
	<title>{service.title} — El Serval KE</title>
	<meta name="description" content={service.summary} />
</svelte:head>

<!-- Hero Section with Sharp Edges -->
<section class="border-b border-border-subtle/80 py-12 sm:py-20">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<!-- Back link -->
		<div class="mb-8">
			<a
				href="/services"
				class="inline-flex items-center gap-1.5 font-mono text-sm font-medium text-text-muted transition-colors hover:text-[#ea9c5a]"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-4 w-4"
				>
					<path
						fill-rule="evenodd"
						d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
						clip-rule="evenodd"
					/>
				</svg>
				<span>Back to all services</span>
			</a>
		</div>

		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
			<!-- Hero Left -->
			<div class="lg:col-span-6">
				<div class="mb-4 inline-flex items-center gap-2">
					<span
						class="border border-[#ea9c5a]/40 bg-[#341608] px-3 py-1 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
					>
						Service #{service.index}
					</span>
				</div>
				<h1
					class="mb-6 font-serif text-4xl leading-[1.1] font-bold tracking-tight text-text-main sm:text-5xl lg:text-6xl"
				>
					{service.tagline}
				</h1>
				<p class="mb-6 max-w-xl font-sans text-lg leading-relaxed text-text-muted">
					{service.summary}
				</p>
				<p class="mb-8 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase">
					{service.audience}
				</p>

				<div class="flex flex-wrap items-center gap-4">
					<a
						href="/contact"
						class="chamfer-tr inline-flex items-center gap-2 border border-[#ea9c5a]/40 bg-[#ea9c5a] px-7 py-4 font-semibold tracking-tight text-[#180e05] transition-all duration-200 hover:bg-[#f0ab6b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a]"
					>
						<span>Discuss your {service.title} priorities</span>
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

			<!-- Hero Right: Contextual Graphic with Sharp Borders -->
			<div class="w-full lg:col-span-6">
				{#if service.slug === 'search-engine-optimization'}
					<SearchConsoleWidget />
				{:else}
					<div class="border border-border-subtle bg-surface/90 p-8 shadow-2xl">
						<div
							class="mb-6 flex items-center justify-between border-b border-border-subtle/80 pb-4"
						>
							<h3 class="font-serif text-xl font-bold text-text-main">{service.title}</h3>
							<span
								class="border border-[#ea9c5a]/30 bg-[#341608] px-2.5 py-0.5 font-mono text-xs text-[#ea9c5a] uppercase"
							>
								Overview
							</span>
						</div>

						<div class="mb-6">
							<div class="font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase">
								Investment
							</div>
							<div class="mt-1 font-mono text-2xl font-bold text-text-main">
								{service.priceRange}
								<span class="font-mono text-xs font-normal text-text-muted"
									>{service.pricePeriod}</span
								>
							</div>
						</div>

						<div class="space-y-3">
							<div class="font-mono text-xs tracking-wider text-text-muted uppercase">
								Included in scope:
							</div>
							<ul class="space-y-2.5">
								{#each service.scope as item}
									<li class="flex items-center gap-2.5 text-sm text-text-main">
										<span class="font-bold text-[#ea9c5a]">✓</span>
										<span>{item}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- 3 Pillars Grid with Sharp Boxes -->
		<div class="mt-16 grid grid-cols-1 gap-8 border-t border-border-subtle/80 pt-16 md:grid-cols-3">
			{#each service.benefits as benefit (benefit.title)}
				<div class="border border-border-subtle bg-surface/40 p-6">
					<h3 class="mb-2 font-serif text-xl font-bold text-text-main">{benefit.title}</h3>
					<p class="font-sans text-sm leading-relaxed text-text-muted">
						{benefit.desc}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Deliverables Section with Sharp Borders -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
			<div class="lg:col-span-5">
				<h2 class="mb-4 font-serif text-3xl font-bold text-text-main sm:text-4xl">
					Agreed deliverables. No ambiguity.
				</h2>
				<p class="font-sans leading-relaxed text-base text-text-muted">
					Every engagement starts with a clearly defined scope so expectations, deliverables, and
					timelines are understood by everyone involved.
				</p>
			</div>

			<div class="border border-border-subtle bg-surface p-6 sm:p-8 lg:col-span-7">
				<ul class="space-y-4">
					{#each service.deliverables as del, i (i)}
						<li class="flex items-start gap-3 text-sm text-text-muted sm:text-base">
							<span class="text-lg leading-none font-bold text-[#ea9c5a]" aria-hidden="true">✓</span
							>
							<span class="text-text-main">{del}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Timeline / Working Process with Sharp Cards -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="mb-10 max-w-2xl">
			<h2 class="font-serif text-3xl font-bold text-text-main sm:text-4xl">How the work unfolds</h2>
			<p class="mt-2 text-text-muted">
				A disciplined sequence from initial audit to delivery and ongoing review.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each service.timeline as step (step.step)}
				<div class="border border-border-subtle bg-surface p-6">
					<div class="mb-2 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase">
						{step.step}
					</div>
					<h3 class="mb-2 font-serif text-lg font-bold text-text-main">{step.title}</h3>
					<p class="text-sm leading-relaxed text-text-muted">{step.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- FAQs Section with Sharp Accordion -->
{#if service.faqs && service.faqs.length > 0}
	<section class="border-b border-border-subtle/80 py-16 sm:py-24">
		<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
			<div class="mb-12 max-w-2xl">
				<h2 class="font-serif text-3xl font-bold text-text-main sm:text-4xl">
					Frequently asked questions
				</h2>
			</div>

			<div class="divide-y divide-border-subtle border border-border-subtle bg-surface">
				{#each service.faqs as faq, i (faq.q)}
					<div class="p-6">
						<button
							type="button"
							class="flex w-full items-center justify-between text-left font-serif text-lg font-bold text-text-main transition-colors hover:text-[#ea9c5a] focus:outline-none"
							onclick={() => toggleFaq(i)}
							aria-expanded={openFaq === i}
						>
							<span>{faq.q}</span>
							<span class="ml-4 font-mono text-xl text-[#ea9c5a]">{openFaq === i ? '−' : '+'}</span>
						</button>
						{#if openFaq === i}
							<p class="mt-3 font-sans text-sm leading-relaxed text-text-muted sm:text-base">
								{faq.a}
							</p>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Bottom CTA -->
<NextMoveCta />
