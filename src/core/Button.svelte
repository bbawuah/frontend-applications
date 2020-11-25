<script lang="ts">
	import { Link } from 'svelte-routing';
	export let to: string;
	export let text: string;
</script>

<style>
	:global(a) {
		text-decoration: none;
		background-color: #7679b4;
		padding: 1rem;
		color: rgb(248, 248, 248);
		border-radius: 5px;
		transition: 0.5s ease-in-out;
	}

	:global(a):visited {
		color: rgb(248, 248, 248);
	}
	:global(a):hover {
		position: relative;
		top: -3px;
	}
</style>

<Link class="button" {to}>{text}</Link>
