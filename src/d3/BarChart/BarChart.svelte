<script lang="ts">
	import { onMount } from 'svelte';
	import d3 from 'd3';
	import type { D3Data } from '../../types/Types';

	let svg: any;
	export let parkingData: D3Data[];
	onMount(() => {
		const margin = { top: 20, right: 20, bottom: 30, left: 110 },
			width = 700 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		// set the ranges
		const y = d3.scaleBand().range([height, 0]).padding(0.1);

		const x = d3.scaleLinear().domain([0, 300]).range([0, width]);

		d3.select(svg)
			.classed('container', true)
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// format the data
		parkingData.forEach((data) => {
			data.areas.length = +data.areas.length;
		});

		// Scale the range of the data in the domains
		x.domain([0, d3.max(parkingData, (data) => data.areas.length)]);
		y.domain(parkingData.map((data) => data.paymentMethodTitle));

		// append the rectangles for the bar chart
		svg.selectAll('.bar')
			.data(parkingData)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('width', (data) => x(data.areas.length))
			.attr('y', (data) => y(data.paymentMethodTitle))
			.attr('height', y.bandwidth());

		// x Axis
		svg.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.call(d3.axisBottom(x));

		// y Axis
		svg.append('g').call(d3.axisLeft(y));
	});
</script>

<style>
	.container {
		width: 700px;
		height: 500px;
		/* padding-bottom: 1rem; */
		border-radius: 5px;
	}

	.bar {
		fill: #8d99ae;
	}
</style>

<main>
	<h1>Hier komt een barchart</h1>
	<svg bind:this={svg} />
</main>
