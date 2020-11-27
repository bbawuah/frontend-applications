<script lang="ts">
	import { geoCodeReverse, getDateFormat, getPaymentData } from '../../functions/functions';
	import BarChart from '../BarChart/BarChart.svelte';
	import type { AreaType, D3Data, SellingPoints } from '../../types/Types';
	import { PaymentMethods } from '../../types/Types';
	export let data: SellingPoints;
	export let paymentData: D3Data[];
	export let year: string = getDateFormat(data.areas[0].startdatesellingpoint);

	console.log(data);

	let filteredPaymentArray: D3Data[] = [];

	paymentData.forEach((pData) => {
		const filter = pData.areas.filter((area) => area.areamanagerid === data.area);
		filteredPaymentArray.push({
			paymentMethodTitle: pData.paymentMethodTitle,
			areas: filter,
		});
	});

	const barChartData = filteredPaymentArray.filter((data) => data.areas.length > 0);
	const rawPaymentArray = barChartData.map((d) => d.paymentMethodTitle);

	const cleanPaymentArray = rawPaymentArray.filter((d) => d !== undefined);
	let locatie;

	(async () => {
		locatie = await geoCodeReverse(
			data.areas[0].location.longitude,
			data.areas[0].location.latitude,
		);
	})();
</script>

<style>
	.tooltip {
		background-color: #fff;
		padding: 7px;
		text-shadow: #f5f5f5 0 1px 0;
		font: 15px Helvetica Neue;
		border: 2.5px solid;
		border-color: black;
		border-radius: 3px;
		opacity: 0.95;
		position: absolute;
		top: 0;
		left: 0;
		box-shadow: rgba(0, 0, 0, 0.3) 0 2px 10px;
	}
</style>

<div class="tooltip">
	<h3>Gebied {data.area}: {locatie}</h3>
	<p>In {year} zijn er in dit gebied {data.areas.length} verkooppunten bijgekomen.</p>
	{#if cleanPaymentArray.length > 0}
		<p>De bekende betaalopties deze gebieden zijn:</p>
		<ul>
			{#each cleanPaymentArray as payment}
				<li>{payment}</li>
			{/each}
		</ul>
		<BarChart data={barChartData} />
	{:else}
		<p>Er zijn helaas geen betaalopties bekend van dit gebied..</p>
	{/if}
</div>
