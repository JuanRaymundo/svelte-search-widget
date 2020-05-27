<script>
  import Malamute from '../utils/Malamute';
  import debounce from '../utils/debounce';
  import onOutsideClick from '../utils/onOutsideClick';

  //constants
  const icons = {
    city: 'https://widgets.reservamos.mx/search/1.2.0/6f05870472d07facd38cd783fb277a89.svg',
    terminal: 'https://widgets.reservamos.mx/search/1.2.0/1f23fbd58733437e2aab1dafa0baf163.svg',
    airport: 'https://widgets.reservamos.mx/search/1.2.0/1b05848b6f0eb177963a7a65356ba0f1.svg',
  }

  // props
  export let placeholder = '';
  export let value = '';
  export let source;
  export let hasError = false;

  // state
  let listElement;
  let inputElement;
  let results = [];
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

  async function onInput({ target }) {
    results = await malamute.search(target.value);
  };

  function onSelect(place) {
    value = place.slug;
    inputElement.focus();
    showList = false;
  }

  onOutsideClick(() => [listElement, inputElement], () => {
    showList = false;
  })
</script>

<style>
  input.hasError {
    border: solid 1px red;
  }

  ul {
    padding: 0px;
    box-shadow: 0 10px 15px rgba(0,0,0,.15), 0 0 20px rgba(0,0,0, 0.2);
    position: absolute;
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
  <input
    placeholder={placeholder}
    type="text"
    value={value}
    class:hasError
    on:input={debounce(onInput)}
    on:focus={() => showList = true}
    bind:this={inputElement}
  />
  {#if showList}
    <ul bind:this={listElement}>
      {#each results.slice(0, 10) as place}
        <li on:click={() => onSelect(place)}>
          <img src={icons[place.result_type]} alt={place.result_type} />
          <b>{place.city_name}</b>
          {place.result_type === 'city' ? 'Todas las terminales' : place.display}
        </li>
      {/each}
    </ul>
  {/if}
</div>
