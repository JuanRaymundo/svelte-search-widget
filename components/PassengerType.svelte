<script>
  import Flex from '../ui/Flex.svelte';
  import NumericInput from '../ui/NumericInput.svelte';

  export let title;
  export let description;
  export let value;
</script>

<Flex>
  <Flex column flex="2">
    <strong>{title}</strong>
    <span>{description}</span>
  </Flex>
  <Flex>
    <NumericInput bind:value={value} />
  </Flex>
</Flex>
