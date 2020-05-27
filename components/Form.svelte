<script>
  import { createEventDispatcher } from 'svelte';
	import validateFields from '../utils/validateFields';
	import serializeFields from '../utils/serializeFields';
	import makeRedirectUrl from '../utils/makeRedirectUrl';
	import Flex from '../ui/Flex.svelte';
	import Button from '../ui/Button.svelte';
	const DateInputPromise = import('./DateInput.svelte').then(module => module.default);
	const PlaceInputPromise = import('./PlaceInput.svelte').then(module => module.default);
  
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
		errors = validateFields(fields);
		const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return;    
    dispatch('submit', serializeFields(fields));
	}

	$: console.log(origin, destination, departs, returns);
</script>

<Flex>
	<Flex>
		{#await PlaceInputPromise then PlaceInput}
			<PlaceInput
				placeholder="Origen"
				source={config.source}
				hasError={errors.origin}
				bind:place={origin}
			/>
		{/await}
	</Flex>
	<Flex>
		{#await PlaceInputPromise then PlaceInput}
			<PlaceInput
				placeholder="Destino"
				source={config.source}
				hasError={errors.destination}
				bind:place={destination}
			/>
		{/await}
	</Flex>
	<Flex>
		{#await DateInputPromise then DateInput}
			<DateInput
				placeholder="Salida"
				hasError={errors.departs}
				bind:value={departs}
			/>
		{/await}
	</Flex>
	<Flex>
		{#await DateInputPromise then DateInput}
			<DateInput
				placeholder="Regreso"
				hasError={errors.returns}
				bind:value={returns}
			/>
		{/await}
	</Flex>
	<Flex>
		<Button on:click={handleSubmit}>Buscar</Button>
	</Flex>
</Flex>

