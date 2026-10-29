<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		id?: string;
		value?: string;
		placeholder?: string;
		height?: number;
		label?: string;
		required?: boolean;
		onchange?: (val: string) => void;
	}

	let {
		id = 'editor-' + Math.random().toString(36).substring(2, 9),
		value = $bindable(''),
		placeholder = 'Write content here...',
		height = 360,
		label = '',
		required = false,
		onchange
	}: Props = $props();

	let containerEl: HTMLTextAreaElement | null = $state(null);
	let editorInstance: any = null;
	let isReady = $state(false);

	function loadScript(src: string): Promise<void> {
		return new Promise((resolve, reject) => {
			if (window.tinymce) {
				resolve();
				return;
			}
			const existing = document.querySelector(`script[src="${src}"]`);
			if (existing) {
				existing.addEventListener('load', () => resolve());
				return;
			}
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => resolve();
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	onMount(async () => {
		try {
			await loadScript('/tinymce/tinymce.min.js');

			if (!window.tinymce) return;

			window.tinymce.init({
				target: containerEl,
				base_url: '/tinymce',
				suffix: '.min',
				skin: 'oxide-dark',
				content_css: 'dark',
				min_height: height,
				max_height: 700,
				autoresize_bottom_margin: 20,
				placeholder,
				plugins: ['link', 'lists', 'code', 'table', 'autoresize', 'wordcount'],
				toolbar:
					'undo redo | blocks | bold italic underline | bullist numlist | link blockquote code | table | removeformat',
				menubar: false,
				branding: false,
				promotion: false,
				setup: (editor: any) => {
					editorInstance = editor;

					editor.on('init', () => {
						isReady = true;
						if (value) {
							editor.setContent(value);
						}
					});

					editor.on('change input undo redo SetContent', () => {
						const content = editor.getContent();
						value = content;
						if (onchange) onchange(content);
					});
				}
			});
		} catch (err) {
			console.error('Failed to initialize self-hosted TinyMCE:', err);
		}
	});

	// Keep editor in sync if value changed externally
	$effect(() => {
		if (editorInstance && isReady) {
			const current = editorInstance.getContent();
			if (value !== current) {
				editorInstance.setContent(value || '');
			}
		}
	});

	onDestroy(() => {
		if (editorInstance) {
			try {
				editorInstance.destroy();
			} catch (_) {}
			editorInstance = null;
		}
	});
</script>

<div class="tinymce-editor-wrapper w-full">
	{#if label}
		<label
			for={id}
			class="mb-2 block font-mono text-xs font-semibold tracking-wider text-text-muted uppercase"
		>
			{label}
			{#if required}<span class="text-[#ea9c5a]">*</span>{/if}
		</label>
	{/if}

	<div
		class="relative rounded border border-border-subtle bg-surface focus-within:border-[#ea9c5a]"
	>
		<!-- Hidden textarea fallback / mounting target -->
		<textarea {id} bind:this={containerEl} class="hidden" {required}>{value}</textarea>

		{#if !isReady}
			<div class="flex items-center justify-center p-8 font-mono text-xs text-text-muted">
				<span class="mr-2 inline-block animate-pulse">●</span> Loading self-hosted editor...
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.tox-tinymce) {
		border: none !important;
		border-radius: 4px !important;
		background: #180e05 !important;
	}
	:global(.tox .tox-toolbar, .tox .tox-toolbar__overflow, .tox .tox-toolbar__primary) {
		background: #241407 !important;
		border-bottom: 1px solid rgba(234, 156, 90, 0.2) !important;
	}
	:global(.tox .tox-tbtn) {
		color: #e5d8cc !important;
	}
	:global(.tox .tox-tbtn:hover) {
		background: rgba(234, 156, 90, 0.15) !important;
		color: #ea9c5a !important;
	}
	:global(.tox .tox-statusbar) {
		background: #180e05 !important;
		border-top: 1px solid rgba(234, 156, 90, 0.15) !important;
		color: #a89485 !important;
		font-family: monospace !important;
		font-size: 11px !important;
	}
</style>
