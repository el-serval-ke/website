<script lang="ts">
	import NextMoveCta from '$lib/components/NextMoveCta.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let article = $derived(data.article);
	let relatedArticles = $derived(data.relatedArticles);
</script>

<svelte:head>
	<title>{article.title} — El Serval Blog</title>
	<meta name="description" content={article.summary} />
</svelte:head>

<!-- Article Header Section -->
<section class="border-b border-border-subtle/80 py-12 sm:py-20">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<!-- Back link -->
		<div class="mb-8">
			<a
				href="/blog"
				class="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-[#ea9c5a]"
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
				<span>Back to blog</span>
			</a>
		</div>

		<div class="max-w-3xl">
			<!-- Meta Tags -->
			<div class="mb-4 flex flex-wrap items-center gap-3 text-xs">
				<a
					href="/blog/category/{article.categorySlug}"
					class="border border-[#ea9c5a]/30 bg-[#341608] px-3 py-1 font-mono text-xs text-[#ea9c5a] uppercase transition-colors hover:bg-[#ea9c5a] hover:text-[#180e05]"
				>
					{article.category}
				</a>
				<span class="text-text-dim">·</span>
				<span class="font-mono text-text-muted">{article.readTime}</span>
				<span class="text-text-dim">·</span>
				<span class="font-mono text-text-muted">Published {article.createdDate}</span>
			</div>

			<h1
				class="mb-6 font-serif text-3xl leading-tight font-bold tracking-tight text-text-main sm:text-5xl lg:text-5xl"
			>
				{article.title}
			</h1>

			{#if article.summary}
				<p class="font-sans text-lg leading-relaxed text-text-muted sm:text-xl">
					{article.summary}
				</p>
			{/if}
		</div>
	</div>
</section>

<!-- Article Content -->
<article class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
			<!-- Table of Contents Sidebar -->
			<div class="space-y-6 lg:sticky lg:top-28 lg:col-span-4">
				{#if article.sections && article.sections.length > 0}
					<div class="border border-border-subtle bg-surface p-6">
						<h3
							class="mb-4 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
						>
							In this article
						</h3>
						<ul class="space-y-2.5 text-sm">
							{#each article.sections as sec (sec.id)}
								<li>
									<a
										href="#{sec.id}"
										class="block text-text-muted transition-colors hover:text-[#ea9c5a] focus:outline-none focus-visible:text-[#ea9c5a]"
									>
										{sec.title}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="border border-border-subtle bg-base/60 p-5 text-xs text-text-muted">
					<div class="mb-1 font-semibold text-text-main">Need tailored advice?</div>
					<p class="mb-3">
						Every business has unique priorities. Let’s identify what makes the most sense for
						yours.
					</p>
					<a href="/contact" class="font-mono text-xs font-semibold text-[#ea9c5a] hover:underline">
						Discuss your website →
					</a>
				</div>
			</div>

			<!-- Main Article Body -->
			<div class="space-y-12 lg:col-span-8">
				{#if article.descriptionHtml}
					<!-- Rich HTML content from TinyMCE self-hosted editor -->
					<div
						class="prose max-w-none font-sans leading-relaxed text-base text-text-muted prose-invert sm:text-lg [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-28 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text-main sm:[&_h2]:text-3xl [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#f6cc9b] [&_li]:text-text-main [&_p]:mb-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
					>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html article.descriptionHtml}
					</div>
				{:else if article.legacySections}
					<!-- Legacy Sections Fallback -->
					{#each article.legacySections as sec, idx (idx)}
						<section id="section-{idx}" class="scroll-mt-28 space-y-4">
							<h2 class="font-serif text-2xl font-bold text-text-main sm:text-3xl">
								{sec.title}
							</h2>

							<div class="space-y-4 font-sans leading-relaxed text-base text-text-muted sm:text-lg">
								{#each sec.paragraphs as para, pIdx (pIdx)}
									<p>{para}</p>
								{/each}
							</div>

							{#if sec.bulletPoints && sec.bulletPoints.length > 0}
								<ul class="my-4 space-y-2.5 border border-border-subtle bg-surface/50 p-5">
									{#each sec.bulletPoints as pt, ptIdx (ptIdx)}
										<li class="flex items-start gap-3 text-sm text-text-main sm:text-base">
											<span class="font-bold text-[#ea9c5a]" aria-hidden="true">•</span>
											<span>{pt}</span>
										</li>
									{/each}
								</ul>
							{/if}

							{#if sec.callout}
								<div
									class="border border-l-4 border-border-subtle border-l-[#ea9c5a] bg-surface p-6"
								>
									<h3 class="mb-2 text-sm font-bold text-text-main sm:text-base">
										{sec.callout.title}
									</h3>
									<p class="font-sans text-sm leading-relaxed text-text-muted sm:text-base">
										{sec.callout.desc}
									</p>
								</div>
							{/if}
						</section>
					{/each}

					<!-- Key Takeaway Card -->
					{#if article.takeaway}
						<div class="mt-12 border border-[#ea9c5a]/30 bg-[#341608]/40 p-6 sm:p-8">
							<span
								class="mb-2 inline-block font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
							>
								Key takeaway
							</span>
							<h3 class="mb-3 font-serif text-xl font-bold text-text-main sm:text-2xl">
								{article.takeaway.title}
							</h3>
							<p class="font-sans leading-relaxed text-base text-text-muted">
								{article.takeaway.desc}
							</p>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</article>

<!-- Related Articles -->
{#if relatedArticles && relatedArticles.length > 0}
	<section class="border-b border-border-subtle/80 py-16 sm:py-20">
		<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
			<h2 class="mb-8 font-serif text-2xl font-bold text-text-main sm:text-3xl">Related reading</h2>

			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{#each relatedArticles as related (related.slug)}
					<a
						href="/blog/{related.slug}"
						class="group border border-border-subtle bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#ea9c5a]/40"
					>
						<div class="mb-2 text-xs font-medium text-[#ea9c5a]">
							{related.category} · {related.readTime}
						</div>
						<h3
							class="mb-2 font-serif text-lg font-bold text-text-main transition-colors group-hover:text-[#ea9c5a]"
						>
							{related.title}
						</h3>
						<p class="line-clamp-2 text-sm text-text-muted">
							{related.summary}
						</p>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Bottom CTA -->
<NextMoveCta />
