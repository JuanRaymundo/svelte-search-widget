<script>
  import Flex from './Flex.svelte';
  export let value = 0;

  function increment () {
    value++;
  }
  function decrement () {
    value--;
  }
</script>

<style>
  div {
    display: flex;
  }
  .numeric {
    height: 45px;
  }
  .numeric > * {
    border: solid 1px #888888;
    border-right: none;
    padding: 0 20px;
  }
  .numeric > *:first-child {
    border-radius: 25px 0 0 25px;
  }
  .numeric > *:last-child {
    border-radius: 0 25px 25px 0;
    border-right: solid 1px #888888;
  }
</style>

<div class="numeric">
  <button on:click={decrement}>-</button>
  <div>
    <Flex alignItemsCenter>{value}</Flex>
  </div>
  <button on:click={increment}>+</button>
</div>
