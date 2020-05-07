<script>
	import Flex from '../ui/Flex.svelte';
	import DateInput from './DateInput.svelte';
	import PlaceInput from './PlaceInput.svelte';

	// TODO: uncomment default props before merge, while put default values at index.html
	export let source; // = 'https://www.reservamos.mx/api/v2/places';

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
		<PlaceInput
			id="origin-field"
			label="Origen"
			bind:value={origin}
			source={source}
		/>
	</Flex>
	<Flex>
		<PlaceInput
			id="destination-field"
			label="Destino"
			bind:value={destination}
			source={source}
		/>
	</Flex>
	<Flex>
		<DateInput
			id="departs-field"
			label="Salida"
			bind:value={departs}
		/>
	</Flex>
	<Flex>
		<DateInput
			id="returns-field"
			label="Regreso"
			bind:value={returns}
		/>
	</Flex>
</Flex>

