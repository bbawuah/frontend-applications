<script lang="ts">
	import Container from '../core/Container.svelte';
	import Layout from '../core/Layout.svelte';
	import type { D3Data } from '../types/Types';
	import { PaymentMethods, CreditCards } from '../types/Types';
	import { getPaymentData, parseCreditCardData } from '../functions/functions';
	import Percentages from '../d3/Percentages/Percentages.svelte';

	let data: Promise<D3Data[]> = loadData();
	let countOfCreditCards: number;
	let coinsCount: number;
	let bankNotesCount: number;
	let cash: number;
	let totalCount: number;

	async function loadData() {
		// Payments
		const paymentMethodsResponse = await fetch(
			'https://opendata.rdw.nl/resource/r3rs-ibz5.json',
		);
		const json = await paymentMethodsResponse.json();
		const paymentMethods = Object.values(PaymentMethods);

		totalCount = json.length;

		const paymentData: D3Data[] = getPaymentData(paymentMethods, json);

		paymentData.forEach((data) => {
			if (data.paymentMethodTitle === 'CASH') {
				cash = data.areas.length;
			} else if (data.paymentMethodTitle === 'COINS') {
				coinsCount = data.areas.length;
			} else if (data.paymentMethodTitle === 'BANKNOTES') {
				bankNotesCount = data.areas.length;
			}
		});

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
				title="Percentages van het contante betaalopties"
				paragraph="De cijfers vertellen dat er relatief weinig verkooppunten zijn waar men contant kan betalen."
				firstBtnRoute="/verkooppunten"
				firstButtonText="Ga terug"
				secondBtnRoute="/geo"
				secondButtonText="Ga door">
				<!-- <p>Totaal aantal creditcards: {countOfCreditCards}</p> -->
				<Percentages coins={coinsCount} banknotes={bankNotesCount} {totalCount} />
			</Container>
		{/await}
	</main>
</Layout>
