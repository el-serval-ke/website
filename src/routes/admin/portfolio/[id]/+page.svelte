<script lang="ts">
	import { enhance } from '$app/forms';
	import RichTextEditor from '$lib/components/RichTextEditor.svelte';
	import { getFileUrl } from '$lib/pocketbase';

	let { data, form } = $props();

	let isNew = $derived(!data.portfolioItem);
	let saving = $state(false);

	let title = $state(data.portfolioItem?.title || '');
	let slug = $state(data.portfolioItem?.slug || '');
	let description = $state(data.portfolioItem?.description || '');
	let clientTestimonial = $state(data.portfolioItem?.client_testimonial || '');

	// Client JSON fields
	let clientName = $state(data.portfolioItem?.client?.name || '');
	let clientCompany = $state(data.portfolioItem?.client?.company || '');
	let clientLogo = $state(data.portfolioItem?.client?.logo || '');
	let clientContact = $state(data.portfolioItem?.client?.contact_details || '');

	// Multi-select categories (services FK relation)
	let selectedCategoryIds = $state<string[]>(data.portfolioItem?.categoryIds || []);

	// Metadata
	let tags = $state(data.portfolioItem?.tags || '');
	let link = $state(data.portfolioItem?.link || '');
	let video = $state(data.portfolioItem?.video || '');
	let startDate = $state(data.portfolioItem?.start_date || '');
	let endDate = $state(data.portfolioItem?.end_date || '');
	let status = $state(data.portfolioItem?.status || 'ongoing');

	// Image management
	let removeFeaturedImage = $state(false);
	let screenshotsToDelete = $state<string[]>([]);

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

	function toggleCategory(svcId: string) {
		if (selectedCategoryIds.includes(svcId)) {
			selectedCategoryIds = selectedCategoryIds.filter((id) => id !== svcId);
		} else {
			selectedCategoryIds = [...selectedCategoryIds, svcId];
		}
	}

	function toggleDeleteScreenshot(filename: string) {
		if (screenshotsToDelete.includes(filename)) {
			screenshotsToDelete = screenshotsToDelete.filter((f) => f !== filename);
		} else {
			screenshotsToDelete = [...screenshotsToDelete, filename];
		}
	}

	let currentFeaturedUrl = $derived(
		data.portfolioItem?.featured_image
			? getFileUrl(
					{ id: data.portfolioItem.id, collectionName: 'portfolio_items' },
					data.portfolioItem.featured_image
				)
			: ''
	);
</script>

<svelte:head>
	<title
		>{isNew ? 'Create Portfolio Item' : `Edit: ${data.portfolioItem?.title}`} — El Serval Admin</title
	>
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
				<a href="/admin/portfolio" class="hover:underline">Portfolio</a>
				<span>/</span>
				<span>{isNew ? 'New' : 'Edit'}</span>
			</div>
			<h1 class="mt-2 font-serif text-3xl font-bold tracking-tight text-[#f3ede8]">
				{isNew ? 'New Portfolio Case Study' : `Edit: ${data.portfolioItem?.title}`}
			</h1>
		</div>

		<div class="flex items-center gap-3">
			<a
				href="/admin/portfolio"
				class="border border-[#3e2415] bg-[#201005] px-4 py-2 font-mono text-xs tracking-wider text-[#d1bfb3] uppercase hover:border-[#ea9c5a] hover:text-[#ea9c5a]"
			>
				Cancel
			</a>
			{#if !isNew && data.portfolioItem?.slug}
				<a
					href={`/portfolio/${data.portfolioItem.slug}`}
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

	<!-- Form -->
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
		<input type="hidden" name="client_testimonial" value={clientTestimonial} />
		<input type="hidden" name="remove_featured_image" value={removeFeaturedImage ? '1' : '0'} />

		<!-- Hidden inputs for each selected service category -->
		{#each selectedCategoryIds as svcId (svcId)}
			<input type="hidden" name="category" value={svcId} />
		{/each}

		<!-- Hidden inputs for screenshots to delete -->
		{#each screenshotsToDelete as delFile (delFile)}
			<input type="hidden" name="delete_screenshots" value={delFile} />
		{/each}

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<!-- Main Column -->
			<div class="space-y-6 lg:col-span-2">
				<!-- Basic Details -->
				<div class="space-y-5 border border-[#2d180a] bg-[#170c05] p-6">
					<div>
						<label
							for="title"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Project Title <span class="text-[#ea9c5a]">*</span>
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={title}
							oninput={handleTitleInput}
							required
							placeholder="e.g. Kilimo Table"
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
							placeholder="e.g. kilimo-table"
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2.5 font-mono text-xs text-[#ea9c5a] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>
				</div>

				<!-- Client Details (JSON Field) -->
				<div class="space-y-5 border border-[#2d180a] bg-[#170c05] p-6">
					<div class="border-b border-[#2d180a] pb-3">
						<h3 class="font-mono text-xs font-bold tracking-wider text-[#ea9c5a] uppercase">
							Client Specification (JSON Field)
						</h3>
						<p class="mt-1 font-sans text-xs text-[#8e7a6c]">
							Structured company details, primary contact person, and contact coordinates.
						</p>
					</div>

					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label
								for="client_company"
								class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
							>
								Company / Business Name
							</label>
							<input
								type="text"
								id="client_company"
								name="client_company"
								bind:value={clientCompany}
								placeholder="e.g. Kilimo Table Co."
								class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2.5 font-sans text-sm text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
							/>
						</div>

						<div>
							<label
								for="client_name"
								class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
							>
								Client Contact Person
							</label>
							<input
								type="text"
								id="client_name"
								name="client_name"
								bind:value={clientName}
								placeholder="e.g. Wanjiku Mwangi"
								class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2.5 font-sans text-sm text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
							/>
						</div>

						<div>
							<label
								for="client_contact"
								class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
							>
								Contact Details (Email / WhatsApp)
							</label>
							<input
								type="text"
								id="client_contact"
								name="client_contact"
								bind:value={clientContact}
								placeholder="e.g. info@kilimotable.co.ke | +254 700 000 000"
								class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2.5 font-sans text-sm text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
							/>
						</div>

						<div>
							<label
								for="client_logo"
								class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
							>
								Client Logo URL or Path
							</label>
							<input
								type="text"
								id="client_logo"
								name="client_logo"
								bind:value={clientLogo}
								placeholder="e.g. /images/clients/kilimo.png"
								class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2.5 font-mono text-xs text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
							/>
						</div>
					</div>
				</div>

				<!-- Service Categories Multi-Select (Foreign Key Relation to Services) -->
				<div class="space-y-4 border border-[#2d180a] bg-[#170c05] p-6">
					<div class="border-b border-[#2d180a] pb-3">
						<div class="flex items-center justify-between">
							<h3 class="font-mono text-xs font-bold tracking-wider text-[#ea9c5a] uppercase">
								Service Categories (Foreign Key Relation)
							</h3>
							<span class="font-mono text-xs text-[#8e7a6c]">
								{selectedCategoryIds.length} selected
							</span>
						</div>
						<p class="mt-1 font-sans text-xs text-[#8e7a6c]">
							Link this portfolio item to one or more studio services. A single project can have
							multiple service categories.
						</p>
					</div>

					<div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
						{#each data.availableServices as svc (svc.id)}
							{@const isSelected = selectedCategoryIds.includes(svc.id)}
							<button
								type="button"
								onclick={() => toggleCategory(svc.id)}
								class="flex items-center justify-between border p-3 text-left transition-all {isSelected
									? 'border-[#ea9c5a] bg-[#291307] text-[#ea9c5a]'
									: 'border-[#3e2415] bg-[#120a04] text-[#d1bfb3] hover:border-[#7d695b]'}"
							>
								<div>
									<div class="font-sans text-xs font-medium">{svc.title}</div>
									<div class="font-mono text-[10px] text-[#8e7a6c]">{svc.slug}</div>
								</div>
								<span
									class="flex h-5 w-5 shrink-0 items-center justify-center border font-mono text-xs {isSelected
										? 'border-[#ea9c5a] bg-[#ea9c5a] font-bold text-[#180e05]'
										: 'border-[#3e2415] bg-[#1e1006]'}"
								>
									{isSelected ? '✓' : ''}
								</span>
							</button>
						{/each}
					</div>
				</div>

				<!-- Project Description (TinyMCE GPL) -->
				<div class="border border-[#2d180a] bg-[#170c05] p-6">
					<RichTextEditor
						id="portfolio-description-editor"
						label="Case Study Story & Scope (TinyMCE GPL Self-Hosted)"
						bind:value={description}
						height={420}
						placeholder="Detail the client context, challenge, technical approach, and measurable outcome..."
					/>
				</div>

				<!-- Client Testimonial (TinyMCE GPL) -->
				<div class="border border-[#2d180a] bg-[#170c05] p-6">
					<RichTextEditor
						id="portfolio-testimonial-editor"
						label="Client Testimonial (TinyMCE GPL Self-Hosted)"
						bind:value={clientTestimonial}
						height={220}
						placeholder="Quote from the client verifying the results, satisfaction, or partnership experience..."
					/>
				</div>

				<!-- Screenshots Gallery & Upload -->
				<div class="space-y-4 border border-[#2d180a] bg-[#170c05] p-6">
					<div class="border-b border-[#2d180a] pb-3">
						<h3 class="font-mono text-xs font-bold tracking-wider text-[#ea9c5a] uppercase">
							Project Screenshots Gallery
						</h3>
						<p class="mt-1 font-sans text-xs text-[#8e7a6c]">
							Upload high-resolution screenshots and interface mockups.
						</p>
					</div>

					<!-- Existing Screenshots -->
					{#if data.portfolioItem?.screenshots && data.portfolioItem.screenshots.length > 0}
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
							{#each data.portfolioItem.screenshots as filename (filename)}
								{@const willDelete = screenshotsToDelete.includes(filename)}
								<div class="group relative border border-[#3e2415] bg-[#120a04] p-2">
									<img
										src={getFileUrl(
											{ id: data.portfolioItem.id, collectionName: 'portfolio_items' },
											filename,
											'300x200'
										)}
										alt="Screenshot"
										class="h-28 w-full object-cover {willDelete ? 'opacity-25 grayscale' : ''}"
									/>
									<div class="mt-2 flex items-center justify-between">
										<span class="truncate font-mono text-[10px] text-[#8e7a6c]">{filename}</span>
										<button
											type="button"
											onclick={() => toggleDeleteScreenshot(filename)}
											class="font-mono text-xs {willDelete
												? 'font-bold text-amber-400'
												: 'text-red-400 hover:underline'}"
										>
											{willDelete ? 'Undo' : 'Delete'}
										</button>
									</div>
								</div>
							{/each}
						</div>
					{/if}

					<!-- New Uploads -->
					<div>
						<label
							for="screenshots"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Upload Additional Screenshots (Multiple allowed)
						</label>
						<input
							type="file"
							id="screenshots"
							name="screenshots"
							multiple
							accept="image/*"
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] p-2 font-mono text-xs text-[#8e7a6c] file:mr-4 file:border-0 file:bg-[#ea9c5a] file:px-3 file:py-1 file:font-mono file:text-xs file:font-bold file:text-[#180e05]"
						/>
					</div>
				</div>
			</div>

			<!-- Sidebar Column -->
			<div class="space-y-6">
				<!-- Project Status -->
				<div class="space-y-4 border border-[#2d180a] bg-[#170c05] p-6">
					<label
						for="status"
						class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
					>
						Project Status
					</label>
					<select
						id="status"
						name="status"
						bind:value={status}
						class="block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2.5 font-sans text-sm text-[#f3ede8] focus:border-[#ea9c5a] focus:outline-none"
					>
						<option value="just_started">Just Started</option>
						<option value="ongoing">Ongoing</option>
						<option value="concluding">Concluding</option>
						<option value="concluded">Concluded</option>
					</select>
				</div>

				<!-- Project Timeline Dates -->
				<div class="space-y-4 border border-[#2d180a] bg-[#170c05] p-6">
					<h3 class="font-mono text-xs font-bold tracking-wider text-[#ea9c5a] uppercase">
						Engagement Timeline
					</h3>

					<div>
						<label
							for="start_date"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Start Date
						</label>
						<input
							type="date"
							id="start_date"
							name="start_date"
							bind:value={startDate}
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2 font-mono text-xs text-[#f3ede8] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>

					<div>
						<label
							for="end_date"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							End Date
						</label>
						<input
							type="date"
							id="end_date"
							name="end_date"
							bind:value={endDate}
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2 font-mono text-xs text-[#f3ede8] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>
				</div>

				<!-- Links & Media -->
				<div class="space-y-4 border border-[#2d180a] bg-[#170c05] p-6">
					<h3 class="font-mono text-xs font-bold tracking-wider text-[#ea9c5a] uppercase">
						External Links
					</h3>

					<div>
						<label
							for="link"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Live Site Link
						</label>
						<input
							type="url"
							id="link"
							name="link"
							bind:value={link}
							placeholder="https://example.com"
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2 font-mono text-xs text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>

					<div>
						<label
							for="video"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Video / Demo URL
						</label>
						<input
							type="text"
							id="video"
							name="video"
							bind:value={video}
							placeholder="e.g. https://youtube.com/watch?v=..."
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2 font-mono text-xs text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>

					<div>
						<label
							for="tags"
							class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
						>
							Tags
						</label>
						<input
							type="text"
							id="tags"
							name="tags"
							bind:value={tags}
							placeholder="e.g. Web Development, SEO, Agro"
							class="mt-2 block w-full border border-[#3e2415] bg-[#120a04] px-4 py-2 font-mono text-xs text-[#f3ede8] placeholder-[#7d695b] focus:border-[#ea9c5a] focus:outline-none"
						/>
					</div>
				</div>

				<!-- Featured Image -->
				<div class="space-y-4 border border-[#2d180a] bg-[#170c05] p-6">
					<label
						for="featured_image"
						class="block font-mono text-xs font-semibold text-[#d1bfb3] uppercase"
					>
						Primary Featured Image
					</label>

					{#if currentFeaturedUrl && !removeFeaturedImage}
						<div class="space-y-2">
							<img
								src={currentFeaturedUrl}
								alt="Current Featured"
								class="max-h-48 w-full border border-[#3e2415] object-cover"
							/>
							<div class="flex items-center justify-between">
								<span class="font-mono text-[11px] text-[#8e7a6c]">Current image set</span>
								<button
									type="button"
									onclick={() => (removeFeaturedImage = true)}
									class="font-mono text-xs text-red-400 hover:underline"
								>
									Remove
								</button>
							</div>
						</div>
					{:else if removeFeaturedImage}
						<div
							class="flex items-center justify-between border border-amber-900/40 bg-amber-950/20 p-3 font-mono text-xs text-amber-300"
						>
							<span>Marked for removal.</span>
							<button
								type="button"
								onclick={() => (removeFeaturedImage = false)}
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
						{saving ? 'Saving...' : isNew ? 'Create Project' : 'Save Changes'}
					</button>
					{#if !isNew && data.portfolioItem?.created}
						<div class="text-center font-mono text-[11px] text-[#7d695b]">
							Created on {new Date(data.portfolioItem.created).toLocaleDateString()}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</form>
</div>
