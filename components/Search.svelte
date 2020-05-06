<script>
	import Flex from '../ui/Flex.svelte';
	import PlaceInput from './PlaceInput.svelte';
	import delay from '../utils/delay';

	export let source = 'www.reservamos.mx/api/v2/places';

	let origin = null;
	let destination = null;
	let departs = null;
	let returns = null;

	$: {
		console.log(origin, destination, departs, returns);
	}
</script>

<Flex>
	<Flex>
		<PlaceInput label="Origen" bind:value={origin} source={source} />
	</Flex>
	<Flex>
		<PlaceInput label="Destino" bind:value={destination} source={source} />
	</Flex>
	<Flex>
		<input type="date" bind:value={departs} />
	</Flex>
	<Flex>
		<input type="date" bind:value={returns} />
	</Flex>
</Flex>

