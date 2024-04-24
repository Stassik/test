<script lang="ts">
  import { onMount } from "svelte";
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";

  let dataMain = [];
  let currency = [];
  let currencyItemFrom = "USD";
  let currencyItemTo = "USD";

  let currencyValueFrom = 1;
  let currencyValueTo = 1;

  const url =
    "https://v6.exchangerate-api.com/v6/a580ba2105391abedc71bfa4/latest/";

  onMount(async () => {
    fetch(url + currencyItemFrom)
      .then((response) => response.json())
      .then((json) => {
        const data = json;
        dataMain = data.conversion_rates;
        currency = Object.keys(dataMain);
      })
      .catch((error) => console.error("Error:", error));
  });

  async function changeCurrencyFrom(newCurrencyFrom) {
    fetch(url + newCurrencyFrom)
      .then((response) => response.json())
      .then((json) => {
        const data = json;
        dataMain = data.conversion_rates;
        calculationCurrencyTo();
      })
      .catch((error) => console.error("Error:", error));
  }

  function calculationCurrencyTo() {
    currencyValueTo = currencyValueFrom * dataMain[currencyItemTo];
  }

  function calculationCurrencyFrom() {
    currencyValueFrom = currencyValueTo / dataMain[currencyItemTo];
  }
</script>

<main>
  <select
    name="currency_from"
    id="currency_from"
    bind:value={currencyItemFrom}
    on:change={changeCurrencyFrom(currencyItemFrom)}
  >
    {#each currency as item}
      <option value={item}>{item}</option>
    {/each}
  </select>
  <input
    type="text"
    name="from"
    id=""
    bind:value={currencyValueFrom}
    on:input={calculationCurrencyTo}
  />
  <br />
  <br />
  <select
    name="currency_to"
    id="currency_to"
    bind:value={currencyItemTo}
    on:change={calculationCurrencyTo}
  >
    <option value="">--Выберете валюту--</option>
    {#each currency as item}
      <option value={item}>{item}</option>
    {/each}
  </select>
  <input
    type="text"
    name="to"
    id=""
    bind:value={currencyValueTo}
    on:input={calculationCurrencyFrom}
  />
</main>

<style>
</style>
