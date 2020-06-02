<script>
  export let flex = 1;
  export let column = false;
  export let alignItemsCenter = false;
</script>

<style>
  div {
    display: flex;
  }
  .column {
    flex-direction: column;
  }
  .alignItemsCenter {
    align-items: center;
  }
</style>

<div
  style={`flex: ${flex};`}
  class:column
  class:alignItemsCenter
>
  <slot />
</div>
