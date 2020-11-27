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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<Layout>
	<main>
		{#await data}
			<p>loading map..</p>
		{:then data}
			<Container
				title="Hoeveel verkooppunten komen er bij per jaar?"
				paragraph="Vanaf 2014 is er een forse stijging in het aantal verkooppunten. We zouden in potentie erachter kunnen komen wat de opkomende betaalopties zijn. Helaas is de dataset van het RDW niet volledig, van sommige verkooppunten is niet bekend welke betaalopties."
				firstBtnRoute="/betaalopties"
				firstButtonText="Ga terug"
				secondBtnRoute="/conclusie"
				secondButtonText="Conclusie">
				<form>
					<select
						bind:value={selected}
						on:change={(event) => {
							selected = event.currentTarget.value;
							console.log(selected);
						}}>
						<option value="2020">2020</option>
						<option value="2019">2019</option>
						<option value="2018">2018</option>
						<option value="2017">2017</option>
						<option value="2016">2016</option>
						<option value="2015">2015</option>
						<option value="2014">2014</option>
						<option value="2013">2013</option>
						<option value="2012">2012</option>
						<option value="2011">2011</option>
						<option value="2010">2010</option>
						<option value="2009">2009</option>
						<option value="2008">2008</option>
						<option value="2007">2007</option>
						<option value="2007">2007</option>
						<option value="2006">2006</option>
						<option value="2005">2005</option>
						<option value="2004">2004</option>
					</select>
				</form>
				{#if selected === '2020'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2019'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2018'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2017'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2016'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2015'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2014'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2013'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2012'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2011'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2010'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2009'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2008'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2007'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2006'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2005'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2004'}
					<GeoMap
						sellingPoints={startDateData(data.cleanFormattedDataSet, selected)}
						paymentData={data.paymentData} />
				{:else if selected === '2003'}
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
