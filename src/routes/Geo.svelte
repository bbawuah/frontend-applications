<script lang="ts">
	import GeoMap from '../d3/Map/GeoMap.svelte';
	import Container from '../core/Container.svelte';
	import Layout from '../core/Layout.svelte';
	import type { AreaType, D3Data, SellingPoints } from '../types/Types';
	import { PaymentMethods, AreaManagerID } from '../types/Types';
	import { startDateData } from '../functions/functions';

	let data: Promise<{
		cleanFormattedDataSet: SellingPoints[];
		paymentData: D3Data[];
	}> = loadData();
	let selected: string;

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

<!-- svelte-ignore a11y-no-onchange -->
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

<Layout>
	<main>
		{#await data}
			<p>loaded bar chart..</p>
		{:then data}
			<Container
				title="Hebben verkooppunten nieuwe betalingsopties?"
				paragraph="Het is interessant om in kaart te brengen welke steden gebruik maken van de nieuwste betalingsopties. Zijn er steden die op dit gebied nog achterlopen op de rest?"
				firstBtnRoute="/verkooppunten"
				firstButtonText="Ga terug">
				<form>
					<select
						bind:value={selected}
						on:change={(event) => {
							selected = event.currentTarget.value;
							console.log(selected);
						}}>
						<option value="payment">verkooppunten</option>
						<option value="2019">2019</option>
						<option value="2009">2009</option>
					</select>
				</form>
				{#if selected === 'payment'}
					<GeoMap
						sellingPoints={data.cleanFormattedDataSet}
						paymentData={data.paymentData} />
				{:else if selected === '2019'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{/if}
			</Container>
		{/await}
	</main>
</Layout>
