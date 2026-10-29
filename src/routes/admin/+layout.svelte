<script lang="ts">
	import { page } from '$app/state';

	let { data, children } = $props();

	let isLoginPage = $derived(page.url.pathname === '/admin/login');
	let mobileMenuOpen = $state(false);

	const navItems = [
		{
			name: 'Dashboard',
			href: '/admin',
			icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
		},
		{
			name: 'Blog Articles',
			href: '/admin/blogs',
			icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
		},
		{
			name: 'Categories',
			href: '/admin/categories',
			icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
		},
		{
			name: 'Portfolio Items',
			href: '/admin/portfolio',
			icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
		},
		{
			name: 'Services',
			href: '/admin/services',
			icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		}
	];

	function isActive(href: string): boolean {
		if (href === '/admin') {
			return page.url.pathname === '/admin';
		}
		return page.url.pathname.startsWith(href);
	}
</script>

{#if isLoginPage}
	{@render children()}
{:else}
	<div class="flex min-h-screen bg-[#110903] text-[#e8ded5]">
		<!-- Desktop Sidebar -->
		<aside
			class="hidden w-64 flex-col justify-between border-r border-[#2d180a] bg-[#160c04] lg:flex"
		>
			<div>
				<!-- Logo & Header -->
				<div class="border-b border-[#2d180a] p-6">
					<div class="flex items-center gap-2">
						<span class="inline-block h-3 w-3 bg-[#ea9c5a]"></span>
						<span class="font-mono text-sm font-bold tracking-widest text-[#ea9c5a] uppercase">
							El Serval
						</span>
					</div>
					<div class="mt-1 font-mono text-[11px] tracking-wider text-[#8e7a6c] uppercase">
						Admin Control Panel
					</div>
				</div>

				<!-- Navigation -->
				<nav class="space-y-1 p-4" aria-label="Admin Navigation">
					{#each navItems as item}
						{@const active = isActive(item.href)}
						<a
							href={item.href}
							class="flex items-center gap-3 px-3 py-2.5 font-mono text-xs tracking-wider uppercase transition-colors {active
								? 'border-l-2 border-[#ea9c5a] bg-[#291307] font-semibold text-[#ea9c5a]'
								: 'text-[#a89485] hover:bg-[#201005] hover:text-[#f3ede8]'}"
						>
							<svg
								class="h-4 w-4 shrink-0 {active ? 'text-[#ea9c5a]' : 'text-[#7d695b]'}"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="1.75"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
							</svg>
							<span>{item.name}</span>
						</a>
					{/each}
				</nav>
			</div>

			<!-- Footer / User & Live site links -->
			<div class="space-y-3 border-t border-[#2d180a] p-4">
				<a
					href="/"
					target="_blank"
					class="flex items-center justify-between border border-[#3e2415] bg-[#1a0f07] px-3 py-2 font-mono text-xs text-[#d1bfb3] transition-colors hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
				>
					<span>View Public Site</span>
					<span class="font-sans text-xs">↗</span>
				</a>

				<div class="flex items-center justify-between pt-2">
					<div class="truncate pr-2">
						<div class="font-mono text-[10px] text-[#7d695b] uppercase">Superuser</div>
						<div class="truncate font-mono text-xs text-[#d1bfb3]">
							{data.user?.email || 'admin@elserval.com'}
						</div>
					</div>
					<form method="POST" action="/admin/logout">
						<button
							type="submit"
							class="border border-[#442717] bg-[#221206] px-2.5 py-1.5 font-mono text-[11px] text-[#ea9c5a] uppercase transition-colors hover:bg-[#ea9c5a] hover:text-[#180e05]"
							title="Sign out of control room"
						>
							Exit
						</button>
					</form>
				</div>
			</div>
		</aside>

		<!-- Mobile Header -->
		<div class="flex flex-1 flex-col overflow-hidden">
			<header
				class="flex h-16 items-center justify-between border-b border-[#2d180a] bg-[#160c04] px-4 lg:hidden"
			>
				<div class="flex items-center gap-2">
					<span class="inline-block h-2.5 w-2.5 bg-[#ea9c5a]"></span>
					<span class="font-mono text-xs font-bold tracking-widest text-[#ea9c5a] uppercase">
						El Serval Admin
					</span>
				</div>

				<button
					type="button"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="border border-[#3e2415] bg-[#201005] p-2 text-[#ea9c5a] focus:outline-none"
					aria-label="Toggle Navigation Menu"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
						/>
					</svg>
				</button>
			</header>

			<!-- Mobile Drawer -->
			{#if mobileMenuOpen}
				<div
					class="border-b border-[#2d180a] bg-[#160c04] p-4 lg:hidden"
					role="dialog"
					aria-label="Mobile Navigation"
				>
					<nav class="space-y-1">
						{#each navItems as item}
							{@const active = isActive(item.href)}
							<a
								href={item.href}
								onclick={() => (mobileMenuOpen = false)}
								class="flex items-center gap-3 px-3 py-2.5 font-mono text-xs tracking-wider uppercase transition-colors {active
									? 'border-l-2 border-[#ea9c5a] bg-[#291307] font-semibold text-[#ea9c5a]'
									: 'text-[#a89485] hover:bg-[#201005] hover:text-[#f3ede8]'}"
							>
								<svg
									class="h-4 w-4 shrink-0 {active ? 'text-[#ea9c5a]' : 'text-[#7d695b]'}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.75"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
								</svg>
								<span>{item.name}</span>
							</a>
						{/each}
						<div class="pt-3">
							<a
								href="/"
								target="_blank"
								class="flex items-center justify-between border border-[#3e2415] bg-[#1a0f07] px-3 py-2 font-mono text-xs text-[#d1bfb3]"
							>
								<span>View Public Site</span>
								<span class="font-sans text-xs">↗</span>
							</a>
						</div>
					</nav>
				</div>
			{/if}

			<!-- Main Content Viewport -->
			<main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
				<div class="mx-auto max-w-6xl">
					{@render children()}
				</div>
			</main>
		</div>
	</div>
{/if}
