<script lang="ts">
	interface Props {
		title?: string;
		subtitle?: string;
		buttonText?: string;
	}

	let {
		title = 'Let’s put your website to work.',
		subtitle = 'Tell me what’s holding your business back. We’ll find a sensible place to start.',
		buttonText = 'Discuss your project'
	}: Props = $props();
</script>

<section class="relative overflow-hidden border-t border-border-subtle bg-[#101312] py-20 sm:py-28">
	<div class="pointer-events-none absolute top-0 right-1/4 h-96 w-96 bg-[#ea9c5a]/5 blur-3xl"></div>

	<div class="relative z-10 mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
			<div class="max-w-2xl">
				<div class="mb-4 font-mono text-xs tracking-widest text-[#ea9c5a] uppercase">
					Start a conversation
				</div>
				<h2
					class="mb-4 font-serif text-4xl leading-[1.15] font-bold tracking-tight text-text-main sm:text-5xl"
				>
					{title}
				</h2>
				<p class="font-sans text-lg leading-relaxed text-text-muted">
					{subtitle}
				</p>
			</div>

			<div class="shrink-0 pt-2 lg:pt-0">
				<a
					href="/contact"
					class="chamfer-tr inline-flex items-center gap-2 border border-[#ea9c5a]/40 bg-[#ea9c5a] px-8 py-4 font-semibold tracking-tight text-[#180e05] transition-all duration-200 hover:bg-[#f0ab6b] hover:shadow-xl hover:shadow-[#ea9c5a]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a] active:translate-y-0.5"
				>
					<span>{buttonText}</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-5 w-5"
						aria-hidden="true"
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
