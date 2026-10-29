<script lang="ts">
	import NextMoveCta from '$lib/components/NextMoveCta.svelte';
	import { portfolioItems } from '$lib/data/portfolio';

	let activeFilter = $state('All work');

	const filters = ['All work', 'Web Development', 'Website Revamp', 'SEO Foundations'];

	let filteredItems = $derived(
		activeFilter === 'All work'
			? portfolioItems
			: portfolioItems.filter((item) => item.tags.includes(activeFilter))
	);
</script>

<svelte:head>
	<title>Portfolio — Case Studies & Concepts | El Serval KE</title>
	<meta
		name="description"
		content="Explore web development and design concepts crafted for Kenyan small and medium businesses."
	/>
</svelte:head>

<!-- Hero Section with Sharp Edges -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="max-w-3xl">
			<div class="mb-4 inline-flex items-center gap-2">
				<span
					class="border border-[#ea9c5a]/40 bg-[#341608] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
				>
					Portfolio & Case Studies
				</span>
			</div>
			<h1
				class="font-serif text-5xl leading-[1.08] font-bold tracking-tight text-text-main sm:text-6xl"
			>
				Ideas made tangible.
			</h1>
			<p class="mt-6 font-sans text-xl leading-relaxed text-text-muted">
				A curated collection of website concepts crafted for Kenyan SMBs. Explore the thinking,
				structure, and design decisions behind the work.
			</p>
		</div>

		<!-- Filters Bar with Sharp Buttons -->
		<div
			class="mt-10 flex flex-wrap items-center gap-2"
			role="group"
			aria-label="Portfolio filters"
		>
			{#each filters as f (f)}
				<button
					type="button"
					aria-pressed={activeFilter === f}
					class="border px-4 py-2 font-mono text-xs tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a] {activeFilter ===
					f
						? 'border-[#ea9c5a] bg-[#341608] font-semibold text-[#ea9c5a]'
						: 'border-border-subtle bg-surface text-text-muted hover:border-text-muted hover:text-text-main'}"
					onclick={() => (activeFilter = f)}
				>
					{f}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Projects Grid Section with Sharp Cards -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredItems as item (item.slug)}
				<a
					href="/portfolio/{item.slug}"
					class="group flex flex-col justify-between overflow-hidden border border-border-subtle bg-surface transition-all duration-300 hover:border-[#ea9c5a]/40 hover:shadow-2xl"
				>
					<div>
						<!-- Preview Graphic Banner with Sharp Frame -->
						<div class="relative aspect-video w-full overflow-hidden bg-[#0c0e0e]">
							<img
								src={item.heroImage}
								alt="{item.title} preview"
								class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
							/>
						</div>

						<!-- Details -->
						<div class="p-6 sm:p-7">
							<div class="mb-3 flex items-center justify-between text-xs">
								<span
									class="border border-[#ea9c5a]/30 bg-[#341608] px-2.5 py-0.5 font-mono text-xs text-[#ea9c5a] uppercase"
								>
									{item.category}
								</span>
								<span class="font-mono text-text-dim">{item.timeline}</span>
							</div>

							<h2
								class="mb-2 font-serif text-2xl font-bold text-text-main transition-colors group-hover:text-[#ea9c5a]"
							>
								{item.title}
							</h2>

							<p class="mb-4 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase">
								{item.tagline}
							</p>

							<p class="font-sans text-sm leading-relaxed text-text-muted">
								{item.summary}
							</p>
						</div>
					</div>

					<div
						class="flex items-center justify-between border-t border-border-subtle/60 px-6 py-4 font-mono text-xs font-semibold text-[#ea9c5a] sm:px-7"
					>
						<span>View case study</span>
						<span class="transition-transform group-hover:translate-x-1">→</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Bottom CTA -->
<NextMoveCta />
