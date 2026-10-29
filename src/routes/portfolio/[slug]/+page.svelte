<script lang="ts">
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';
	import NextMoveCta from '$lib/components/NextMoveCta.svelte';
	import { portfolioItems, type PortfolioItem } from '$lib/data/portfolio';

	let item = $derived.by<PortfolioItem>(() => {
		const found = portfolioItems.find((p) => p.slug === page.params.slug);
		if (!found) {
			throw error(404, 'Portfolio item not found');
		}
		return found;
	});
</script>

<svelte:head>
	<title>{item.title} — Case Study | El Serval KE</title>
	<meta name="description" content={item.summary} />
</svelte:head>

<!-- Case Study Header with Sharp Edges -->
<section class="border-b border-border-subtle/80 py-12 sm:py-20">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<!-- Back link -->
		<div class="mb-8">
			<a
				href="/portfolio"
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
				<span>Back to all projects</span>
			</a>
		</div>

		<div class="max-w-3xl">
			<div class="mb-4 inline-flex items-center gap-2">
				<span
					class="border border-[#ea9c5a]/40 bg-[#341608] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
				>
					{item.category}
				</span>
			</div>
			<h1
				class="mb-4 font-serif text-4xl leading-[1.1] font-bold tracking-tight text-text-main sm:text-5xl lg:text-6xl"
			>
				{item.title}
			</h1>
			<p class="mb-6 font-sans text-xl font-medium text-[#f6cc9b]">
				{item.tagline}
			</p>
			<p class="font-sans text-lg leading-relaxed text-text-muted">
				{item.summary}
			</p>
		</div>

		<!-- Metadata Bar with Sharp Grid -->
		<div
			class="mt-12 grid grid-cols-2 gap-6 border border-border-subtle bg-surface/70 p-6 sm:grid-cols-4"
		>
			<div>
				<div class="font-mono text-xs font-semibold tracking-wider text-text-dim uppercase">
					Client
				</div>
				<div class="mt-1 font-sans text-sm font-medium text-text-main">{item.client}</div>
			</div>
			<div>
				<div class="font-mono text-xs font-semibold tracking-wider text-text-dim uppercase">
					Scope
				</div>
				<div class="mt-1 font-sans text-sm font-medium text-text-main">{item.scope}</div>
			</div>
			<div>
				<div class="font-mono text-xs font-semibold tracking-wider text-text-dim uppercase">
					Timeline
				</div>
				<div class="mt-1 font-sans text-sm font-medium text-text-main">{item.timeline}</div>
			</div>
			<div>
				<div class="font-mono text-xs font-semibold tracking-wider text-text-dim uppercase">
					Category
				</div>
				<div class="mt-1 font-sans text-sm font-medium text-text-main">{item.category}</div>
			</div>
		</div>

		<!-- Hero Image Showcase Frame with Sharp Corners -->
		<div class="mt-10 overflow-hidden border border-border-subtle bg-surface shadow-2xl">
			<div class="relative aspect-video w-full overflow-hidden bg-[#0c0e0e] sm:aspect-21/9">
				<img
					src={item.heroImage}
					alt="{item.title} project hero"
					class="h-full w-full object-cover object-top"
				/>
			</div>
		</div>
	</div>
</section>

<!-- Challenge & Approach Section with Sharp Cards -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
			<!-- Challenge Column -->
			<div class="border border-border-subtle bg-surface p-8 sm:p-10 lg:col-span-5">
				<div class="mb-3 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase">
					The Challenge
				</div>
				<h2 class="mb-4 font-serif text-2xl font-bold text-text-main sm:text-3xl">
					{item.challenge.title}
				</h2>
				<p class="font-sans leading-relaxed text-text-muted">
					{item.challenge.desc}
				</p>
			</div>

			<!-- Approach Column -->
			<div class="border border-border-subtle bg-surface p-8 sm:p-10 lg:col-span-7">
				<div class="mb-3 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase">
					The Approach
				</div>
				<h2 class="mb-4 font-serif text-2xl font-bold text-text-main sm:text-3xl">
					{item.approach.title}
				</h2>
				<p class="mb-6 font-sans leading-relaxed text-text-muted">
					{item.approach.desc}
				</p>

				<ul class="space-y-3">
					{#each item.approach.points as pt, ptIdx (ptIdx)}
						<li class="flex items-start gap-3 text-sm text-text-main sm:text-base">
							<span class="font-bold text-[#ea9c5a]" aria-hidden="true">✓</span>
							<span>{pt}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Solution Section -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="max-w-3xl">
			<div class="mb-3 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase">
				The Outcome
			</div>
			<h2 class="mb-6 font-serif text-3xl font-bold text-text-main sm:text-4xl">
				{item.solution.title}
			</h2>
			<p class="font-sans text-lg leading-relaxed text-text-muted">
				{item.solution.desc}
			</p>
			<div class="mt-8">
				<a
					href="/portfolio"
					class="inline-flex items-center gap-2 font-mono text-sm font-medium text-[#ea9c5a] hover:underline"
				>
					← Back to all projects
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Bottom CTA -->
<NextMoveCta />
