<svelte:options tag="search-component" />
<script>
	import PlaceInput from './PlaceInput.svelte';
	import delay from '../utils/delay';

	export let source = 'www.reservamos.mx/api/v2/places';

	let origin = null;
	let destination = null;
	let departs = null;
	let returns = null;
</script>

<div>
	<PlaceInput label="Origen" bind:value={origin} source={source} />
	<PlaceInput label="Destino" bind:value={destination} source={source} />
</div>

