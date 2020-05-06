<script>
  export let value = '';

  function handleInput({ target }) {
    value = target.value;
  }
</script>

<input type="text" value={value} on:input={handleInput}/>
