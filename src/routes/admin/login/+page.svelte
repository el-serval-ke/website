<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Admin Sign In — El Serval Studio</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md">
		<!-- Brand Header -->
		<div class="mb-8 text-center">
			<span
				class="inline-block border border-[#ea9c5a]/40 bg-[#291307] px-3 py-1 font-mono text-xs tracking-widest text-[#ea9c5a] uppercase"
			>
				El Serval Management
			</span>
			<h1 class="mt-4 font-serif text-3xl font-bold tracking-tight text-[#f3ede8] sm:text-4xl">
				Control Room
			</h1>
			<p class="mt-2 font-sans text-sm text-[#a89485]">
				Fast, secure administration for content, services & portfolio.
			</p>
		</div>

		<!-- Login Card -->
		<div class="border border-[#382012] bg-[#1a0f07] p-8 shadow-2xl">
			{#if form?.error}
				<div
					class="mb-6 border border-red-500/40 bg-red-950/40 p-4 font-mono text-xs text-red-200"
					role="alert"
				>
					<span class="font-bold text-red-400">Authentication Failed:</span>
					{form.error}
				</div>
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						await update();
					};
				}}
				class="space-y-6"
			>
				<div>
					<label
						for="email"
						class="block font-mono text-xs font-semibold tracking-wider text-[#d1bfb3] uppercase"
					>
						Admin Email Address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						autocomplete="email"
						placeholder="admin@elserval.com"
						class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-3 font-mono text-sm text-[#f3ede8] placeholder-[#6e5849] transition-colors focus:border-[#ea9c5a] focus:ring-1 focus:ring-[#ea9c5a] focus:outline-none"
					/>
				</div>

				<div>
					<label
						for="password"
						class="block font-mono text-xs font-semibold tracking-wider text-[#d1bfb3] uppercase"
					>
						Master Key / Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						autocomplete="current-password"
						placeholder="••••••••••••"
						class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-3 font-mono text-sm text-[#f3ede8] placeholder-[#6e5849] transition-colors focus:border-[#ea9c5a] focus:ring-1 focus:ring-[#ea9c5a] focus:outline-none"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="flex w-full items-center justify-center border border-[#ea9c5a] bg-[#ea9c5a] px-6 py-3 font-mono text-xs font-bold tracking-widest text-[#180e05] uppercase transition-all hover:bg-[#d88944] focus:ring-2 focus:ring-[#ea9c5a] focus:ring-offset-2 focus:ring-offset-[#1a0f07] focus:outline-none disabled:opacity-50"
				>
					{#if loading}
						<span class="mr-2 inline-block animate-pulse">●</span> Authenticating...
					{:else}
						Access Dashboard
					{/if}
				</button>
			</form>

			<div class="mt-8 border-t border-[#311b0e] pt-6 text-center font-mono text-xs text-[#826f62]">
				Default Superuser: <span class="text-[#d1bfb3]">admin@elserval.com</span>
			</div>
		</div>

		<!-- Back link -->
		<div class="mt-6 text-center">
			<a href="/" class="font-mono text-xs text-[#a89485] transition-colors hover:text-[#ea9c5a]">
				← Back to El Serval public site
			</a>
		</div>
	</div>
</div>
