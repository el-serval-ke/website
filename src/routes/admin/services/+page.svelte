<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { getFileUrl } from '$lib/pocketbase';

	let { data, form } = $props();

	let searchInput = $state(data.search);

	function handleSearch(e: Event) {
		e.preventDefault();
		const q = searchInput ? '?q=' + encodeURIComponent(searchInput) : '';
		goto(`/admin/services${q}`);
	}

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<svelte:head><title>Services — El Serval Admin</title></svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div
		class="flex flex-col gap-4 border-b border-[#2d180a] pb-6 sm:flex-row sm:items-center sm:justify-between"
	>
		<div>
			<div class="font-mono text-xs tracking-widest text-[#ea9c5a] uppercase">
				<a href="/admin" class="hover:underline">Admin</a> / Services
			</div>
			<h1 class="mt-2 font-serif text-3xl font-bold text-[#f3ede8]">Studio Services</h1>
			<p class="font-sans text-sm text-[#a89485]">
				{data.totalItems} active service offering{data.totalItems === 1 ? '' : 's'}
			</p>
		</div>
		<a
			href="/admin/services/new"
			class="border border-[#ea9c5a] bg-[#ea9c5a] px-4 py-2 font-mono text-xs font-bold tracking-wider text-[#180e05] uppercase hover:bg-[#d88944]"
		>
			+ New Service
		</a>
	</div>

	{#if form?.error}
		<div class="border border-red-500/40 bg-red-950/40 p-3 font-mono text-xs text-red-200">
			{form.error}
		</div>
	{/if}

	<!-- Search -->
	<form onsubmit={handleSearch} class="flex gap-3">
		<input
			type="text"
			bind:value={searchInput}
			placeholder="Search services by title or slug..."
			class="flex-1 border border-[#3e2415] bg-[#170c05] px-4 py-2.5 font-mono text-xs text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
		/>
		<button
			type="submit"
			class="border border-[#3e2415] bg-[#201005] px-4 py-2.5 font-mono text-xs text-[#d1bfb3] hover:border-[#ea9c5a]"
		>
			Search
		</button>
		{#if data.search}
			<a
				href="/admin/services"
				class="border border-[#3e2415] bg-[#201005] px-4 py-2.5 font-mono text-xs text-[#a89485] hover:text-[#ea9c5a]"
			>
				Clear
			</a>
		{/if}
	</form>

	<!-- Table -->
	<div class="border border-[#2d180a] bg-[#170c05]">
		{#if data.services.length === 0}
			<div class="py-16 text-center font-mono text-xs text-[#7d695b]">
				No services configured.
				<a href="/admin/services/new" class="ml-2 text-[#ea9c5a] hover:underline"
					>Add the first one →</a
				>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm">
					<thead>
						<tr class="border-b border-[#2d180a] font-mono text-xs text-[#8e7a6c] uppercase">
							<th class="px-4 py-3">Service</th>
							<th class="px-4 py-3">Slug</th>
							<th class="px-4 py-3">Pricing</th>
							<th class="px-4 py-3">Last Updated</th>
							<th class="px-4 py-3 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-[#2d180a]">
						{#each data.services as service (service.id)}
							<tr class="transition-colors hover:bg-[#1e1006]/50">
								<td class="px-4 py-3">
									<div class="flex items-center gap-3">
										{#if service.featured_image}
											<img
												src={getFileUrl(
													{ id: service.id, collectionName: 'services' },
													service.featured_image
												)}
												alt={service.title}
												class="h-8 w-8 border border-[#3e2415] object-cover"
											/>
										{/if}
										<div>
											<a
												href={`/admin/services/${service.id}`}
												class="font-medium text-[#f3ede8] hover:text-[#ea9c5a]"
											>
												{service.title}
											</a>
										</div>
									</div>
								</td>
								<td class="px-4 py-3 font-mono text-xs text-[#ea9c5a]">
									{service.slug}
								</td>
								<td class="px-4 py-3 font-mono text-xs text-[#d1bfb3]">
									<span>{service.price_range || 'Custom'}</span>
									{#if service.price_period}
										<span class="ml-1 text-[11px] text-[#8e7a6c]">{service.price_period}</span>
									{/if}
								</td>
								<td class="px-4 py-3 font-mono text-xs text-[#8e7a6c]"
									>{formatDate(service.updated)}</td
								>
								<td class="px-4 py-3 text-right">
									<div class="flex items-center justify-end gap-2">
										<a
											href={`/admin/services/${service.id}`}
											class="border border-[#3e2415] bg-[#201005] px-2.5 py-1 font-mono text-xs text-[#d1bfb3] hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
										>
											Edit
										</a>
										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												if (!confirm(`Are you sure you want to delete service "${service.title}"?`))
													return () => {};
												return async ({ update }) => update();
											}}
										>
											<input type="hidden" name="id" value={service.id} />
											<button
												type="submit"
												class="border border-red-950 bg-red-950/20 px-2.5 py-1 font-mono text-xs text-red-400 hover:bg-red-900/40"
											>
												Delete
											</button>
										</form>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
