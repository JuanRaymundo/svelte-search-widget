<script>
  import { createEventDispatcher } from 'svelte';
  import Card from '../ui/Card.svelte';
  import Flex from '../ui/Flex.svelte';
  import PassengerType from './PassengerType.svelte';

  export let adults = 0;
  export let children = 0;
  export let infants = 0;

  let prevAdults = adults;
  let prevChildren = children;
  let prevInfants = infants;

  $: {
    const tooManyPassengers = (adults + children + infants) > 5;

    // validate adults
    if (adults !== prevAdults) {
      if (adults < 1) adults = prevAdults;
      if (tooManyPassengers) adults = prevAdults;
      // no less adults than infants
      if (adults < infants) adults = prevAdults;

      prevAdults = adults;
    }

    // validate children
    if (children !== prevChildren) {
      if (children < 0) children = prevChildren;
      if (tooManyPassengers) children = prevChildren;

      prevChildren = children;
    }

    // validate infants
    if (infants !== prevInfants) {
      if (infants < 0) infants = prevInfants;
      if (tooManyPassengers) infants = prevInfants;
      // no more infants than adults
      if (infants > adults) infants = prevInfants;

      prevInfants = infants;
    }
  };

  const dispatch = createEventDispatcher();
  function close () {
    dispatch('close');
  }
</script>

<style>
  .container {
    width: 340px;
  }

  .passenger-element {
    padding-bottom: 15px;
  }
</style>

<Card absolute>
  <div class="container">
    <Flex column>
      <div class="passenger-element">
        <PassengerType
          title="Adulto"
          description="12+ años"
          bind:value={adults}
        />
      </div>
      <div class="passenger-element">
        <PassengerType
          title="Menor"
          description="de 2 a 11 años"
          bind:value={children}
        />
      </div>
      <div class="passenger-element">
        <PassengerType
          title="Infante"
          description="Menor a 2 años"
          bind:value={infants}
        />
      </div>
    </Flex>
    <button on:click={close}>Cerrar</button>
  </div>
</Card>
