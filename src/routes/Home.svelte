<script lang="ts">
	import Container from '../core/Container.svelte';
	import Image from '../core/Image.svelte';
	import type { AreaType, D3Data, SellingPoints } from '../types/Types';
	import { PaymentMethods, AreaManagerID } from '../types/Types';
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<Container
		title="Wat gebeurt er met de betalingsmethodes, als de verkooppunten stijgen/dalen?"
		paragraph="De wereld is continu in verandering. Technologisering zorgt ervoor dat we steeds op makkelijkere manieren kunnen betalen voor diensten. Dit heeft ook gevolgen op de verkooppunten van de parkeergarage. Tegenwoordig is het zelfs mogelijk om je mobiel te scannen op het moment dat je in een garage rijdt. Daalt het aantal verkooppunten in Nederland door technologisering? En zijn er steeds minder plekken waar we contant kunnen betalen?"
		to="/verkooppunten">
		<Image src="assets/chilling-at-car.svg" />
	</Container>

	<!-- {#await data}
		<p>loaded bar chart..</p>
	{:then data}
		<BarChart data={data.paymentData} />
		<GeoMap sellingPoints={data.cleanFormattedDataSet} paymentData={data.paymentData} />
	{/await} -->
</main>
