<script lang="ts">
	let { data } = $props();

	function formatDate(dateStr: string) {
		if (!dateStr) return '';
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
	}

	function statusColor(status: string) {
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

<svelte:head>
	<title>Admin Dashboard — El Serval</title>
</svelte:head>

<div class="space-y-8">
	<!-- Page Header -->
	<div
		class="flex flex-col gap-4 border-b border-[#2d180a] pb-6 sm:flex-row sm:items-center sm:justify-between"
	>
		<div>
			<div class="flex items-center gap-2">
				<span class="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
				<span class="font-mono text-xs tracking-widest text-emerald-400 uppercase">
					PocketBase Active
				</span>
			</div>
			<h1 class="mt-2 font-serif text-3xl font-bold tracking-tight text-[#f3ede8]">
				Content Overview
			</h1>
			<p class="font-sans text-sm text-[#a89485]">
				Manage blog publications, portfolio case studies, and studio service tiers.
			</p>
		</div>

		<!-- Quick Actions Bar -->
		<div class="flex flex-wrap items-center gap-2">
			<a
				href="/admin/blogs/new"
				class="border border-[#ea9c5a] bg-[#ea9c5a] px-4 py-2 font-mono text-xs font-bold tracking-wider text-[#180e05] uppercase transition-colors hover:bg-[#d88944]"
			>
				+ New Blog
			</a>
			<a
				href="/admin/portfolio/new"
				class="border border-[#3e2415] bg-[#221206] px-4 py-2 font-mono text-xs font-semibold tracking-wider text-[#f3ede8] uppercase transition-colors hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
			>
				+ New Portfolio
			</a>
			<a
				href="/admin/services/new"
				class="border border-[#3e2415] bg-[#221206] px-4 py-2 font-mono text-xs font-semibold tracking-wider text-[#f3ede8] uppercase transition-colors hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
			>
				+ New Service
			</a>
		</div>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<a
			href="/admin/blogs"
			class="group border border-[#2d180a] bg-[#170c05] p-6 transition-all hover:border-[#ea9c5a]/60 hover:bg-[#1f1006]"
		>
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs tracking-wider text-[#a89485] uppercase">Blog Articles</span>
				<span
					class="font-mono text-xs text-[#ea9c5a] opacity-0 transition-opacity group-hover:opacity-100"
					>Manage →</span
				>
			</div>
			<div class="mt-3 font-serif text-4xl font-bold text-[#f3ede8]">
				{data.stats.blogsCount.toString().padStart(2, '0')}
			</div>
			<div class="mt-2 font-mono text-[11px] text-[#7d695b]">
				Across {data.stats.categoriesCount} categories
			</div>
		</a>

		<a
			href="/admin/categories"
			class="group border border-[#2d180a] bg-[#170c05] p-6 transition-all hover:border-[#ea9c5a]/60 hover:bg-[#1f1006]"
		>
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs tracking-wider text-[#a89485] uppercase"
					>Blog Categories</span
				>
				<span
					class="font-mono text-xs text-[#ea9c5a] opacity-0 transition-opacity group-hover:opacity-100"
					>Manage →</span
				>
			</div>
			<div class="mt-3 font-serif text-4xl font-bold text-[#f3ede8]">
				{data.stats.categoriesCount.toString().padStart(2, '0')}
			</div>
			<div class="mt-2 font-mono text-[11px] text-[#7d695b]">Taxonomy & topic hubs</div>
		</a>

		<a
			href="/admin/portfolio"
			class="group border border-[#2d180a] bg-[#170c05] p-6 transition-all hover:border-[#ea9c5a]/60 hover:bg-[#1f1006]"
		>
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs tracking-wider text-[#a89485] uppercase"
					>Portfolio Items</span
				>
				<span
					class="font-mono text-xs text-[#ea9c5a] opacity-0 transition-opacity group-hover:opacity-100"
					>Manage →</span
				>
			</div>
			<div class="mt-3 font-serif text-4xl font-bold text-[#f3ede8]">
				{data.stats.portfolioCount.toString().padStart(2, '0')}
			</div>
			<div class="mt-2 font-mono text-[11px] text-[#7d695b]">Case studies & client work</div>
		</a>

		<a
			href="/admin/services"
			class="group border border-[#2d180a] bg-[#170c05] p-6 transition-all hover:border-[#ea9c5a]/60 hover:bg-[#1f1006]"
		>
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs tracking-wider text-[#a89485] uppercase"
					>Active Services</span
				>
				<span
					class="font-mono text-xs text-[#ea9c5a] opacity-0 transition-opacity group-hover:opacity-100"
					>Manage →</span
				>
			</div>
			<div class="mt-3 font-serif text-4xl font-bold text-[#f3ede8]">
				{data.stats.servicesCount.toString().padStart(2, '0')}
			</div>
			<div class="mt-2 font-mono text-[11px] text-[#7d695b]">Pricing tiers & deliverables</div>
		</a>
	</div>

	<!-- Two Column Section: Recent Blogs & Recent Portfolio -->
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<!-- Recent Blogs -->
		<div class="border border-[#2d180a] bg-[#170c05] p-6">
			<div class="flex items-center justify-between border-b border-[#2d180a] pb-4">
				<div>
					<h2 class="font-serif text-xl font-bold text-[#f3ede8]">Recent Blog Posts</h2>
					<p class="font-mono text-xs text-[#8e7a6c]">Latest published articles</p>
				</div>
				<a href="/admin/blogs" class="font-mono text-xs text-[#ea9c5a] hover:underline">
					View all ({data.stats.blogsCount}) →
				</a>
			</div>

			<div class="mt-4 divide-y divide-[#2d180a]">
				{#if data.recentBlogs.length === 0}
					<div class="py-8 text-center font-mono text-xs text-[#7d695b]">
						No blog posts yet. Click "+ New Blog" to create one.
					</div>
				{:else}
					{#each data.recentBlogs as blog}
						<div class="flex items-center justify-between py-3.5">
							<div class="min-w-0 pr-4">
								<a
									href={`/admin/blogs/${blog.id}`}
									class="block truncate text-sm font-medium text-[#f3ede8] transition-colors hover:text-[#ea9c5a]"
								>
									{blog.title}
								</a>
								<div class="mt-1 flex items-center gap-2 font-mono text-[11px] text-[#8e7a6c]">
									<span class="border border-[#3e2415] bg-[#221206] px-1.5 py-0.5 text-[#ea9c5a]">
										{blog.category}
									</span>
									<span>•</span>
									<span>{formatDate(blog.created)}</span>
								</div>
							</div>
							<a
								href={`/admin/blogs/${blog.id}`}
								class="shrink-0 border border-[#3e2415] bg-[#201005] px-2.5 py-1 font-mono text-[11px] text-[#d1bfb3] hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
							>
								Edit
							</a>
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Recent Portfolio Items -->
		<div class="border border-[#2d180a] bg-[#170c05] p-6">
			<div class="flex items-center justify-between border-b border-[#2d180a] pb-4">
				<div>
					<h2 class="font-serif text-xl font-bold text-[#f3ede8]">Portfolio Items</h2>
					<p class="font-mono text-xs text-[#8e7a6c]">Client projects & statuses</p>
				</div>
				<a href="/admin/portfolio" class="font-mono text-xs text-[#ea9c5a] hover:underline">
					View all ({data.stats.portfolioCount}) →
				</a>
			</div>

			<div class="mt-4 divide-y divide-[#2d180a]">
				{#if data.recentPortfolio.length === 0}
					<div class="py-8 text-center font-mono text-xs text-[#7d695b]">
						No portfolio items yet. Click "+ New Portfolio" to add one.
					</div>
				{:else}
					{#each data.recentPortfolio as item}
						<div class="flex items-center justify-between py-3.5">
							<div class="min-w-0 pr-4">
								<a
									href={`/admin/portfolio/${item.id}`}
									class="block truncate text-sm font-medium text-[#f3ede8] transition-colors hover:text-[#ea9c5a]"
								>
									{item.title}
								</a>
								<div class="mt-1 flex items-center gap-2 font-mono text-[11px]">
									<span class="text-[#8e7a6c]">{item.clientName}</span>
									<span>•</span>
									<span
										class="border px-1.5 py-0.5 text-[10px] tracking-wider uppercase {statusColor(
											item.status
										)}"
									>
										{item.status.replace('_', ' ')}
									</span>
								</div>
							</div>
							<a
								href={`/admin/portfolio/${item.id}`}
								class="shrink-0 border border-[#3e2415] bg-[#201005] px-2.5 py-1 font-mono text-[11px] text-[#d1bfb3] hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
							>
								Edit
							</a>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>

	<!-- Services List Table -->
	<div class="border border-[#2d180a] bg-[#170c05] p-6">
		<div class="flex items-center justify-between border-b border-[#2d180a] pb-4">
			<div>
				<h2 class="font-serif text-xl font-bold text-[#f3ede8]">Configured Services</h2>
				<p class="font-mono text-xs text-[#8e7a6c]">
					Standard commercial service offerings & rates
				</p>
			</div>
			<a href="/admin/services" class="font-mono text-xs text-[#ea9c5a] hover:underline">
				Manage all services →
			</a>
		</div>

		<div class="mt-4 overflow-x-auto">
			<table class="w-full text-left font-sans text-sm">
				<thead>
					<tr class="border-b border-[#2d180a] font-mono text-xs text-[#8e7a6c] uppercase">
						<th class="py-3 pr-4">Service</th>
						<th class="px-4 py-3">Slug</th>
						<th class="px-4 py-3">Price Range</th>
						<th class="px-4 py-3">Period</th>
						<th class="py-3 pl-4 text-right">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-[#2d180a]">
					{#each data.services as service}
						<tr class="transition-colors hover:bg-[#1e1006]/50">
							<td class="py-3 pr-4 font-medium text-[#f3ede8]">
								<a href={`/admin/services/${service.id}`} class="hover:text-[#ea9c5a]">
									{service.title}
								</a>
							</td>
							<td class="px-4 py-3 font-mono text-xs text-[#a89485]">
								{service.slug}
							</td>
							<td class="px-4 py-3 font-mono text-xs text-[#ea9c5a]">
								{service.priceRange}
							</td>
							<td class="px-4 py-3 font-mono text-xs text-[#a89485]">
								{service.pricePeriod}
							</td>
							<td class="py-3 pl-4 text-right">
								<a
									href={`/admin/services/${service.id}`}
									class="border border-[#3e2415] bg-[#201005] px-2.5 py-1 font-mono text-xs text-[#d1bfb3] hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
								>
									Edit
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
