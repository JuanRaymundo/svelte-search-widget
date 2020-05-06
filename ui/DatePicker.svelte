<script>
  import { createEventDispatcher } from "svelte";
  import { getMonthName } from "../utils/date-time.js";
  import Calendar from "./Calendar.svelte";

  const dispatch = createEventDispatcher();

  // props
  export let isAllowed = () => true;
  export let value;

  // state
  let month;
  let year;
  let showDatePicker;

  $: selected = value || new Date();
  $: display = value ? value.toDateString() : '';

  // so that these change with props
  $: {
    month = selected.getMonth();
    year = selected.getFullYear();
  }

  // handlers
  const onFocus = () => {
    showDatePicker = true;
  };

  const next = () => {
    if (month === 11) {
      month = 0;
      year = year + 1;
      return;
    }
    month = month + 1;
  };

  const prev = () => {
    if (month === 0) {
      month = 11;
      year -= 1;
      return;
    }
    month -= 1;
  };

  const setDate = (date) => {
    value = date;
    showDatePicker = false;
  };

  const onDateChange = ({ detail }) => {
    setDate(detail);
  };
</script>

<style>
  .relative {
    position: relative;
  }
  .box {
    position: absolute;
    top: 40px;
    left: 0px;
    border: 1px solid green;
    display: inline-block;
  }

  .month-name {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 6px 0;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="relative">
  <input type="text" on:focus={onFocus} value={display} />
  {#if showDatePicker}
    <div class="box">
      <div class="month-name">
        <div class="center">
          <button on:click={prev}>{'<'}</button>
        </div>
        <div class="center">{getMonthName(month)} {year}</div>
        <div class="center">
          <button on:click={next}>{'>'}</button>
        </div>
      </div>
      <Calendar
        {month}
        {year}
        date={selected}
        {isAllowed}
        on:datechange={onDateChange}
      />
      <button on:click={() => setDate(new Date())}>Hoy</button>
      <button on:click={() => setDate(null)}>Borrar</button>
    </div>
  {/if}
</div>
