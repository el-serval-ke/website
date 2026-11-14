<script lang="ts">
	import NextMoveCta from '$lib/components/NextMoveCta.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let item = $derived(data.item);
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
			<div class="mb-4 flex flex-wrap items-center gap-2">
				{#if item.services && item.services.length > 0}
					{#each item.services as s (s.id || s.slug)}
						<a
							href="/services/{s.slug}"
							class="border border-[#ea9c5a]/40 bg-[#341608] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase transition-colors hover:bg-[#ea9c5a] hover:text-[#180e05]"
						>
							{s.title}
						</a>
					{/each}
				{:else}
					<span
						class="border border-[#ea9c5a]/40 bg-[#341608] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
					>
						{item.category}
					</span>
				{/if}

				{#if item.status}
					<span
						class="border border-border-subtle bg-surface px-2.5 py-1 font-mono text-xs tracking-wider text-text-dim uppercase"
					>
						Status: {item.status.replace('_', ' ')}
					</span>
				{/if}
			</div>

			<h1
				class="mb-4 font-serif text-4xl leading-[1.1] font-bold tracking-tight text-text-main sm:text-5xl lg:text-6xl"
			>
				{item.title}
			</h1>

			{#if item.tagline}
				<p class="mb-6 font-sans text-xl font-medium text-[#f6cc9b]">
					{item.tagline}
				</p>
			{/if}

			{#if item.summary}
				<p class="font-sans text-lg leading-relaxed text-text-muted">
					{item.summary}
				</p>
			{/if}

			{#if item.link}
				<div class="mt-6">
					<a
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 border border-[#ea9c5a] bg-[#ea9c5a] px-5 py-2.5 font-mono text-xs font-bold tracking-wider text-[#180e05] uppercase transition-transform hover:-translate-y-0.5"
					>
						<span>Visit live project</span>
						<span>↗</span>
					</a>
				</div>
			{/if}
		</div>

		<!-- Metadata Bar with Sharp Grid -->
		<div
			class="mt-12 grid grid-cols-2 gap-6 border border-border-subtle bg-surface/70 p-6 sm:grid-cols-4"
		>
			<div>
				<div class="font-mono text-xs font-semibold tracking-wider text-text-dim uppercase">
					Client
				</div>
				<div class="mt-1 font-sans text-sm font-medium text-text-main">
					{item.client?.name || 'Private Client'}
					{#if item.client?.company}
						<div class="text-xs text-text-dim">{item.client.company}</div>
					{/if}
				</div>
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
					Services
				</div>
				<div class="mt-1 font-sans text-sm font-medium text-text-main">
					{#if item.services && item.services.length > 0}
						{item.services.map((s) => s.title).join(', ')}
					{:else}
						{item.category}
					{/if}
				</div>
			</div>
		</div>

		<!-- Hero Image Showcase Frame with Sharp Corners -->
		{#if item.heroImage}
			<div class="mt-10 overflow-hidden border border-border-subtle bg-surface shadow-2xl">
				<div class="relative aspect-video w-full overflow-hidden bg-[#0c0e0e] sm:aspect-21/9">
					<img
						src={item.heroImage}
						alt="{item.title} project hero"
						class="h-full w-full object-cover object-top"
					/>
				</div>
			</div>
		{/if}
	</div>
</section>

<!-- Description & Case Details Section -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		{#if item.descriptionHtml}
			<!-- Rich Content from TinyMCE -->
			<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
				<div class="lg:col-span-8">
					<div class="mb-4 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase">
						Project Overview & Strategy
					</div>
					<div
						class="prose max-w-none font-sans leading-relaxed text-base text-text-muted prose-invert sm:text-lg [&_h2]:mb-4 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text-main sm:[&_h2]:text-3xl [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#f6cc9b] [&_li]:text-text-main [&_p]:mb-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
					>
						<!-- Safe SSR HTML from self-hosted TinyMCE admin -->
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html item.descriptionHtml}
					</div>
				</div>

				<!-- Sidebar / Client Testimonial -->
				<div class="space-y-8 lg:col-span-4">
					{#if item.client_testimonial}
						<div class="border border-[#ea9c5a]/30 bg-[#341608]/40 p-6 sm:p-8">
							<span
								class="mb-3 inline-block font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
							>
								Client Testimonial
							</span>
							<blockquote
								class="font-serif text-lg leading-relaxed text-text-main italic sm:text-xl [&_p]:mb-2"
							>
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html item.client_testimonial}
							</blockquote>
							{#if item.client?.name}
								<div class="mt-4 border-t border-[#ea9c5a]/20 pt-4">
									<div class="font-mono text-xs font-bold text-[#ea9c5a]">{item.client.name}</div>
									{#if item.client.company}
										<div class="text-xs text-text-dim">{item.client.company}</div>
									{/if}
								</div>
							{/if}
						</div>
					{/if}

					<!-- Tags -->
					{#if item.tags && item.tags.length > 0}
						<div class="border border-border-subtle bg-surface p-6">
							<h3
								class="mb-3 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
							>
								Technologies & Capabilities
							</h3>
							<div class="flex flex-wrap gap-2">
								{#each item.tags as tag (tag)}
									<span
										class="border border-border-subtle bg-base px-2.5 py-1 font-mono text-xs text-text-muted"
									>
										{tag}
									</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		{:else if item.challenge && item.approach && item.solution}
			<!-- Legacy Structured View Fallback -->
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

			<!-- Solution Block -->
			<div class="mt-12 max-w-3xl">
				<div class="mb-3 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase">
					The Outcome
				</div>
				<h2 class="mb-6 font-serif text-3xl font-bold text-text-main sm:text-4xl">
					{item.solution.title}
				</h2>
				<p class="font-sans text-lg leading-relaxed text-text-muted">
					{item.solution.desc}
				</p>
			</div>
		{/if}

		<!-- Screenshots Gallery -->
		{#if item.screenshots && item.screenshots.length > 0}
			<div class="mt-16 border-t border-border-subtle/80 pt-16">
				<div class="mb-8">
					<span
						class="mb-2 inline-block border border-[#ea9c5a]/40 bg-[#341608] px-3.5 py-1 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
					>
						Screenshots & Interface
					</span>
					<h2 class="font-serif text-3xl font-bold text-text-main">Visual Details</h2>
				</div>

				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
					{#each item.screenshots as shot, sIdx (sIdx)}
						<div class="overflow-hidden border border-border-subtle bg-[#0c0e0e]">
							<img
								src={shot}
								alt="{item.title} interface capture {sIdx + 1}"
								class="h-full w-full object-cover transition-transform duration-500 hover:scale-102"
								loading="lazy"
							/>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<div class="mt-12">
			<a
				href="/portfolio"
				class="inline-flex items-center gap-2 font-mono text-sm font-medium text-[#ea9c5a] hover:underline"
			>
				← Back to all projects
			</a>
		</div>
	</div>
</section>

<!-- Bottom CTA -->
<NextMoveCta />
