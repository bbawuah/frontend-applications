<script>
	import { Router, Link, Route } from 'svelte-routing';
	import Home from './routes/Home.svelte';
	import VerkoopPunten from './routes/VerkoopPunten.svelte';
	import Geo from './routes/Geo.svelte';
	import Conclusie from './routes/Conclusie.svelte';
	import BetaalOpties from './routes/BetaalOpties.svelte';

	export let url = '';
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
		<Route path="/conclusie">
			<Conclusie />
		</Route>
		<Route path="/betaalopties">
			<BetaalOpties />
		</Route>
	</div>
</Router>
