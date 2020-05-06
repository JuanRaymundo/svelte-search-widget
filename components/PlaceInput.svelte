<script>
  export let value = '';

  function handleInput({ target }) {
    value = target.value;
  }
</script>

<style>
  input {
    display: block;
  }
</style>

<input type="text" value={value} on:input={handleInput}/>
