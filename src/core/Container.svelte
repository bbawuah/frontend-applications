<script lang="ts">
	import { Link } from 'svelte-routing';
	export let title: string;
	export let paragraph: string;
	export let to: string;
</script>

<style>
	main {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
	}

	.wrapper {
		display: flex;
		justify-content: space-evenly;
	}

	.text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 700px;
		text-align: left;
	}
	h1 {
		font-size: 3rem;
	}

	p {
		font-size: 1rem;
	}

	.button {
		align-self: center;
		width: max-content;
	}
</style>

<main>
	<div class="wrapper">
		<div class="text">
			<h1>{title}</h1>
			<p>{paragraph}</p>
		</div>
		<div class="text">
			<slot />
		</div>
	</div>
	<Link class="button" {to}>Get started</Link>
</main>
