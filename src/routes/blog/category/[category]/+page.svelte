<script lang="ts">
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';
	import NextMoveCta from '$lib/components/NextMoveCta.svelte';
	import { categories, articles, type CategoryInfo } from '$lib/data/blog';

	let categoryInfo = $derived.by<CategoryInfo>(() => {
		const param = (page.params.category ?? '').toLowerCase();
		const cat = categories.find((c) => c.slug === param);
		if (!cat) {
			throw error(404, 'Category not found');
		}
		return cat;
	});

	let catArticles = $derived(articles.filter((a) => a.categorySlug === categoryInfo.slug));

	const filterList = [
		{ name: 'All', count: articles.length.toString().padStart(2, '0'), slug: 'all' },
		...categories.map((c) => ({ name: c.name, count: c.count, slug: c.slug }))
	];
</script>

<svelte:head>
	<title>{categoryInfo.name} Articles — {categoryInfo.tagline} | El Serval KE</title>
	<meta name="description" content={categoryInfo.description} />
</svelte:head>

<!-- Hero Section -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="mb-4">
			<a
				href="/blog"
				class="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-[#ea9c5a]"
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
				<span>Back to all articles</span>
			</a>
		</div>

		<div class="max-w-3xl">
			<span
				class="mb-3 inline-block border border-[#ea9c5a]/30 bg-[#341608] px-3 py-1 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase"
			>
				Category: {categoryInfo.name}
			</span>
			<h1
				class="font-serif text-4xl leading-tight font-bold tracking-tight text-text-main sm:text-6xl"
			>
				{categoryInfo.tagline}
			</h1>
			<p class="mt-6 font-sans text-lg leading-relaxed text-text-muted sm:text-xl">
				{categoryInfo.description}
			</p>
		</div>

		<!-- Category Filter Tabs -->
		<div class="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Category Filters">
			{#each filterList as filter (filter.slug)}
				<a
					href={filter.slug === 'all' ? '/blog' : `/blog/category/${filter.slug}`}
					class="border px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a] {filter.slug ===
					categoryInfo.slug
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

<!-- Category Articles Grid -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each catArticles as art (art.slug)}
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

						<h2
							class="mb-3 font-serif text-xl font-bold text-text-main transition-colors group-hover:text-[#ea9c5a]"
						>
							{art.title}
						</h2>

						<p class="mb-6 font-sans text-sm leading-relaxed text-text-muted">
							{art.summary}
						</p>
					</div>

					<div
						class="flex items-center justify-between border-t border-border-subtle/60 pt-4 text-xs text-text-dim"
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
