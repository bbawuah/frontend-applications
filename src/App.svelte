<script>
	import { Router, Link, Route } from 'svelte-routing';
	import Home from './routes/Home.svelte';
	import VerkoopPunten from './routes/VerkoopPunten.svelte';

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
	</div>
</Router>
