<script lang="ts">
	import NextMoveCta from '$lib/components/NextMoveCta.svelte';

	const engagementSteps = [
		{
			id: '01',
			title: 'Understand',
			desc: 'A conversation about your business, your customers and what is getting in the way.'
		},
		{
			id: '02',
			title: 'Map the work',
			desc: 'A clear scope, priorities, indicative timing and a quote to approve before work starts.'
		},
		{
			id: '03',
			title: 'Build & check',
			desc: 'Focused implementation with visible checkpoints and testing against the agreed scope.'
		},
		{
			id: '04',
			title: 'Hand over well',
			desc: 'A practical walkthrough, useful documentation and a plan for ongoing care if you need it.'
		}
	];
</script>

<svelte:head>
	<title>About Us — Independent Mind, Deliberate Craft | El Serval KE</title>
	<meta
		name="description"
		content="I help small and medium-sized businesses in Kenya make better use of the web with clear thinking, practical execution and one accountable specialist."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="max-w-3xl">
			<span
				class="mb-3 inline-block border border-[#ea9c5a]/30 bg-[#341608] px-3 py-1 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase"
			>
				About El Serval
			</span>
			<h1
				class="font-serif text-5xl leading-[1.08] font-bold tracking-tight text-text-main sm:text-6xl"
			>
				Independent mind. Deliberate craft.
			</h1>
			<p class="mt-6 font-sans text-xl leading-relaxed text-text-muted sm:text-2xl">
				I help small and medium-sized businesses in Kenya make better use of the web — with clear
				thinking, practical execution and one person accountable for the work.
			</p>
		</div>
	</div>
</section>

<!-- Section 01: Why El Serval? -->
<section class="border-b border-border-subtle/80 py-20 sm:py-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
			<!-- Image Column -->
			<div class="lg:col-span-5">
				<div class="relative aspect-square overflow-hidden border border-border-subtle bg-surface">
					<img
						src="/images/serval-portrait.png"
						alt="The Serval: attentive and deliberate"
						class="h-full w-full object-cover"
					/>
				</div>
			</div>

			<!-- Text Column -->
			<div class="lg:col-span-7">
				<span
					class="mb-3 inline-block border border-[#ea9c5a]/30 bg-[#341608] px-3 py-1 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase"
				>
					Our Philosophy
				</span>
				<h2 class="mb-6 font-serif text-3xl leading-tight font-bold text-text-main sm:text-4xl">
					Attentive by nature. <br />
					Independent by choice.
				</h2>
				<p class="mb-4 font-sans leading-relaxed text-text-muted sm:text-lg">
					The serval is a lone, observant hunter. That image speaks to the kind of practice I want
					El Serval KE to be: focused, self-directed, and alert to the details other people miss.
				</p>
				<p class="mb-4 font-sans leading-relaxed text-text-muted sm:text-lg">
					There is no agency hand-off or bureaucratic runaround. You speak directly with the person
					understanding the brief, doing the engineering, and explaining the decisions.
				</p>
				<div class="pt-4">
					<a
						href="/contact"
						class="chamfer-tr inline-flex items-center gap-2 border border-[#ea9c5a]/40 bg-[#ea9c5a] px-7 py-3.5 text-sm font-semibold tracking-tight text-[#180e05] transition-all hover:bg-[#f0ab6b]"
					>
						<span>Start a conversation</span>
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
	</div>
</section>

<!-- Section 02: Built Around Your Reality -->
<section class="border-b border-border-subtle/80 py-20 sm:py-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
			<div class="lg:col-span-5">
				<span
					class="mb-3 inline-block border border-[#ea9c5a]/30 bg-[#341608] px-3 py-1 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase"
				>
					Built For Kenya
				</span>
				<h2 class="mb-4 font-serif text-3xl leading-tight font-bold text-text-main sm:text-4xl">
					Small business does not mean small ambition.
				</h2>
				<p class="leading-relaxed text-text-muted sm:text-lg">
					You may be running a retail shop, a professional firm, or a growing studio. Your website
					needs to support your operations, not become a technical burden.
				</p>
			</div>

			<div class="flex flex-col divide-y divide-border-subtle lg:col-span-7">
				<div class="pb-8">
					<h3 class="mb-2 font-serif text-xl font-bold text-text-main">
						Clarity before complexity
					</h3>
					<p class="leading-relaxed text-text-muted">
						I start with the customer journey and your commercial goal. New tools only earn a place
						when they solve an actual problem.
					</p>
				</div>

				<div class="py-8">
					<h3 class="mb-2 font-serif text-xl font-bold text-text-main">
						Practical for Kenyan networks
					</h3>
					<p class="leading-relaxed text-text-muted">
						Mobile usability, realistic content workflows and lightweight page weight matter. The
						website must work reliably on the devices and networks your customers actually use.
					</p>
				</div>

				<div class="pt-8">
					<h3 class="mb-2 font-serif text-xl font-bold text-text-main">A joined-up approach</h3>
					<p class="leading-relaxed text-text-muted">
						Being discoverable is useless if the site takes 10 seconds to load or contact forms
						fail. Search, performance and security must work together.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Section 03: Working Principles -->
<section class="border-b border-border-subtle/80 py-20 sm:py-28">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="mb-12 max-w-2xl">
			<span
				class="mb-3 inline-block border border-[#ea9c5a]/30 bg-[#341608] px-3 py-1 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase"
			>
				Standards
			</span>
			<h2 class="font-serif text-3xl font-bold text-text-main sm:text-4xl">
				Good work has a few non-negotiables.
			</h2>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="border border-border-subtle bg-surface p-7">
				<span class="mb-3 block font-mono text-sm font-bold text-[#ea9c5a]">01</span>
				<h3 class="mb-2 font-serif text-xl font-bold text-text-main">Honest expectations</h3>
				<p class="text-sm leading-relaxed text-text-muted">
					No fabricated ranking promises or overnight silver bullets. We define what can
					realistically be achieved and what depends on external factors.
				</p>
			</div>

			<div class="border border-border-subtle bg-surface p-7">
				<span class="mb-3 block font-mono text-sm font-bold text-[#ea9c5a]">02</span>
				<h3 class="mb-2 font-serif text-xl font-bold text-text-main">Visible decisions</h3>
				<p class="text-sm leading-relaxed text-text-muted">
					A transparent scope, agreed checkpoints and an articulate reason behind every technical
					choice.
				</p>
			</div>

			<div class="border border-border-subtle bg-surface p-7">
				<span class="mb-3 block font-mono text-sm font-bold text-[#ea9c5a]">03</span>
				<h3 class="mb-2 font-serif text-xl font-bold text-text-main">Complete ownership</h3>
				<p class="text-sm leading-relaxed text-text-muted">
					You own all code, domain settings and credentials with zero vendor lock-in. Full handover
					training is always part of the work.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Bottom CTA -->
<NextMoveCta />
