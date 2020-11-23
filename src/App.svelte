<script lang="ts">
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
	import BarChart from './d3/BarChart/BarChart.svelte';
	import type { AreaType, D3Data } from './types/Types';
	import { PaymentMethods } from './types/Types';
	let data: Promise<D3Data[]> = loadPaymentMethodData();

	async function loadPaymentMethodData() {
		const paymentMethodsResponse = await fetch(
			'https://opendata.rdw.nl/resource/r3rs-ibz5.json',
		);
		const json = await paymentMethodsResponse.json();
		const paymentMethods = Object.values(PaymentMethods);

		const margin = { top: 20, right: 20, bottom: 30, left: 110 },
			width = 700 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

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
		<p>loaded..</p>
	{:then data}
		<BarChart {data} />
	{/await}
</main>
