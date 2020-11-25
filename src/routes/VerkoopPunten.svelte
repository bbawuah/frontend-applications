<script lang="ts">
	import BarChart from '../d3/BarChart/BarChart.svelte';
	import Container from '../core/Container.svelte';
	import Layout from '../core/Layout.svelte';
	import type { AreaType, D3Data, SellingPoints } from '../types/Types';
	import { PaymentMethods, AreaManagerID } from '../types/Types';

	let data: Promise<D3Data[]> = loadData();

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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<Layout>
	<main>
		{#await data}
			<p>loaded bar chart..</p>
		{:then data}
			<Container
				title="Hoeveel verkooppunten zijn er op nu ten opzichte van vijf jaar geleden?"
				paragraph="Om antwoord te kunnen geven op de vraag moeten we eerst in kaart brengen wat het aantal verkooppunten is in Nederland op dit moment en of er sprake is van een stijging of een daling."
				firstBtnRoute="/"
				firstButtonText="Ga terug"
				secondBtnRoute="/geo"
				secondButtonText="Ga door">
				<BarChart {data} />
			</Container>
		{/await}
	</main>
</Layout>
