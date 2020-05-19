<script>
	import validateForm from '../utils/validateForm';
	import makeRedirectUrl from '../utils/makeRedirectUrl';
	import Flex from '../ui/Flex.svelte';
	import Button from '../ui/Button.svelte';
	import DateInput from './DateInput.svelte';
	import PlaceInput from './PlaceInput.svelte';

	// props

	// TODO: uncomment default props before merge, while set defaults at index.html
	export let source; // = 'https://www.reservamos.mx/api/v2/places';
	export let funnel = 'https://viaje.resertravel.com/';
	$: config = { funnel };

	// form fields

	let origin = null;
	let destination = null;
	let departs = null;
	let returns = null;
	let tripType = 'oneWay';
	let passengers = {
		adults: 1,
	};

	$: fields = {
		origin,
		destination,
		departs,
		returns,
		passengers,
		tripType,
	};

	// handlers
	let errors = {};
	function onSubmit () {
		errors = validateForm(fields);
		const hasErrors = Object.values(errors).some(error => error);
		if (hasErrors) return;

		const url = makeRedirectUrl(fields, config);
		window.open(url);
	}

	$: console.log(origin, destination, departs, returns);
</script>

<Flex>
	<Flex>
		<PlaceInput
			id="origin-field"
			label="Origen"
			source={source}
			hasError={errors.origin}
			bind:value={origin}
		/>
	</Flex>
	<Flex>
		<PlaceInput
			id="destination-field"
			label="Destino"
			source={source}
			hasError={errors.destination}
			bind:value={destination}
		/>
	</Flex>
	<Flex>
		<DateInput
			id="departs-field"
			label="Salida"
			hasError={errors.departs}
			bind:value={departs}
		/>
	</Flex>
	<Flex>
		<DateInput
			id="returns-field"
			label="Regreso"
			hasError={errors.returns}
			bind:value={returns}
		/>
	</Flex>
	<Flex>
		<Button on:click={onSubmit}>Buscar</Button>
	</Flex>
</Flex>

