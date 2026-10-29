<script lang="ts">
	import NextMoveCta from '$lib/components/NextMoveCta.svelte';
	import { articles, categories } from '$lib/data/blog';

	let activeCat = $state('All');

	const filterList = [
		{ name: 'All', count: articles.length.toString().padStart(2, '0'), slug: 'all' },
		...categories.map((c) => ({ name: c.name, count: c.count, slug: c.slug }))
	];

	let editorPick = $derived(articles.find((a) => a.isEditorPick) || articles[0]);
	let filteredArticles = $derived(
		activeCat === 'All'
			? articles.filter((a) => a.slug !== editorPick.slug)
			: articles.filter((a) => a.category === activeCat && a.slug !== editorPick.slug)
	);
</script>

<svelte:head>
	<title>Blog — Practical Guides for a Better Website | El Serval KE</title>
	<meta
		name="description"
		content="Practical reading on search, website performance, maintenance and security for Kenyan business owners."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="mb-6 max-w-3xl">
			<span
				class="mb-3 inline-block border border-[#ea9c5a]/30 bg-[#341608] px-3 py-1 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase"
			>
				Field notes & insights
			</span>
			<h1
				class="font-serif text-5xl leading-[1.08] font-bold tracking-tight text-text-main sm:text-6xl"
			>
				Practical thinking for a better website.
			</h1>
		</div>

		<p class="mb-10 max-w-3xl font-sans text-lg leading-relaxed text-text-muted sm:text-xl">
			Honest, practical reading on search visibility, website speed, routine maintenance and
			security. Written for business owners who want useful next steps without the technical jargon.
		</p>

		<!-- Category Filter Tabs -->
		<div class="flex flex-wrap items-center gap-2" role="group" aria-label="Blog categories">
			{#each filterList as filter (filter.slug)}
				<a
					href={filter.slug === 'all' ? '/blog' : `/blog/category/${filter.slug}`}
					class="border px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a] {activeCat ===
					filter.name
						? 'border-[#ea9c5a] bg-[#ea9c5a] font-semibold text-[#180e05]'
						: 'border-border-subtle bg-surface text-text-muted hover:border-text-muted hover:text-text-main'}"
				>
					{filter.name}
					<span class="ml-1 opacity-70">({filter.count})</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Featured Post Showcase -->
{#if editorPick}
	<section class="border-b border-border-subtle/80 py-16 sm:py-20">
		<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
			<a
				href="/blog/{editorPick.slug}"
				class="group relative block border border-border-subtle bg-surface p-8 transition-all duration-300 hover:border-[#ea9c5a]/40 hover:shadow-xl sm:p-12"
			>
				<div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
					<!-- Left Metadata -->
					<div class="lg:col-span-4">
						<div class="mb-3 flex items-center gap-2">
							<span
								class="border border-[#ea9c5a]/30 bg-[#341608] px-2.5 py-0.5 font-mono text-xs text-[#ea9c5a] uppercase"
							>
								Featured
							</span>
							<span class="font-mono text-xs text-text-muted">{editorPick.category}</span>
						</div>
						<div class="font-mono text-xs text-text-dim">
							{editorPick.readTime} · Published {editorPick.createdDate}
						</div>
					</div>

					<!-- Right Content -->
					<div class="space-y-4 lg:col-span-8">
						<h2
							class="font-serif text-2xl font-bold text-text-main transition-colors group-hover:text-[#ea9c5a] sm:text-3xl lg:text-4xl"
						>
							{editorPick.title}
						</h2>
						<p class="font-sans leading-relaxed text-base text-text-muted sm:text-lg">
							{editorPick.summary}
						</p>
						<div class="pt-2">
							<span
								class="inline-flex items-center gap-1.5 text-sm font-semibold text-[#ea9c5a] group-hover:underline"
							>
								Read article
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
							</span>
						</div>
					</div>
				</div>
			</a>
		</div>
	</section>
{/if}

<!-- Articles Grid -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<h2 class="mb-10 font-serif text-2xl font-bold text-text-main sm:text-3xl">All articles</h2>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredArticles as art (art.slug)}
				<a
					href="/blog/{art.slug}"
					class="group flex flex-col justify-between border border-border-subtle bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#ea9c5a]/40 hover:shadow-lg sm:p-7"
				>
					<div>
						<div class="mb-3 flex items-center justify-between text-xs">
							<span
								class="border border-[#ea9c5a]/30 bg-[#341608] px-2.5 py-0.5 font-mono text-xs text-[#ea9c5a] uppercase"
							>
								{art.category}
							</span>
							<span class="font-mono text-xs text-text-dim">{art.readTime}</span>
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
						class="flex items-center justify-between border-t border-border-subtle/60 pt-4 text-xs text-text-dim"
					>
						<span>{art.createdDate}</span>
						<span class="font-medium text-[#ea9c5a] group-hover:underline">Read →</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Bottom CTA -->
<NextMoveCta />
