<script>
  import { createEventDispatcher } from 'svelte';
	import validateForm from '../utils/validateForm';
	import makeRedirectUrl from '../utils/makeRedirectUrl';
	import Flex from '../ui/Flex.svelte';
	import Button from '../ui/Button.svelte';
	import DateInput from './DateInput.svelte';
  import PlaceInput from './PlaceInput.svelte';
  
  const dispatch = createEventDispatcher();

	// props
	export let config;

	// form fields

	let origin = null;
	let destination = null;
	let departs = null;
	let returns = null;
  let tripType = 'oneWay';
  let adults = 1;
  let children = 0;
  let infants = 0;

	$: fields = {
		origin,
		destination,
		departs,
		returns,
		tripType,
    adults,
    children,
    infants,
	};

	// handlers
	let errors = {};
	function handleSubmit () {
		errors = validateForm(fields);
		const hasErrors = Object.values(errors).some(error => error);
    if (hasErrors) return;
    
    dispatch('submit', fields);
	}

	$: console.log(origin, destination, departs, returns);
</script>

<Flex>
	<Flex>
		<PlaceInput
			id="origin-field"
			label="Origen"
			source={config.source}
			hasError={errors.origin}
			bind:value={origin}
		/>
	</Flex>
	<Flex>
		<PlaceInput
			id="destination-field"
			label="Destino"
			source={config.source}
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
		<Button on:click={handleSubmit}>Buscar</Button>
	</Flex>
</Flex>

