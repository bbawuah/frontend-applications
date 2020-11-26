<script lang="ts">
	import type { D3Data, SellingPoints } from '../../types/Types';

	export let data: SellingPoints;
	export let paymentData: D3Data[];

	const rawPaymentArray = paymentData.map((pData) => {
		const filter = pData.areas.filter((area) => area.areamanagerid === data.area);
		const methods = filter.map((d) => d.paymentmethod);
		return Array.from(new Set(methods));
	});

	const cleanPaymentArray = rawPaymentArray.filter((d) => d.length !== 0);
	console.log(cleanPaymentArray);
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
		box-shadow: rgba(0, 0, 0, 0.3) 0 2px 10px;
	}
</style>

<div class="tooltip">
	<p>Tooltip!!!</p>
</div>
