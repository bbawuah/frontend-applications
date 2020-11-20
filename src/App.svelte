<script lang="ts">
	import { onMount } from 'svelte';
	import BarChart from './d3/BarChart/BarChart.svelte';
	import { AreaType, D3Data, PaymentMethods } from './types/Types';
	export let name: string;
	let data: D3Data[];

	onMount(async () => {
		const paymentMethodsResponse = await fetch(
			'https://opendata.rdw.nl/resource/r3rs-ibz5.json',
		);
		const paymentMethodsJson = await paymentMethodsResponse.json();

		const paymentMethods = Object.values(PaymentMethods);

		let paymentData: D3Data[] = paymentMethods.map((payment) => {
			const paymentMethodAreas = paymentMethodsJson.filter(
				(item: AreaType) => item.paymentmethod.toUpperCase() === payment,
			);
			return {
				paymentMethodTitle: payment,
				areas: paymentMethodAreas,
			};
		});

		data = paymentData;
	});
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
	<h1>Hello {name}!</h1>
	<p>
		Visit the
		<a href="https://svelte.dev/tutorial">Svelte tutorial</a>
		to learn how to build Svelte apps.
	</p>
	<BarChart parkingData={data} />
</main>
