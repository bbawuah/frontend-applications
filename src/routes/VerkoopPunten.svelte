<script lang="ts">
	import BarChart from '../d3/BarChart/BarChart.svelte';
	import Container from '../core/Container.svelte';
	import Layout from '../core/Layout.svelte';
	import type { D3Data } from '../types/Types';
	import { PaymentMethods, CreditCards } from '../types/Types';
	import { getPaymentData, parseCreditCardData } from '../functions/functions';

	let data: Promise<D3Data[]> = loadData();
	let countOfCreditCards: number;

	async function loadData() {
		// Payments
		const paymentMethodsResponse = await fetch(
			'https://opendata.rdw.nl/resource/r3rs-ibz5.json',
		);
		const json = await paymentMethodsResponse.json();
		const paymentMethods = Object.values(PaymentMethods);

		const paymentData: D3Data[] = getPaymentData(paymentMethods, json);

		const creditCardData: D3Data[] = getPaymentData(Object.values(CreditCards), json);

		countOfCreditCards = parseCreditCardData(creditCardData);
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
				title="Welke betaalopties kennen we eigenlijk?"
				paragraph="Op de grafiek is af te lezen dat Coins in deze digitale wereld nog altijd een populaire betaalopties zijn. Mobiel, VPAY en DIP-TAP&GO zijn methodes die nog niet zoveel beschikbaar zijn in vergelijking met de rest. Wel zitten deze methodes in een trend vanwege het gebruiksgemak."
				firstBtnRoute="/"
				firstButtonText="Ga terug"
				secondBtnRoute="/geo"
				secondButtonText="Ga door">
				<p>Totaal aantal creditcards: {countOfCreditCards}</p>
				<BarChart {data} />
			</Container>
		{/await}
	</main>
</Layout>
