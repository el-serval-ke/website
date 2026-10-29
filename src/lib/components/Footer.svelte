<script lang="ts">
	import ServalLogo from '$lib/components/ServalLogo.svelte';
</script>

<footer class="border-t border-border-subtle bg-[#0c0e0e] py-16 text-sm">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<!-- Main Footer Content -->
		<div class="grid grid-cols-1 gap-12 border-b border-border-subtle/60 pb-14 md:grid-cols-12">
			<!-- Brand Column -->
			<div class="flex flex-col justify-between md:col-span-6 lg:col-span-7">
				<div>
					<a href="/" class="group mb-6 inline-flex items-center gap-3">
						<ServalLogo class="h-9 w-8 text-[#ea9c5a] transition-transform group-hover:scale-105" />
						<div class="flex flex-col">
							<span class="font-sans font-bold tracking-tight text-text-main uppercase">
								EL SERVAL KE
							</span>
							<span class="text-xs text-text-muted"> Digital Specialist · Kenya </span>
						</div>
					</a>
					<p class="mb-6 max-w-sm font-sans leading-relaxed text-text-muted">
						Independent digital services for Kenyan small and medium-sized businesses.
					</p>
				</div>
				<div class="text-xs text-text-dim">Nairobi, Kenya · East Africa Time (UTC+3)</div>
			</div>

			<!-- Links Columns -->
			<div class="grid grid-cols-2 gap-8 md:col-span-6 lg:col-span-5">
				<!-- Navigation Column -->
				<div>
					<div class="mb-4 text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase">
						Explore
					</div>
					<ul class="space-y-3">
						<li>
							<a href="/" class="text-text-muted transition-colors hover:text-text-main">Home</a>
						</li>
						<li>
							<a href="/about" class="text-text-muted transition-colors hover:text-text-main"
								>About</a
							>
						</li>
						<li>
							<a href="/services" class="text-text-muted transition-colors hover:text-text-main"
								>Services</a
							>
						</li>
						<li>
							<a href="/portfolio" class="text-text-muted transition-colors hover:text-text-main"
								>Portfolio</a
							>
						</li>
					</ul>
				</div>

				<!-- Resources Column -->
				<div>
					<div class="mb-4 text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase">
						Resources
					</div>
					<ul class="space-y-3">
						<li>
							<a href="/blog" class="text-text-muted transition-colors hover:text-text-main">Blog</a
							>
						</li>
						<li>
							<a
								href="/blog/category/seo"
								class="text-text-muted transition-colors hover:text-text-main">SEO Articles</a
							>
						</li>
						<li>
							<a href="/contact" class="text-text-muted transition-colors hover:text-text-main"
								>Contact</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div
			class="flex flex-col items-start justify-between gap-4 pt-8 text-xs text-text-dim sm:flex-row sm:items-center"
		>
			<div>© 2026 El Serval KE. Independent by design.</div>
			<div>Search Visibility · Performance · Security</div>
		</div>
	</div>
</footer>
