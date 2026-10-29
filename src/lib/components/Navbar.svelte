<script lang="ts">
	import { page } from '$app/state';
	import ServalLogo from '$lib/components/ServalLogo.svelte';

	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		isOpen = false;
		document.body.style.overflow = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			closeMenu();
		}
	}

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Services', href: '/services' },
		{ label: 'Portfolio', href: '/portfolio' },
		{ label: 'Blog', href: '/blog' }
	];

	function isActive(href: string) {
		if (href === '/') {
			return page.url.pathname === '/';
		}
		return page.url.pathname.startsWith(href);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="sticky top-0 z-40 w-full border-b border-border-subtle bg-base/95 backdrop-blur-md">
	<div class="mx-auto flex h-20 max-w-360 items-center justify-between px-4 sm:px-6 lg:px-12">
		<!-- Left: Logo & Brand -->
		<a
			href="/"
			class="group flex items-center gap-3.5 p-1 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a]"
			onclick={closeMenu}
			aria-label="El Serval KE Home"
		>
			<ServalLogo class="h-9 w-8 text-[#ea9c5a] transition-transform group-hover:scale-105" />
			<div class="flex flex-col">
				<span class="font-sans font-bold tracking-tight text-base uppercase dark:text-white/75">
					EL SERVAL KE
				</span>
				<span class="font-mono text-[10px] tracking-widest text-text-muted uppercase">
					Digital Specialist · Kenya
				</span>
			</div>
		</a>

		<!-- Center: Detached Island Navbar (Desktop) with Futuristic Sharp Edges -->
		<nav
			class="hidden items-center border border-border-subtle bg-surface p-1 shadow-inner shadow-black/40 md:flex"
			aria-label="Main Navigation"
		>
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					class="px-4 py-2 text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a] {isActive(
						item.href
					)
						? 'border-b-2 border-[#ea9c5a] bg-[#341608] text-[#ea9c5a]'
						: 'border-b-2 border-transparent text-text-muted hover:bg-surface-hover hover:text-text-main'}"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Right: CTA & Mobile Actions with Chamfered Edges -->
		<div class="flex items-center gap-3">
			<a
				href="/contact"
				class="chamfer-tr hidden items-center gap-1.5 border border-[#ea9c5a]/40 bg-[#ea9c5a] px-5 py-2.5 text-sm font-semibold tracking-tight text-[#180e05] transition-all duration-150 hover:bg-[#f0ab6b] hover:shadow-lg hover:shadow-[#ea9c5a]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a] active:translate-y-0.5 sm:inline-flex"
			>
				<span>Start a project</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-4 w-4"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>

			<a
				href="/contact"
				class="chamfer-tr inline-flex items-center bg-[#ea9c5a] px-3.5 py-1.5 text-xs font-semibold text-[#180e05] sm:hidden"
			>
				Let’s talk
			</a>

			<!-- Hamburger Toggle Button (Mobile) with Sharp Edges -->
			<button
				type="button"
				class="inline-flex h-11 w-11 items-center justify-center border border-border-subtle bg-surface text-text-main hover:border-[#ea9c5a]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a] md:hidden"
				aria-expanded={isOpen}
				aria-controls="mobile-navigation"
				aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
				onclick={toggleMenu}
			>
				{#if isOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.8"
						stroke="currentColor"
						class="h-5 w-5"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.8"
						stroke="currentColor"
						class="h-5 w-5"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>
</header>

<!-- Mobile Navigation Drawer -->
{#if isOpen}
	<div
		id="mobile-navigation"
		class="animate-in fade-in fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-base px-6 py-6 duration-200 md:hidden"
		role="dialog"
		aria-modal="true"
		aria-label="Mobile Navigation"
	>
		<!-- Header in Drawer -->
		<div>
			<div class="flex items-center justify-between border-b border-border-subtle pb-5">
				<a href="/" class="flex items-center gap-3" onclick={closeMenu}>
					<ServalLogo class="h-8 w-7 text-[#ea9c5a]" />
					<div class="flex flex-col">
						<span class="text-sm font-bold tracking-tight text-text-main uppercase">
							EL SERVAL KE
						</span>
						<span class="font-mono text-[9px] tracking-widest text-text-muted uppercase">
							Digital Specialist · Kenya
						</span>
					</div>
				</a>

				<div class="flex items-center gap-3">
					<a
						href="/contact"
						class="chamfer-tr bg-[#ea9c5a] px-3.5 py-1.5 text-xs font-semibold text-[#180e05]"
						onclick={closeMenu}
					>
						Let’s talk
					</a>
					<button
						type="button"
						class="flex h-11 w-11 items-center justify-center border border-border-subtle bg-surface text-text-main"
						aria-label="Close menu"
						onclick={closeMenu}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.8"
							stroke="currentColor"
							class="h-5 w-5"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>

			<!-- Navigation Links -->
			<nav
				class="flex flex-col divide-y divide-border-subtle/50 py-4"
				aria-label="Mobile Navigation Links"
			>
				{#each [...navItems, { label: 'Contact', href: '/contact' }] as item (item.href)}
					<a
						href={item.href}
						class="py-4 font-serif text-2xl text-text-main transition-colors hover:text-[#ea9c5a] focus:text-[#ea9c5a] focus:outline-none"
						onclick={closeMenu}
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>

		<!-- Bottom Drawer Card with Sharp Edges -->
		<div class="mt-8 flex flex-col gap-4 border-t border-border-subtle pt-6">
			<div class="border border-border-subtle bg-surface p-5">
				<h3 class="mb-1 text-sm font-semibold text-text-main">Ready to discuss your project?</h3>
				<p class="mb-4 text-xs leading-relaxed text-text-muted">
					Tell me what your business needs next. We’ll find a sensible place to start.
				</p>
				<a
					href="/contact"
					class="chamfer-tr inline-flex w-full items-center justify-center gap-2 bg-[#ea9c5a] px-4 py-3 text-sm font-semibold tracking-tight text-[#180e05] transition-colors hover:bg-[#f0ab6b]"
					onclick={closeMenu}
				>
					<span>Start a project</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-4 w-4"
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

			<div class="flex items-center justify-between font-mono text-[11px] text-text-dim">
				<span>Nairobi, Kenya · UTC+3</span>
				<span>Independent by design</span>
			</div>
		</div>
	</div>
{/if}
