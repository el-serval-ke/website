<script lang="ts">
	import { enhance } from '$app/forms';
	import RichTextEditor from '$lib/components/RichTextEditor.svelte';
	import { getFileUrl } from '$lib/pocketbase';

	let { data, form } = $props();

	let searchQuery = $state('');
	let showModal = $state(false);
	let saving = $state(false);

	let editId = $state('');
	let editTitle = $state('');
	let editSlug = $state('');
	let editDescription = $state('');
	let existingImage = $state('');

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.trim()
			.replace(/[\s\W-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	function handleTitleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		editTitle = target.value;
		if (!editId) {
			editSlug = slugify(target.value);
		}
	}

	function openCreate() {
		editId = '';
		editTitle = '';
		editSlug = '';
		editDescription = '';
		existingImage = '';
		showModal = true;
	}

	function openEdit(cat: any) {
		editId = cat.id;
		editTitle = cat.title;
		editSlug = cat.slug;
		editDescription = cat.description;
		existingImage = cat.featured_image
			? getFileUrl({ id: cat.id, collectionName: 'blog_categories' }, cat.featured_image)
			: '';
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	let filteredCategories = $derived(
		data.categories.filter(
			(c: any) =>
				c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				c.slug.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<svelte:head>
	<title>Blog Categories — El Serval Admin</title>
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div
		class="flex flex-col gap-4 border-b border-[#2d180a] pb-6 sm:flex-row sm:items-center sm:justify-between"
	>
		<div>
			<div
				class="flex items-center gap-2 font-mono text-xs tracking-widest text-[#ea9c5a] uppercase"
			>
				<a href="/admin" class="hover:underline">Admin</a>
				<span>/</span>
				<span>Taxonomy</span>
			</div>
			<h1 class="mt-2 font-serif text-3xl font-bold tracking-tight text-[#f3ede8]">
				Blog Categories
			</h1>
			<p class="font-sans text-sm text-[#a89485]">
				Create and structure topic categories with rich descriptions and featured imagery.
			</p>
		</div>

		<button
			type="button"
			onclick={openCreate}
			class="border border-[#ea9c5a] bg-[#ea9c5a] px-4 py-2 font-mono text-xs font-bold tracking-wider text-[#180e05] uppercase transition-colors hover:bg-[#d88944]"
		>
			+ Add Category
		</button>
	</div>

	{#if form?.error}
		<div class="border border-red-500/40 bg-red-950/40 p-4 font-mono text-xs text-red-200">
			{form.error}
		</div>
	{/if}

	<!-- Search Bar -->
	<div class="flex items-center gap-4">
		<div class="relative flex-1">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search categories by title or slug..."
				class="w-full border border-[#3e2415] bg-[#170c05] px-4 py-2.5 font-mono text-xs text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
			/>
		</div>
		<div class="font-mono text-xs text-[#8e7a6c]">
			{filteredCategories.length} category{filteredCategories.length === 1 ? '' : 'ies'}
		</div>
	</div>

	<!-- Categories List Table -->
	<div class="border border-[#2d180a] bg-[#170c05]">
		{#if filteredCategories.length === 0}
			<div class="py-12 text-center font-mono text-xs text-[#7d695b]">
				No categories found matching your query.
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left font-sans text-sm">
					<thead>
						<tr class="border-b border-[#2d180a] font-mono text-xs text-[#8e7a6c] uppercase">
							<th class="px-4 py-3">Title</th>
							<th class="px-4 py-3">Slug</th>
							<th class="px-4 py-3">Articles</th>
							<th class="px-4 py-3">Description Snippet</th>
							<th class="py-3 pr-6 pl-4 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-[#2d180a]">
						{#each filteredCategories as cat}
							<tr class="transition-colors hover:bg-[#1e1006]/50">
								<td class="px-4 py-3 font-medium text-[#f3ede8]">
									<div class="flex items-center gap-3">
										{#if cat.featured_image}
											<img
												src={getFileUrl(
													{ id: cat.id, collectionName: 'blog_categories' },
													cat.featured_image
												)}
												alt={cat.title}
												class="h-8 w-8 border border-[#3e2415] object-cover"
											/>
										{/if}
										<span>{cat.title}</span>
									</div>
								</td>
								<td class="px-4 py-3 font-mono text-xs text-[#ea9c5a]">
									{cat.slug}
								</td>
								<td class="px-4 py-3 font-mono text-xs text-[#a89485]">
									{cat.blogsCount} post{cat.blogsCount === 1 ? '' : 's'}
								</td>
								<td class="max-w-xs truncate px-4 py-3 text-xs text-[#8e7a6c]">
									{cat.description ? cat.description.replace(/<[^>]+>/g, '') : 'No description'}
								</td>
								<td class="py-3 pr-6 pl-4 text-right">
									<div class="flex items-center justify-end gap-2">
										<button
											type="button"
											onclick={() => openEdit(cat)}
											class="border border-[#3e2415] bg-[#201005] px-2.5 py-1 font-mono text-xs text-[#d1bfb3] hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
										>
											Edit
										</button>
										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												if (!confirm(`Are you sure you want to delete category "${cat.title}"?`)) {
													return () => {};
												}
												return async ({ update }) => {
													await update();
												};
											}}
										>
											<input type="hidden" name="id" value={cat.id} />
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

<!-- Category Editor Modal -->
{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="relative w-full max-w-2xl border border-[#3e2415] bg-[#180e05] p-6 shadow-2xl sm:p-8"
		>
			<div class="flex items-center justify-between border-b border-[#2d180a] pb-4">
				<h2 class="font-serif text-2xl font-bold text-[#f3ede8]">
					{editId ? 'Edit Category' : 'Create New Category'}
				</h2>
				<button
					type="button"
					onclick={closeModal}
					class="font-mono text-sm text-[#8e7a6c] hover:text-[#ea9c5a]"
				>
					✕
				</button>
			</div>

			<form
				method="POST"
				action="?/save"
				enctype="multipart/form-data"
				use:enhance={() => {
					saving = true;
					return async ({ update }) => {
						saving = false;
						closeModal();
						await update();
					};
				}}
				class="mt-6 space-y-6"
			>
				<input type="hidden" name="id" value={editId} />
				<input type="hidden" name="description" value={editDescription} />

				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label
							for="cat-title"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Category Title <span class="text-[#ea9c5a]">*</span>
						</label>
						<input
							type="text"
							id="cat-title"
							name="title"
							value={editTitle}
							oninput={handleTitleInput}
							required
							placeholder="e.g. Search Engine Optimization"
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2.5 font-sans text-sm text-[#f3ede8] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>

					<div>
						<label
							for="cat-slug"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Slug Identifier <span class="text-[#ea9c5a]">*</span>
						</label>
						<input
							type="text"
							id="cat-slug"
							name="slug"
							bind:value={editSlug}
							required
							placeholder="e.g. seo"
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2.5 font-mono text-xs text-[#ea9c5a] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>
				</div>

				<!-- Featured Image Upload -->
				<div>
					<label
						for="cat-image"
						class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
					>
						Featured Image
					</label>
					{#if existingImage}
						<div class="mt-2 flex items-center gap-3">
							<img
								src={existingImage}
								alt="Current"
								class="h-12 w-12 border border-[#3e2415] object-cover"
							/>
							<span class="font-mono text-xs text-[#8e7a6c]"
								>Current image set. Select file to replace.</span
							>
						</div>
					{/if}
					<input
						type="file"
						id="cat-image"
						name="featured_image"
						accept="image/*"
						class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] p-2 font-mono text-xs text-[#8e7a6c] file:mr-4 file:border-0 file:bg-[#ea9c5a] file:px-3 file:py-1 file:font-mono file:text-xs file:font-bold file:text-[#180e05]"
					/>
				</div>

				<!-- Description with Self-hosted TinyMCE GPL -->
				<div>
					<RichTextEditor
						id="category-description-editor"
						label="Category Description & Overview (TinyMCE GPL Self-Hosted)"
						bind:value={editDescription}
						height={250}
						placeholder="Describe what kind of articles and insights fall into this category..."
					/>
				</div>

				<!-- Modal Actions -->
				<div class="flex items-center justify-end gap-3 border-t border-[#2d180a] pt-4">
					<button
						type="button"
						onclick={closeModal}
						class="border border-[#3e2415] bg-[#201005] px-4 py-2 font-mono text-xs text-[#d1bfb3] uppercase hover:text-[#ea9c5a]"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={saving}
						class="border border-[#ea9c5a] bg-[#ea9c5a] px-6 py-2 font-mono text-xs font-bold tracking-wider text-[#180e05] uppercase hover:bg-[#d88944] disabled:opacity-50"
					>
						{saving ? 'Saving...' : editId ? 'Update Category' : 'Create Category'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
