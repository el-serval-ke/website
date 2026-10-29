<script lang="ts">
	interface Props {
		class?: string;
		size?: number | string;
	}

	let { class: className = 'w-7 h-8 text-[#ea9c5a]', size }: Props = $props();
</script>

<img
	src="/images/logos/el-serval-logo-front-transparent-bg.png"
	alt="El Serval KE Logo"
	class={className}
	style={size ? `width: ${size}px; height: ${size}px;` : ''}
/>
