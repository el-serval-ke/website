<script lang="ts">
	let hoveredIndex = $state<number | null>(null);

	// Data points for the 28-day sample period
	const points = [
		{ day: 'Day 02', clicks: 12, impressions: 84 },
		{ day: 'Day 05', clicks: 18, impressions: 120 },
		{ day: 'Day 08', clicks: 28, impressions: 210 },
		{ day: 'Day 11', clicks: 24, impressions: 190 },
		{ day: 'Day 14', clicks: 42, impressions: 320 },
		{ day: 'Day 17', clicks: 38, impressions: 290 },
		{ day: 'Day 20', clicks: 54, impressions: 410 },
		{ day: 'Day 23', clicks: 68, impressions: 480 },
		{ day: 'Day 26', clicks: 62, impressions: 450 },
		{ day: 'Day 28', clicks: 76, impressions: 560 }
	];

	const width = 500;
	const height = 130;
	const padX = 24;
	const padY = 20;

	function getCoord(val: number, maxVal: number, index: number) {
		const x = padX + (index / (points.length - 1)) * (width - 2 * padX);
		const y = height - padY - (val / maxVal) * (height - 2 * padY);
		return { x, y };
	}

	const maxClicks = 85;
	const maxImpressions = 600;

	const clickCoords = points.map((p, i) => getCoord(p.clicks, maxClicks, i));
	const impCoords = points.map((p, i) => getCoord(p.impressions, maxImpressions, i));

	const clickPath = clickCoords
		.map((c, i) => (i === 0 ? `M ${c.x} ${c.y}` : `L ${c.x} ${c.y}`))
		.join(' ');
	const impPath = impCoords
		.map((c, i) => (i === 0 ? `M ${c.x} ${c.y}` : `L ${c.x} ${c.y}`))
		.join(' ');
</script>

<div
	class="relative w-full border border-border-subtle bg-surface/90 p-5 shadow-2xl transition-all duration-300 hover:border-[#ea9c5a]/40 sm:p-7"
>
	<!-- Header with Sharp Edges -->
	<div class="flex items-center justify-between border-b border-border-subtle/80 pb-4">
		<div class="flex items-center gap-2.5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="h-4 w-4 text-[#ea9c5a]"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
				/>
			</svg>
			<span class="text-sm font-semibold tracking-tight text-text-main">Google Search Console</span>
		</div>
		<span
			class="border border-[#ea9c5a]/30 bg-[#341608] px-2.5 py-0.5 font-mono text-xs font-medium text-[#ea9c5a]"
		>
			Last 28 days
		</span>
	</div>

	<!-- Metric Cards Grid with Sharp Technical Edges -->
	<div class="my-4 grid grid-cols-2 gap-3 sm:gap-4">
		<!-- Search Clicks Card -->
		<div class="border border-[#ea9c5a]/30 bg-[#341608] p-3.5 sm:p-4">
			<span class="font-sans text-xs font-medium text-[#f6cc9b]">Search clicks</span>
			<div class="mt-1 flex items-baseline gap-2">
				<span class="font-mono text-2xl font-bold text-text-main sm:text-3xl">442</span>
				<span class="font-mono text-xs font-medium text-[#7fa382]">+34%</span>
			</div>
		</div>

		<!-- Impressions Card -->
		<div class="border border-border-subtle bg-[#1a1e1d] p-3.5 sm:p-4">
			<span class="font-sans text-xs font-medium text-text-muted">Total impressions</span>
			<div class="mt-1 flex items-baseline gap-2">
				<span class="font-mono text-2xl font-bold text-text-main sm:text-3xl">3.1K</span>
				<span class="font-mono text-xs font-medium text-[#7fa382]">+21%</span>
			</div>
		</div>
	</div>

	<!-- Dual Line Chart with Sharp Borders -->
	<div class="relative my-3 overflow-hidden border border-border-subtle bg-base/70 p-3">
		<svg
			viewBox="0 0 {width} {height}"
			class="h-auto w-full overflow-visible"
			aria-label="Search Performance 28-day Trend Graph"
			role="img"
		>
			<!-- Impressions Line -->
			<path
				d={impPath}
				fill="none"
				stroke="#7fa382"
				stroke-width="2"
				stroke-linejoin="miter"
				class="transition-all duration-300"
			/>
			<!-- Search Clicks Line -->
			<path
				d={clickPath}
				fill="none"
				stroke="#ea9c5a"
				stroke-width="2.5"
				stroke-linejoin="miter"
				class="transition-all duration-300"
			/>

			<!-- Points with sharp diamond markers -->
			{#each clickCoords as c, i (points[i].day)}
				<!-- Clicks point -->
				<rect
					x={c.x - (hoveredIndex === i ? 4 : 2.5)}
					y={c.y - (hoveredIndex === i ? 4 : 2.5)}
					width={hoveredIndex === i ? 8 : 5}
					height={hoveredIndex === i ? 8 : 5}
					transform="rotate(45 {c.x} {c.y})"
					fill="#ea9c5a"
					role="button"
					tabindex="0"
					aria-label="{points[i].day}: {points[i].clicks} clicks"
					class="cursor-pointer transition-all duration-150 focus:outline-none"
					onmouseenter={() => (hoveredIndex = i)}
					onmouseleave={() => (hoveredIndex = null)}
					onfocus={() => (hoveredIndex = i)}
					onblur={() => (hoveredIndex = null)}
				/>
				<!-- Impressions point -->
				<rect
					x={impCoords[i].x - (hoveredIndex === i ? 4 : 2)}
					y={impCoords[i].y - (hoveredIndex === i ? 4 : 2)}
					width={hoveredIndex === i ? 8 : 4}
					height={hoveredIndex === i ? 8 : 4}
					transform="rotate(45 {impCoords[i].x} {impCoords[i].y})"
					fill="#7fa382"
					role="button"
					tabindex="0"
					aria-label="{points[i].day}: {points[i].impressions} impressions"
					class="cursor-pointer transition-all duration-150 focus:outline-none"
					onmouseenter={() => (hoveredIndex = i)}
					onmouseleave={() => (hoveredIndex = null)}
					onfocus={() => (hoveredIndex = i)}
					onblur={() => (hoveredIndex = null)}
				/>
			{/each}
		</svg>

		<!-- Tooltip on hover with sharp corners -->
		{#if hoveredIndex !== null}
			<div
				class="animate-in fade-in absolute top-2 right-3 flex items-center gap-3 border border-[#ea9c5a]/40 bg-surface px-3 py-1.5 font-mono text-xs text-text-main shadow-lg"
			>
				<span class="text-text-muted">{points[hoveredIndex].day}</span>
				<span class="font-medium text-[#ea9c5a]">{points[hoveredIndex].clicks} clicks</span>
				<span class="font-medium text-[#7fa382]">{points[hoveredIndex].impressions} imp</span>
			</div>
		{/if}
	</div>

	<!-- Legend & Note -->
	<div class="mt-3 flex items-center justify-between text-xs text-text-muted">
		<div class="flex items-center gap-4">
			<span class="flex items-center gap-1.5">
				<span class="h-2 w-2 rotate-45 bg-[#ea9c5a]"></span>
				Clicks
			</span>
			<span class="flex items-center gap-1.5">
				<span class="h-2 w-2 rotate-45 bg-[#7fa382]"></span>
				Impressions
			</span>
		</div>
		<span class="font-mono text-[11px] text-text-dim">Illustrative benchmark</span>
	</div>
</div>
