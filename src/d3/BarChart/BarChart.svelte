<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import type { D3Data } from '../../types/Types';

	let el: any;
	export let data: D3Data[];

	const margin = { top: 20, right: 20, bottom: 30, left: 110 },
		width = 700 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	const y = d3.scaleBand().range([height, 0]).padding(0.1);
	const x = d3.scaleLinear().domain([0, 300]).range([0, width]);

	// format the data
	data.forEach((d) => {
		d.areas.length = +d.areas.length;
	});

	// Scale the range of the data in the domains
	x.domain([0, d3.max(data, (d) => d.areas.length)]);
	y.domain(data.map((d) => d.paymentMethodTitle));

	onMount(() => {
		console.log(data);
		d3.select(el)
			.selectAll('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		d3.select(el)
			.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('width', (data) => x(data.areas.length))
			.attr('y', (data) => y(data.paymentMethodTitle))
			.attr('height', y.bandwidth());

		// x Axis
		d3.select(el)
			.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.call(d3.axisBottom(x));

		// y Axis
		d3.select(el).append('g').call(d3.axisLeft(y));
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

<h1>Hier komt een barchart</h1>
<svg bind:this={el} class="container" />
