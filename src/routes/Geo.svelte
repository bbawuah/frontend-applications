<script lang="ts">
	import GeoMap from '../d3/Map/GeoMap.svelte';
	import Container from '../core/Container.svelte';
	import type { AreaType, D3Data, SellingPoints } from '../types/Types';
	import { PaymentMethods, AreaManagerID } from '../types/Types';

	let data: Promise<{
		cleanFormattedDataSet: SellingPoints[];
		paymentData: D3Data[];
	}> = loadData();

	async function loadData() {
		// Payments
		const paymentMethodsResponse = await fetch(
			'https://opendata.rdw.nl/resource/r3rs-ibz5.json',
		);
		const json = await paymentMethodsResponse.json();
		const paymentMethods = Object.values(PaymentMethods);

		let paymentData: D3Data[] = paymentMethods.map((payment) => {
			const paymentMethodAreas = json.filter(
				(item: AreaType) => item.paymentmethod.toUpperCase() === payment,
			);
			return {
				paymentMethodTitle: payment,
				areas: paymentMethodAreas,
			};
		});

		// SellingPoints
		const sellingPointsResponse = await fetch(
			'https://opendata.rdw.nl/resource/cgqw-pfbp.json',
		);
		const sellingPointsJson = await sellingPointsResponse.json();

		const areas = Object.values(AreaManagerID);

		const formattedArraySellingPoints: SellingPoints[] = areas.map((area) => {
			const paymentMethodAreas = sellingPointsJson.filter(
				(item: any) => item.areamanagerid === area,
			);

			return {
				area: area,
				areas: paymentMethodAreas,
			};
		});

		const cleanFormattedDataSet = formattedArraySellingPoints.filter(
			(item) => item.areas.length > 0,
		);

		return {
			cleanFormattedDataSet,
			paymentData,
		};
	}
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
	{#await data}
		<p>loaded bar chart..</p>
	{:then data}
		<Container
			title="Wat gebeurt er met de betalingsmethodes, als de verkooppunten stijgen/dalen?"
			paragraph="De wereld is continu in verandering. Technologisering zorgt ervoor dat we steeds op makkelijkere manieren kunnen betalen voor diensten. Dit heeft ook gevolgen op de verkooppunten van de parkeergarage. Tegenwoordig is het zelfs mogelijk om je mobiel te scannen op het moment dat je in een garage rijdt. Daalt het aantal verkooppunten in Nederland door technologisering? En zijn er steeds minder plekken waar we contant kunnen betalen?">
			<GeoMap sellingPoints={data.cleanFormattedDataSet} paymentData={data.paymentData} />
		</Container>
	{/await}
</main>
