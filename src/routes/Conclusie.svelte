<script lang="ts">
	import Container from '../core/Container.svelte';
	import Image from '../core/Image.svelte';
	import Layout from '../core/Layout.svelte';
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<Layout>
	<main>
		<Container
			title="Conclusie?"
			paragraph="Vanaf 2014 is er een duidelijke toename in het aantal verkooppunten. Hier kunnen verschillende redenen voor zijn. De vraag of de nieuwe verkooppunten, oude betaalopties achterwege laten, kunnen we helaas nog niet beantwoorden. Wel zien we een opwaartse trend van nieuwe betaalopties die stijgen in populariteit."
			secondBtnRoute="/geo"
			secondButtonText="Terug">
			<Image src="assets/payments.svg" />
		</Container>
	</main>
</Layout>
