<script>
  export let absolute = false;
  export let flat = false;
  export let square = false;
</script>

<style>
  div {
    box-shadow: 0 10px 15px rgba(0,0,0,.15), 0 0 20px rgba(0,0,0, 0.2);
    border-radius: 5px;
    padding: 15px;
  }

  .absolute {
    position: absolute;
  }

  .flat {
    padding: 0px;
  }

  .square {
    border-radius: 0px;
  }
</style>

<div
  class:absolute
  class:flat
  class:square
>
  <slot />
</div>
