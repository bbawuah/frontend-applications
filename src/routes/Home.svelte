<script lang="ts">
	import Container from '../core/Container.svelte';
	import Image from '../core/Image.svelte';
	import Layout from '../core/Layout.svelte';
	import PieChart from '../d3/Percentages/Percentages.svelte';
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
		<Container
			title="Wat gebeurt er met de betaalopties, als er nieuwe verkooppunten bijkomen?"
			paragraph="De wereld is continu in verandering. Technologisering zorgt ervoor dat we steeds op makkelijkere manieren kunnen betalen voor diensten. Dit heeft ook gevolgen op de verkooppunten van de parkeergarage. Daalt het aantal verkooppunten in Nederland door technologisering? En zijn er steeds minder plekken waar we contant kunnen betalen?"
			secondBtnRoute="/verkooppunten"
			secondButtonText="Ga door">
			<Image src="assets/chilling-at-car.svg" />
		</Container>
	</main>
	<PieChart />
</Layout>
