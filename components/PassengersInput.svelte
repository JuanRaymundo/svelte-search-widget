<script>
  import onOutsideClick from '../utils/onOutsideClick';
  import Card from '../ui/Card.svelte';
  import Flex from '../ui/Flex.svelte';
  import PassengersList from './PassengersList.svelte';

  export let adults = 0;
  export let children = 0;
  export let infants = 0;

  let menuVisible = false;
  let inputElement;
  let menuElement;

  function toggleMenu () {
    menuVisible = !menuVisible;
  }

  onOutsideClick(() => [inputElement, menuElement], () => {
    menuVisible = false;
  });

  $: passengers = adults + children + infants;
  $: display = `${passengers} pasajero${passengers === 1 ? '' : 's'}`;
</script>

<div>
  <button bind:this={inputElement} on:click={toggleMenu}>
    {display}
  </button>
  {#if menuVisible}
    <div bind:this={menuElement}>
      <PassengersList
        bind:adults={adults}
        bind:children={children}
        bind:infants={infants}
        on:close={toggleMenu}
      />
    </div>
  {/if}
</div>
