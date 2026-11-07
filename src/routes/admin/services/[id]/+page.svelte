<script lang="ts">
	import { enhance } from '$app/forms';
	import RichTextEditor from '$lib/components/RichTextEditor.svelte';
	import { getFileUrl } from '$lib/pocketbase';

	let { data, form } = $props();

	let isNew = $derived(!data.service);
	let saving = $state(false);

	let title = $state(data.service?.title || '');
	let slug = $state(data.service?.slug || '');
	let description = $state(data.service?.description || '');
	let price_range = $state(data.service?.price_range || '');
	let price_period = $state(data.service?.price_period || '');
	let removeImage = $state(false);

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.trim()
			.replace(/[\s\W-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	function handleTitleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		title = target.value;
		if (isNew) {
			slug = slugify(target.value);
		}
	}

	let currentImageUrl = $derived(
		data.service?.featured_image
			? getFileUrl({ id: data.service.id, collectionName: 'services' }, data.service.featured_image)
			: ''
	);
</script>

<svelte:head>
	<title>{isNew ? 'Create New Service' : `Edit: ${data.service?.title}`} — El Serval Admin</title>
</svelte:head>

<div class="space-y-6">
	<!-- Breadcrumb & Header -->
	<div
		class="flex flex-col gap-4 border-b border-[#2d180a] pb-6 sm:flex-row sm:items-center sm:justify-between"
	>
		<div>
			<div
				class="flex items-center gap-2 font-mono text-xs tracking-widest text-[#ea9c5a] uppercase"
			>
				<a href="/admin" class="hover:underline">Admin</a>
				<span>/</span>
				<a href="/admin/services" class="hover:underline">Services</a>
				<span>/</span>
				<span>{isNew ? 'New' : 'Edit'}</span>
			</div>
			<h1 class="mt-2 font-serif text-3xl font-bold tracking-tight text-[#f3ede8]">
				{isNew ? 'New Service' : `Edit: ${data.service?.title}`}
			</h1>
		</div>

		<div class="flex items-center gap-3">
			<a
				href="/admin/services"
				class="border border-[#3e2415] bg-[#201005] px-4 py-2 font-mono text-xs tracking-wider text-[#d1bfb3] uppercase hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
			>
				Cancel
			</a>
			{#if !isNew && data.service?.slug}
				<a
					href={`/services/${data.service.slug}`}
					target="_blank"
					class="border border-[#3e2415] bg-[#201005] px-4 py-2 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase hover:border-[#ea9c5a]"
				>
					Preview Live ↗
				</a>
			{/if}
		</div>
	</div>

	{#if form?.error}
		<div class="border border-red-500/40 bg-red-950/40 p-4 font-mono text-xs text-red-200">
			{form.error}
		</div>
	{/if}

	<!-- Form Card -->
	<form
		method="POST"
		action="?/save"
		enctype="multipart/form-data"
		use:enhance={() => {
			saving = true;
			return async ({ update }) => {
				saving = false;
				await update();
			};
		}}
		class="space-y-8"
	>
		<input type="hidden" name="description" value={description} />
		<input type="hidden" name="remove_featured_image" value={removeImage ? '1' : '0'} />

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<!-- Main Column: Title, Slug, Description -->
			<div class="space-y-6 lg:col-span-2">
				<div class="space-y-5 border border-[#2d180a] bg-[#170c05] p-6">
					<div>
						<label
							for="title"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Service Title <span class="text-[#ea9c5a]">*</span>
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={title}
							oninput={handleTitleInput}
							required
							placeholder="e.g. Search Engine Optimization (SEO)"
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-3 font-serif text-lg text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>

					<div>
						<label
							for="slug"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Slug Identifier <span class="text-[#ea9c5a]">*</span>
						</label>
						<input
							type="text"
							id="slug"
							name="slug"
							bind:value={slug}
							required
							placeholder="e.g. search-engine-optimization"
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2.5 font-mono text-xs text-[#ea9c5a] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>
				</div>

				<!-- TinyMCE Rich Text Editor for Service Description -->
				<div class="border border-[#2d180a] bg-[#170c05] p-6">
					<RichTextEditor
						id="service-description-editor"
						label="Service Details & Scope (TinyMCE GPL Self-Hosted)"
						bind:value={description}
						height={450}
						placeholder="Detail what is included, who it is for, deliverables, timeline, and value proposition..."
					/>
				</div>
			</div>

			<!-- Sidebar Column: Pricing & Media -->
			<div class="space-y-6">
				<!-- Pricing -->
				<div class="space-y-4 border border-[#2d180a] bg-[#170c05] p-6">
					<h3 class="font-mono text-xs font-bold tracking-wider text-[#ea9c5a] uppercase">
						Pricing Configuration
					</h3>

					<div>
						<label
							for="price_range"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Price Range
						</label>
						<input
							type="text"
							id="price_range"
							name="price_range"
							bind:value={price_range}
							placeholder="e.g. KES 20,000–60,000"
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2.5 font-mono text-xs text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>

					<div>
						<label
							for="price_period"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Billing Period
						</label>
						<input
							type="text"
							id="price_period"
							name="price_period"
							bind:value={price_period}
							placeholder="e.g. / month, per project, one-time audit"
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2.5 font-mono text-xs text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>
				</div>

				<!-- Featured Image -->
				<div class="space-y-4 border border-[#2d180a] bg-[#170c05] p-6">
					<label
						for="featured_image"
						class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
					>
						Featured Image
					</label>

					{#if currentImageUrl && !removeImage}
						<div class="space-y-2">
							<img
								src={currentImageUrl}
								alt="Current Featured"
								class="max-h-48 w-full border border-[#3e2415] object-cover"
							/>
							<div class="flex items-center justify-between">
								<span class="font-mono text-[11px] text-[#8e7a6c]">Current image set</span>
								<button
									type="button"
									onclick={() => (removeImage = true)}
									class="font-mono text-xs text-red-400 hover:underline"
								>
									Remove
								</button>
							</div>
						</div>
					{:else if removeImage}
						<div
							class="flex items-center justify-between border border-amber-900/40 bg-amber-950/20 p-3 font-mono text-xs text-amber-300"
						>
							<span>Image marked for removal.</span>
							<button
								type="button"
								onclick={() => (removeImage = false)}
								class="text-amber-200 underline"
							>
								Undo
							</button>
						</div>
					{/if}

					<input
						type="file"
						id="featured_image"
						name="featured_image"
						accept="image/*"
						class="block w-full border border-[#3e2415] bg-[#120a04] p-2 font-mono text-xs text-[#8e7a6c] file:mr-4 file:border-0 file:bg-[#ea9c5a] file:px-3 file:py-1 file:font-mono file:text-xs file:font-bold file:text-[#180e05]"
					/>
				</div>

				<!-- Save Action -->
				<div class="space-y-3 border border-[#2d180a] bg-[#170c05] p-6">
					<button
						type="submit"
						disabled={saving}
						class="w-full border border-[#ea9c5a] bg-[#ea9c5a] px-6 py-3 font-mono text-xs font-bold tracking-widest text-[#180e05] uppercase transition-colors hover:bg-[#d88944] disabled:opacity-50"
					>
						{saving ? 'Saving...' : isNew ? 'Publish Service' : 'Save Changes'}
					</button>
					{#if !isNew && data.service?.created}
						<div class="text-center font-mono text-[11px] text-[#7d695b]">
							Created on {new Date(data.service.created).toLocaleDateString()}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</form>
</div>
