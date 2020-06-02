<script>
  import DatePicker from '../ui/DatePicker.svelte';

  export let placeholder = '';
  export let value = null;
  export let hasError = false;
</script>

<div>
  <DatePicker placeholder={placeholder} bind:value={value} bind:hasError />
</div>
