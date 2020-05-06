<script>
  import DatePicker from '../ui/DatePicker.svelte';

  export let id = '';
  export let label = '';
  export let value = null;
</script>

<div>
  <label for={id}>{label}</label>
  <DatePicker id={id} bind:value={value} />
</div>
