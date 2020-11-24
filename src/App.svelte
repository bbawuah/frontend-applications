<script lang="ts">
	import BarChart from './d3/BarChart/BarChart.svelte';
	import GeoMap from './d3/Map/GeoMap.svelte';
	import type { AreaType, D3Data, SellingPoints } from './types/Types';
	import { PaymentMethods, AreaManagerID } from './types/Types';
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

	async function loadPaymentMethodData() {
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
		return paymentData;
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
		<BarChart data={data.paymentData} />
		<GeoMap sellingPoints={data.cleanFormattedDataSet} paymentData={data.paymentData} />
	{/await}
</main>
