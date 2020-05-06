<script>
  export let flex = '1';
</script>

<style>
  div {
    display: flex;
  }
</style>

<div style={`flex: ${flex};`}>
  <slot />
</div>