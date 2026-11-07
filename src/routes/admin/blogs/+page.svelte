<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let { data, form } = $props();

	let searchInput = $state(data.search);

	function handleSearch(e: Event) {
		e.preventDefault();
		const q = searchInput ? '?q=' + encodeURIComponent(searchInput) : '';
		goto(`/admin/blogs${q}`);
	}

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<svelte:head><title>Blog Articles — El Serval Admin</title></svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div
		class="flex flex-col gap-4 border-b border-[#2d180a] pb-6 sm:flex-row sm:items-center sm:justify-between"
	>
		<div>
			<div class="font-mono text-xs tracking-widest text-[#ea9c5a] uppercase">
				<a href="/admin" class="hover:underline">Admin</a> / Blog Articles
			</div>
			<h1 class="mt-2 font-serif text-3xl font-bold text-[#f3ede8]">Blog Articles</h1>
			<p class="font-sans text-sm text-[#a89485]">
				{data.totalItems} article{data.totalItems === 1 ? '' : 's'} total
			</p>
		</div>
		<a
			href="/admin/blogs/new"
			class="border border-[#ea9c5a] bg-[#ea9c5a] px-4 py-2 font-mono text-xs font-bold tracking-wider text-[#180e05] uppercase hover:bg-[#d88944]"
		>
			+ New Article
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
			placeholder="Search by title or slug..."
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
				href="/admin/blogs"
				class="border border-[#3e2415] bg-[#201005] px-4 py-2.5 font-mono text-xs text-[#a89485] hover:text-[#ea9c5a]"
			>
				Clear
			</a>
		{/if}
	</form>

	<!-- Table -->
	<div class="border border-[#2d180a] bg-[#170c05]">
		{#if data.blogs.length === 0}
			<div class="py-16 text-center font-mono text-xs text-[#7d695b]">
				No articles found.
				<a href="/admin/blogs/new" class="ml-2 text-[#ea9c5a] hover:underline"
					>Create the first one →</a
				>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm">
					<thead>
						<tr class="border-b border-[#2d180a] font-mono text-xs text-[#8e7a6c] uppercase">
							<th class="px-4 py-3">Title</th>
							<th class="px-4 py-3">Category</th>
							<th class="px-4 py-3">Tags</th>
							<th class="px-4 py-3">Published</th>
							<th class="px-4 py-3 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-[#2d180a]">
						{#each data.blogs as blog (blog.id)}
							<tr class="transition-colors hover:bg-[#1e1006]/50">
								<td class="px-4 py-3">
									<a
										href={`/admin/blogs/${blog.id}`}
										class="font-medium text-[#f3ede8] hover:text-[#ea9c5a]">{blog.title}</a
									>
									<div class="mt-0.5 font-mono text-[11px] text-[#7d695b]">{blog.slug}</div>
								</td>
								<td class="px-4 py-3">
									<span
										class="border border-[#3e2415] bg-[#221206] px-1.5 py-0.5 font-mono text-[11px] text-[#ea9c5a]"
									>
										{blog.category}
									</span>
								</td>
								<td class="px-4 py-3">
									<div class="flex flex-wrap gap-1">
										{#each (blog.tags || []).slice(0, 3) as tag (tag)}
											<span
												class="border border-[#2d180a] px-1.5 py-0.5 font-mono text-[10px] text-[#8e7a6c]"
												>{tag}</span
											>
										{/each}
									</div>
								</td>
								<td class="px-4 py-3 font-mono text-xs text-[#8e7a6c]"
									>{formatDate(blog.created)}</td
								>
								<td class="px-4 py-3 text-right">
									<div class="flex items-center justify-end gap-2">
										<a
											href={`/admin/blogs/${blog.id}`}
											class="border border-[#3e2415] bg-[#201005] px-2.5 py-1 font-mono text-xs text-[#d1bfb3] hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
											>Edit</a
										>
										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												if (!confirm(`Delete "${blog.title}"?`)) return () => {};
												return async ({ update }) => update();
											}}
										>
											<input type="hidden" name="id" value={blog.id} />
											<button
												type="submit"
												class="border border-red-950 bg-red-950/20 px-2.5 py-1 font-mono text-xs text-red-400 hover:bg-red-900/40"
												>Delete</button
											>
										</form>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Pagination -->
			{#if data.totalPages > 1}
				<div class="flex items-center justify-between border-t border-[#2d180a] px-4 py-3">
					<span class="font-mono text-xs text-[#8e7a6c]">
						Page {data.currentPage} of {data.totalPages}
					</span>
					<div class="flex gap-2">
						{#if data.currentPage > 1}
							<a
								href={`/admin/blogs?page=${data.currentPage - 1}${data.search ? '&q=' + data.search : ''}`}
								class="border border-[#3e2415] px-3 py-1.5 font-mono text-xs text-[#d1bfb3] hover:border-[#ea9c5a]"
								>← Prev</a
							>
						{/if}
						{#if data.currentPage < data.totalPages}
							<a
								href={`/admin/blogs?page=${data.currentPage + 1}${data.search ? '&q=' + data.search : ''}`}
								class="border border-[#3e2415] px-3 py-1.5 font-mono text-xs text-[#d1bfb3] hover:border-[#ea9c5a]"
								>Next →</a
							>
						{/if}
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>
