<script lang="ts">
	let name = $state('');
	let email = $state('');
	let business = $state('');
	let selectedService = $state('Web Development');
	let selectedBudget = $state('KES 60,000–120,000');
	let message = $state('');

	let isSubmitting = $state(false);
	let isSubmitted = $state(false);
	let errorMessage = $state('');

	const servicesOptions = [
		'Search Engine Optimization',
		'Website Maintenance',
		'Website Optimization',
		'Website Revamp',
		'Cybersecurity',
		'Web Development'
	];

	const budgetOptions = [
		'Under KES 20,000',
		'KES 20,000–60,000',
		'KES 60,000–120,000',
		'KES 120,000–200,000',
		'KES 200,000+'
	];

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		errorMessage = '';

		if (!name.trim()) {
			errorMessage = 'Please provide your name.';
			return;
		}
		if (!email.trim() || !email.includes('@')) {
			errorMessage = 'Please provide a valid email address.';
			return;
		}
		if (!message.trim()) {
			errorMessage = 'Please tell me a little about your project.';
			return;
		}

		isSubmitting = true;
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			isSubmitted = true;
		} catch {
			errorMessage = 'Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	function resetForm() {
		name = '';
		email = '';
		business = '';
		selectedService = 'Web Development';
		selectedBudget = 'KES 60,000–120,000';
		message = '';
		isSubmitted = false;
		errorMessage = '';
	}
</script>

<svelte:head>
	<title>Contact — Discuss Your Project | El Serval KE</title>
	<meta
		name="description"
		content="A new website, a stubborn problem or a question about where to start — share what you have in mind. You do not need a technical brief."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="border-b border-border-subtle/80 py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="max-w-3xl">
			<span
				class="mb-3 inline-block border border-[#ea9c5a]/30 bg-[#341608] px-3 py-1 font-mono text-xs tracking-wider text-[#ea9c5a] uppercase"
			>
				Start a conversation
			</span>
			<h1
				class="font-serif text-5xl leading-[1.08] font-bold tracking-tight text-text-main sm:text-6xl"
			>
				Every good project starts with a conversation.
			</h1>
			<p class="mt-6 font-sans text-xl leading-relaxed text-text-muted">
				A new website, a stubborn search problem, or a question about where to start — share what
				you have in mind. You do not need a technical brief.
			</p>
		</div>
	</div>
</section>

<!-- Form & Process Section -->
<section class="py-16 sm:py-24">
	<div class="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
		<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
			<!-- Left Column: Enquiry Form -->
			<div class="border border-border-subtle bg-surface p-6 sm:p-10 lg:col-span-7">
				<div class="mb-8 border-b border-border-subtle/80 pb-4">
					<h2 class="font-serif text-2xl font-bold text-text-main">Your project details</h2>
					<p class="mt-1 text-xs text-text-muted">Fields marked with * are required</p>
				</div>

				{#if isSubmitted}
					<div
						class="animate-in fade-in space-y-6 py-12 text-center"
						role="status"
						aria-live="polite"
					>
						<div
							class="mx-auto flex h-16 w-16 items-center justify-center border border-[#ea9c5a]/40 bg-[#341608] font-mono text-2xl font-bold text-[#ea9c5a]"
							aria-hidden="true"
						>
							✓
						</div>
						<h2 class="font-serif text-3xl font-bold text-text-main">
							Thank you, {name}.
						</h2>
						<p class="mx-auto max-w-md font-sans leading-relaxed text-text-muted">
							Your project brief for <strong>{selectedService}</strong> has been received. I review
							briefs within 1–2 business days and will follow up at <strong>{email}</strong>.
						</p>
						<button
							type="button"
							class="chamfer-tr inline-flex items-center gap-2 border border-border-subtle bg-surface px-6 py-3 font-mono text-xs tracking-wider text-text-main uppercase transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a]"
							onclick={resetForm}
						>
							Send another enquiry
						</button>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-6" novalidate>
						{#if errorMessage}
							<div
								role="alert"
								aria-live="assertive"
								class="border border-red-500/40 bg-red-950/40 p-4 font-mono text-xs text-red-200"
							>
								{errorMessage}
							</div>
						{/if}

						<!-- Name & Email -->
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<label
									for="name"
									class="mb-2 block text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
								>
									Your name *
								</label>
								<input
									id="name"
									name="name"
									type="text"
									required
									aria-required="true"
									bind:value={name}
									placeholder="How should I address you?"
									class="w-full border border-border-subtle bg-base px-4 py-3 text-sm text-text-main placeholder-text-dim transition-colors focus:border-[#ea9c5a] focus:ring-1 focus:ring-[#ea9c5a] focus:outline-none"
								/>
							</div>

							<div>
								<label
									for="email"
									class="mb-2 block text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
								>
									Email address *
								</label>
								<input
									id="email"
									name="email"
									type="email"
									required
									aria-required="true"
									bind:value={email}
									placeholder="you@yourbusiness.co.ke"
									class="w-full border border-border-subtle bg-base px-4 py-3 text-sm text-text-main placeholder-text-dim transition-colors focus:border-[#ea9c5a] focus:ring-1 focus:ring-[#ea9c5a] focus:outline-none"
								/>
							</div>
						</div>

						<!-- Business Name / Website -->
						<div>
							<label
								for="business"
								class="mb-2 block text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
							>
								Business name / website
							</label>
							<input
								id="business"
								name="business"
								type="text"
								bind:value={business}
								placeholder="Your business name and current website, if any"
								class="w-full border border-border-subtle bg-base px-4 py-3 text-sm text-text-main placeholder-text-dim transition-colors focus:border-[#ea9c5a] focus:ring-1 focus:ring-[#ea9c5a] focus:outline-none"
							/>
						</div>

						<!-- What would you like help with? -->
						<fieldset class="m-0 border-0 p-0">
							<legend
								class="mb-2 block text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
							>
								What would you like help with? *
							</legend>
							<div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Services selection">
								{#each servicesOptions as opt (opt)}
									<button
										type="button"
										role="radio"
										aria-checked={selectedService === opt}
										class="border px-3.5 py-2 font-mono text-xs tracking-wider uppercase transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a] {selectedService ===
										opt
											? 'border-[#ea9c5a] bg-[#341608] font-semibold text-[#ea9c5a]'
											: 'border-border-subtle bg-base text-text-muted hover:text-text-main'}"
										onclick={() => (selectedService = opt)}
									>
										{opt}
									</button>
								{/each}
							</div>
						</fieldset>

						<!-- Indicative Budget -->
						<fieldset class="m-0 border-0 p-0">
							<legend
								class="mb-1 block text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
							>
								Indicative budget (KES)
							</legend>
							<p class="mb-2 text-xs text-text-dim">
								A rough range helps scope recommendations. Final costs are agreed together.
							</p>
							<div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Budget selection">
								{#each budgetOptions as b (b)}
									<button
										type="button"
										role="radio"
										aria-checked={selectedBudget === b}
										class="border px-3.5 py-1.5 font-mono text-xs tracking-wider uppercase transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a] {selectedBudget ===
										b
											? 'border-[#ea9c5a] bg-[#341608] font-semibold text-[#ea9c5a]'
											: 'border-border-subtle bg-base text-text-muted hover:text-text-main'}"
										onclick={() => (selectedBudget = b)}
									>
										{b}
									</button>
								{/each}
							</div>
						</fieldset>

						<!-- Tell me about your project -->
						<div>
							<label
								for="message"
								class="mb-2 block text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
							>
								Tell me about your project *
							</label>
							<textarea
								id="message"
								name="message"
								rows="4"
								required
								aria-required="true"
								bind:value={message}
								placeholder="What does your business offer? What is currently not working? What would success look like?"
								class="w-full border border-border-subtle bg-base px-4 py-3 text-sm leading-relaxed text-text-main placeholder-text-dim transition-colors focus:border-[#ea9c5a] focus:ring-1 focus:ring-[#ea9c5a] focus:outline-none"
							></textarea>
						</div>

						<!-- Submit Button -->
						<div class="pt-2">
							<button
								type="submit"
								disabled={isSubmitting}
								class="chamfer-tr inline-flex cursor-pointer items-center gap-2 border border-[#ea9c5a]/40 bg-[#ea9c5a] px-8 py-3.5 font-semibold tracking-tight text-[#180e05] transition-all duration-200 hover:bg-[#f0ab6b] hover:shadow-lg hover:shadow-[#ea9c5a]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea9c5a] active:translate-y-0.5 disabled:opacity-50"
							>
								{#if isSubmitting}
									<span>Sending brief...</span>
								{:else}
									<span>Send project enquiry</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="h-4 w-4"
									>
										<path
											fill-rule="evenodd"
											d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
											clip-rule="evenodd"
										/>
									</svg>
								{/if}
							</button>
						</div>

						<p class="text-xs text-text-dim">
							No upfront commitment. We review deliverables, timing, and pricing together before
							paid work starts.
						</p>
					</form>
				{/if}
			</div>

			<!-- Right Column: Process & Info -->
			<div class="space-y-6 lg:col-span-5">
				<!-- What Happens Next Card -->
				<div class="border border-border-subtle bg-surface p-7 sm:p-8">
					<span
						class="mb-2 inline-block font-mono text-xs font-semibold tracking-wider text-[#ea9c5a] uppercase"
					>
						What happens next
					</span>
					<h2 class="mb-6 font-serif text-2xl font-bold text-text-main">
						A clear next step, not a sales maze.
					</h2>

					<div class="space-y-5">
						<div class="border-l-2 border-[#ea9c5a] pl-4">
							<div class="text-xs font-semibold text-[#ea9c5a]">1. Brief Review</div>
							<p class="mt-1 text-sm text-text-muted">
								I review your goals and inspect any existing website you share.
							</p>
						</div>

						<div class="border-l-2 border-[#ea9c5a] pl-4">
							<div class="text-xs font-semibold text-[#ea9c5a]">2. Clarify Fit</div>
							<p class="mt-1 text-sm text-text-muted">
								We discuss priorities, access requirements, timeline and scope.
							</p>
						</div>

						<div class="border-l-2 border-[#ea9c5a] pl-4">
							<div class="text-xs font-semibold text-[#ea9c5a]">3. Scope & Quote</div>
							<p class="mt-1 text-sm text-text-muted">
								You receive a clear proposal with deliverables and milestones to approve.
							</p>
						</div>
					</div>
				</div>

				<!-- Location Card -->
				<div class="border border-border-subtle bg-surface p-7">
					<h3 class="mb-1 font-serif text-lg font-bold text-text-main">Based in Kenya</h3>
					<div class="mb-3 text-xs text-[#ea9c5a]">Nairobi · East Africa Time (UTC+3)</div>
					<p class="text-sm leading-relaxed text-text-muted">
						Independent, remote-friendly collaboration for Kenyan businesses. Working hours and
						communication windows are agreed transparently for each project.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
