<script>
	import { Router, Link, Route } from 'svelte-routing';
	import Home from './routes/Home.svelte';
	import VerkoopPunten from './routes/VerkoopPunten.svelte';
	import Geo from './routes/Geo.svelte';

	export let url = 'http://localhost:5000' || 'https://goofy-galileo-4aec17.netlify.app';
</script>

<Router {url}>
	<div>
		<Route path="/">
			<Home />
		</Route>
		<Route path="/verkooppunten">
			<VerkoopPunten />
		</Route>
		<Route path="/geo">
			<Geo />
		</Route>
	</div>
</Router>
