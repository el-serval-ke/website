<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { getFileUrl } from '$lib/pocketbase';

	let { data, form } = $props();

	let searchInput = $state(data.search);

	function handleSearch(e: Event) {
		e.preventDefault();
		const q = searchInput ? '?q=' + encodeURIComponent(searchInput) : '';
		goto(`/admin/portfolio${q}`);
	}

	function formatDate(d: string) {
		if (!d) return '';
		return new Date(d).toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	}

	function statusBadge(status: string) {
		switch (status) {
			case 'concluded':
				return 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300';
			case 'concluding':
				return 'border-amber-500/40 bg-amber-950/40 text-amber-300';
			case 'ongoing':
				return 'border-[#ea9c5a]/40 bg-[#341608] text-[#ea9c5a]';
			default:
				return 'border-blue-500/40 bg-blue-950/40 text-blue-300';
		}
	}
</script>

<svelte:head><title>Portfolio Items — El Serval Admin</title></svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div
		class="flex flex-col gap-4 border-b border-[#2d180a] pb-6 sm:flex-row sm:items-center sm:justify-between"
	>
		<div>
			<div class="font-mono text-xs tracking-widest text-[#ea9c5a] uppercase">
				<a href="/admin" class="hover:underline">Admin</a> / Portfolio
			</div>
			<h1 class="mt-2 font-serif text-3xl font-bold text-[#f3ede8]">Portfolio Case Studies</h1>
			<p class="font-sans text-sm text-[#a89485]">
				{data.totalItems} project{data.totalItems === 1 ? '' : 's'} recorded
			</p>
		</div>
		<a
			href="/admin/portfolio/new"
			class="border border-[#ea9c5a] bg-[#ea9c5a] px-4 py-2 font-mono text-xs font-bold tracking-wider text-[#180e05] uppercase hover:bg-[#d88944]"
		>
			+ New Portfolio Item
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
			placeholder="Search projects by title or slug..."
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
				href="/admin/portfolio"
				class="border border-[#3e2415] bg-[#201005] px-4 py-2.5 font-mono text-xs text-[#a89485] hover:text-[#ea9c5a]"
			>
				Clear
			</a>
		{/if}
	</form>

	<!-- Table -->
	<div class="border border-[#2d180a] bg-[#170c05]">
		{#if data.portfolioItems.length === 0}
			<div class="py-16 text-center font-mono text-xs text-[#7d695b]">
				No portfolio items found.
				<a href="/admin/portfolio/new" class="ml-2 text-[#ea9c5a] hover:underline"
					>Add the first project →</a
				>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm">
					<thead>
						<tr class="border-b border-[#2d180a] font-mono text-xs text-[#8e7a6c] uppercase">
							<th class="px-4 py-3">Project / Client</th>
							<th class="px-4 py-3">Service Categories (FK)</th>
							<th class="px-4 py-3">Status</th>
							<th class="px-4 py-3">Timeline</th>
							<th class="px-4 py-3 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-[#2d180a]">
						{#each data.portfolioItems as item (item.id)}
							<tr class="transition-colors hover:bg-[#1e1006]/50">
								<td class="px-4 py-3">
									<div class="flex items-center gap-3">
										{#if item.featured_image}
											<img
												src={getFileUrl(
													{ id: item.id, collectionName: 'portfolio_items' },
													item.featured_image
												)}
												alt={item.title}
												class="h-9 w-9 border border-[#3e2415] object-cover"
											/>
										{/if}
										<div>
											<a
												href={`/admin/portfolio/${item.id}`}
												class="font-medium text-[#f3ede8] hover:text-[#ea9c5a]"
											>
												{item.title}
											</a>
											<div class="font-mono text-[11px] text-[#8e7a6c]">
												{item.clientCompany}
											</div>
										</div>
									</div>
								</td>
								<td class="px-4 py-3">
									<div class="flex max-w-xs flex-wrap gap-1.5">
										{#if item.services.length === 0}
											<span class="font-mono text-[11px] text-[#7d695b]">No services linked</span>
										{:else}
											{#each item.services as svc (svc)}
												<span
													class="border border-[#3e2415] bg-[#221206] px-1.5 py-0.5 font-mono text-[10px] text-[#ea9c5a]"
												>
													{svc}
												</span>
											{/each}
										{/if}
									</div>
								</td>
								<td class="px-4 py-3">
									<span
										class="border px-2 py-0.5 font-mono text-[11px] tracking-wider uppercase {statusBadge(
											item.status
										)}"
									>
										{item.status.replace('_', ' ')}
									</span>
								</td>
								<td class="px-4 py-3 font-mono text-xs text-[#8e7a6c]">
									{#if item.start_date || item.end_date}
										{formatDate(item.start_date)} - {formatDate(item.end_date) || 'Present'}
									{:else}
										<span class="text-[#5a483c]">—</span>
									{/if}
								</td>
								<td class="px-4 py-3 text-right">
									<div class="flex items-center justify-end gap-2">
										<a
											href={`/admin/portfolio/${item.id}`}
											class="border border-[#3e2415] bg-[#201005] px-2.5 py-1 font-mono text-xs text-[#d1bfb3] hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
										>
											Edit
										</a>
										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												if (
													!confirm(
														`Are you sure you want to delete portfolio item "${item.title}"?`
													)
												)
													return () => {};
												return async ({ update }) => update();
											}}
										>
											<input type="hidden" name="id" value={item.id} />
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
