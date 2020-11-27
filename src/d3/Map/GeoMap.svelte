<script lang="ts">
	import * as d3 from 'd3';
	import { geoMercator, geoPath, geoProjection } from 'd3-geo';
	import { onMount } from 'svelte';
	import { feature } from 'topojson';
	import { tweened } from 'svelte/motion';
	import { scaleSqrt } from 'd3-scale';
	import type { SellingPoints, D3Data, Area } from '../../types/Types';
	import ToolTip from '../ToolTip/ToolTip.svelte';

	let data: any;
	let hideTooltip: boolean = true;
	let toolTipData: string[][];

	export let sellingPoints: SellingPoints[];
	export let paymentData: D3Data[];

	let total: Area[] = [];

	sellingPoints.forEach((sellingPoint) => {
		total = [...total, ...sellingPoint.areas];
	});

	let currentSellingPoint: SellingPoints;

	const projection = geoMercator().scale(6000).center([5.116667, 52.17]);

	onMount(async function () {
		const response = await fetch('https://cartomap.github.io/nl/wgs84/provincie_2020.topojson');
		const json = await response.json();
		const land = feature(json, json.objects.provincie_2020);
		data = path(land);
	});

	const projectionTween = (projection0, projection1) => {
		return function (t) {
			function project(λ, φ) {
				(λ *= 180 / Math.PI), (φ *= 180 / Math.PI);
				var p0 = projection0([λ, φ]),
					p1 = projection1([λ, φ]);
				if (!p0 || !p1) return [0, 0];
				return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
			}

			return geoProjection(project as any)
				.scale(1)
				.translate([0, 0]);
		};
	};

	const currentProj = tweened(projection, {
		duration: 1000,
		interpolate: projectionTween,
	});

	$: path = geoPath().projection($currentProj);

	const circleScale = scaleSqrt()
		.domain([
			0,
			Math.max.apply(
				Math,
				sellingPoints.map(function (sellingPoint) {
					return sellingPoint.areas.length;
				}),
			),
		])
		.range([2, 15]);
</script>

<!-- svelte-ignore a11y-no-onchange -->
<style>
	svg {
		width: 960px;
		height: 500px;
	}
	.border {
		stroke: #444444;
		fill: #cccccc;
	}
</style>

<div class="map-container">
	<h4>Totaal aantal gebieden: {sellingPoints.length}</h4>
	<h4>Totaal aantal verkooppunten: {total.length}</h4>

	<svg>
		<path class="border" d={data} />
		{#each sellingPoints as sellingPoint}
			<circle
				class="city"
				cx={$currentProj([
					parseFloat(sellingPoint.areas[0].location.longitude),
					parseFloat(sellingPoint.areas[0].location.latitude),
				])[0]}
				cy={$currentProj([
					parseFloat(sellingPoint.areas[0].location.longitude),
					parseFloat(sellingPoint.areas[0].location.latitude),
				])[1]}
				r={circleScale(sellingPoint.areas.length)}
				fill="#2856B8"
				stroke-width="3"
				fill-opacity="0.4"
				on:mouseover={(event) => {
					d3.select(event.currentTarget).style('fill', 'black');

					const rawPaymentArray = paymentData.map((pData) => {
						const filter = pData.areas.filter((area) => area.areamanagerid === data.area);
						const methods = filter.map((d) => d.paymentmethod);
						return Array.from(new Set(methods));
					});

					const cleanPaymentArray = rawPaymentArray.filter((d) => d.length !== 0);

					hideTooltip = false;
					currentSellingPoint = sellingPoint;
					toolTipData = cleanPaymentArray;
				}}
				on:mouseout={(event) => {
					d3.select(event.currentTarget).style('fill', '#2856B8');

					hideTooltip = true;
				}} />
		{/each}
	</svg>

	{#if hideTooltip !== true}
		<ToolTip data={currentSellingPoint} {paymentData} />
	{/if}
</div>
