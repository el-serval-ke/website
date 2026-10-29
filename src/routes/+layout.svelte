<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();
	let isAdmin = $derived(page.url.pathname.startsWith('/admin'));
</script>

<svelte:head>
	<!-- Favicon -->
	<link rel="icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />

	<!-- Meta tags -->
	<meta name="robots" content="index, follow" />
</svelte:head>

<!-- Accessibility: Skip to Main Content Link for screen readers and keyboard users -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:border focus:border-[#ea9c5a] focus:bg-base focus:px-4 focus:py-2.5 focus:font-mono focus:text-xs focus:font-semibold focus:text-[#ea9c5a] focus:shadow-2xl"
>
	Skip to main content
</a>

{#if isAdmin}
	<div class="min-h-screen bg-[#140b04] text-text-main selection:bg-[#ea9c5a] selection:text-base">
		{@render children()}
	</div>
{:else}
	<div
		class="flex min-h-screen flex-col bg-base text-text-main selection:bg-[#ea9c5a] selection:text-base"
	>
		<Navbar />
		<main id="main-content" class="grow focus:outline-none" tabindex="-1">
			{@render children()}
		</main>
		<Footer />
	</div>
{/if}
