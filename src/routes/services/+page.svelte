<script lang="ts">
	import NextMoveCta from '$lib/components/NextMoveCta.svelte';
	import { services } from '$lib/data/services';

	const situations = [
		{
			need: 'More relevant search visibility',
			service: 'Search Engine Optimization',
			href: '/services/search-engine-optimization'
		},
		{
			need: 'Better routine care and risk awareness',
			service: 'Website Maintenance & Cybersecurity',
			href: '/services/website-maintenance'
		},
		{
			need: 'A faster, easier-to-use existing website',
			service: 'Website Optimization',
			href: '/services/website-optimization'
		},
		{
			need: 'A website that reflects how your business has grown',
			service: 'Website Revamp',
			href: '/services/website-revamp'
		},
		{
			need: 'A first website or a stronger technical foundation',
			service: 'Web Development',
			href: '/services/web-development'
		}
	];
</script>

<svelte:head>
	<title>Services — Web Development, SEO & Maintenance | El Serval KE</title>
	<meta
		name="description"
		content="Practical digital services for Kenyan businesses: SEO, web development, website revamp, performance optimization, maintenance and security."
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
					Services Directory
				</span>
			</div>
			<h1
				class="font-serif text-5xl leading-[1.08] font-bold tracking-tight text-text-main sm:text-6xl"
			>
				The right work. In the right order.
			</h1>
			<p class="mt-6 font-sans text-xl leading-relaxed text-text-muted">
				Connected digital services to help your business get found, work reliably online, and reduce
				avoidable risk. Choose a focused fix or a complete foundation.
			</p>
		</div>

		<!-- Overview Banner with Sharp Frame -->
		<div class="mt-12 border border-border-subtle bg-surface p-6 sm:p-8">
			<div class="max-w-3xl">
				<h3 class="mb-2 font-serif text-xl font-bold text-text-main">
					Not every website needs a complete rebuild.
				</h3>
				<p class="font-sans text-sm leading-relaxed text-text-muted sm:text-base">
					First, we identify the exact bottleneck holding you back. Then we invest in the work most
					likely to make your website useful to your customers and manageable for you.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Service Directory Section with Sharp Cards -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="space-y-10">
			{#each services as svc (svc.slug)}
				<div
					id={svc.slug}
					class="group border border-border-subtle bg-surface p-6 transition-all duration-200 hover:border-[#ea9c5a]/40 sm:p-8 lg:p-10"
				>
					<div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
						<!-- Service Left Info -->
						<div class="flex h-full flex-col justify-between lg:col-span-7">
							<div>
								<div class="mb-4 flex items-center gap-4">
									<span class="font-mono text-sm font-bold text-[#ea9c5a]">{svc.index}</span>
									<h2 class="font-serif text-2xl font-bold text-text-main sm:text-3xl">
										{svc.title}
									</h2>
								</div>
								<p class="mb-3 font-sans font-medium text-base text-text-main sm:text-lg">
									{svc.summary}
								</p>
								<p class="mb-8 font-sans text-sm leading-relaxed text-text-muted">
									{svc.audience}
								</p>
							</div>

							<div>
								<a
									href="/services/{svc.slug}"
									class="chamfer-tr inline-flex items-center gap-2 border border-[#ea9c5a]/40 bg-[#ea9c5a] px-6 py-3.5 text-sm font-semibold tracking-tight text-[#180e05] transition-all hover:bg-[#f0ab6b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a]"
								>
									<span>Explore {svc.title}</span>
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

						<!-- Service Right Scope & Price Box with Sharp Edges -->
						<div class="border border-border-subtle bg-[#1a1e1d] p-6 lg:col-span-5">
							<div
								class="mb-3 font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
							>
								Core Deliverables
							</div>
							<ul class="mb-6 space-y-2.5">
								{#each svc.scope as sc, i (i)}
									<li class="flex items-start gap-2 text-sm text-text-muted">
										<span class="font-bold text-[#ea9c5a]">✓</span>
										<span>{sc}</span>
									</li>
								{/each}
							</ul>

							<div class="border-t border-border-subtle/80 pt-4">
								<div class="font-mono text-xl font-bold text-text-main sm:text-2xl">
									{svc.priceRange}
									<span class="font-mono text-xs font-normal text-text-muted"
										>{svc.pricePeriod}</span
									>
								</div>
								<div class="mt-1 font-mono text-xs text-text-dim">
									Scope confirmed upon project review
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Choose Your Starting Point Section with Sharp List -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="mb-10 max-w-2xl">
			<h2 class="font-serif text-3xl font-bold text-text-main sm:text-4xl">
				What sounds most like your situation?
			</h2>
			<p class="mt-3 text-base text-text-muted">
				You do not need to diagnose the technical cause. Choose what matches your current priority
				to start the conversation.
			</p>
		</div>

		<div class="divide-y divide-border-subtle border border-border-subtle bg-surface">
			{#each situations as sit (sit.need)}
				<a
					href={sit.href}
					class="group flex flex-col justify-between gap-3 p-5 transition-colors hover:bg-surface-hover sm:flex-row sm:items-center sm:px-6"
				>
					<span class="font-medium text-text-main group-hover:text-[#ea9c5a]">
						{sit.need}
					</span>
					<span
						class="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#ea9c5a]"
					>
						{sit.service} →
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Bottom CTA -->
<NextMoveCta />
