<script lang="ts">
	import Button from './Button.svelte';
	export let title: string;
	export let paragraph: string;
	export let firstBtnRoute: string;
	export let secondBtnRoute: string;
	export let firstButtonText: string;
	export let secondButtonText: string;
</script>

<style>
	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		overflow-x: hidden;
	}

	.wrapper {
		display: flex;
		justify-content: space-evenly;
		min-height: 700px;
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

	.button-container {
		display: flex;
		justify-content: space-evenly;
		align-self: center;
		width: 300px;
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
	<div class="button-container">
		{#if !firstBtnRoute && !firstButtonText}
			<Button to={secondBtnRoute} text={secondButtonText} />
		{:else if !secondBtnRoute && !secondButtonText}
			<Button to={firstBtnRoute} text={firstButtonText} />
		{:else}
			<Button to={firstBtnRoute} text={firstButtonText} />
			<Button to={secondBtnRoute} text={secondButtonText} />
		{/if}
	</div>
</main>
