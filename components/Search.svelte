<script>
	import makeRedirectUrl from '../utils/makeRedirectUrl';
	import Form from './Form.svelte';

	// props

	export let source; // = 'https://www.reservamos.mx/api/v2/places';
	export let funnel; // = 'https://viaje.resertravel.com/';
	$: config = { funnel, source };

	// handlers

	function onSubmit ({ detail: fields }) {
		const url = makeRedirectUrl(fields, config);
		window.open(url);
	}
</script>

<Form config={config} on:submit={onSubmit} />
