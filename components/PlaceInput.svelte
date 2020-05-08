<script>
  import Malamute from '../utils/Malamute';
  import onOutsideClick from '../utils/onOutsideClick';

  //constants
  const icons = {
    city: 'https://widgets.reservamos.mx/search/1.2.0/6f05870472d07facd38cd783fb277a89.svg',
    terminal: 'https://widgets.reservamos.mx/search/1.2.0/1f23fbd58733437e2aab1dafa0baf163.svg',
    airport: 'https://widgets.reservamos.mx/search/1.2.0/1b05848b6f0eb177963a7a65356ba0f1.svg',
  }

  // props
  export let id = '';
  export let label = '';
  export let value = '';
  export let source;

  // state
  let results = [];
  let listElement;
  let showList = false;

  // autocomplete
  const malamute = new Malamute({
    idetify: item => item.slug,
    remote: {
      url: source,
    },
    request: q => ({ q }),
    prefetch: () => ({ prefetch: true }),
  });

  async function handleInput({ target }) {
    results = await malamute.search(target.value);
  }

  onOutsideClick(() => listElement, () => {
    showList = false;
  })
</script>

<style>
  ul {
    padding: 0px;
    box-shadow: 0 10px 15px rgba(0,0,0,.15), 0 0 20px rgba(0,0,0, 0.2);

  }

  li {
    list-style-type: none;
    padding-bottom: 10px;
  }

  li:last-child {
    padding-bottom: 0;
  }

  li:hover {
    background-color: #f8f8f8
  }
</style>

<div>
  <label for={id}>{label}</label>
  <input
    id={id}
    type="text"
    value={value}
    on:input={handleInput}
    on:mouseup|stopPropagation
    on:focus={() => showList = true}
  />
  {#if showList}
    <ul bind:this={listElement}>
      {#each results.slice(0, 10) as { display, result_type, slug, state }}
        <li on:click={() => value = slug}>
          <img src={icons[result_type]} alt={result_type} />
          <b>{state}</b>
          {result_type === 'city' ? 'Todas las terminales' : display}
        </li>
      {/each}
    </ul>
  {/if}
</div>
