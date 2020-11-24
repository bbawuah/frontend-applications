<script lang="ts">
	import { geoMercator, geoPath } from 'd3-geo';
	import { onMount } from 'svelte';
	import { feature } from 'topojson';
	import { tweened } from 'svelte/motion';
	import { scaleLinear, scaleSqrt } from 'd3-scale';
	import type { SellingPoints, D3Data } from '../../types/Types';

	let data: any;

	export let sellingPoints: SellingPoints[];
	export let paymentData: D3Data[];

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

			return geoProjection(project).scale(1).translate([0, 0]);
		};
	};

	const currentProj = tweened(projection, {
		duration: 1000,
		interpolate: projectionTween,
	});

	$: path = geoPath().projection($currentProj);

	const opacity = tweened(0, {
		duration: 1000,
	});

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

	const circleColorScale = scaleSqrt()
		.domain([
			0,
			Math.max.apply(
				Math,
				sellingPoints.map(function (sellingPoint) {
					return sellingPoint.areas.length;
				}),
			),
		])
		.range(['#ffffff', '#5555ff']);
</script>

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

<svg width="960" height="500">
	<path class="borders" d={data} />
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
			fill="green" />
	{/each}
</svg>
