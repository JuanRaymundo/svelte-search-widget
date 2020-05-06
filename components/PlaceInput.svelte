<script>
  export let id = '';
  export let label = '';
  export let value = '';

  function handleInput({ target }) {
    value = target.value;
  }
</script>

<div>
  <label for={id}>{label}</label>
  <input id={id} type="text" value={value} on:input={handleInput}/>
</div>
