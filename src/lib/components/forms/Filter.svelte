<!-- @author: Marjam Lodien -->
<script>
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
  
    export let seasons = [];
    export let languages = [];
    export let selectedSeason = '';
    export let selectedLanguage = '';
  
    let form;
  
    function handleChange() {
      if (browser) {
        const formData = new FormData(form);
        const searchParams = new URLSearchParams(formData);
        goto(`?${searchParams.toString()}`)
      }
    }
  </script>
  
  <form bind:this={form} method="GET" on:change={handleChange}>
    <select name="season" id="season-select" aria-label="Choose a season">
      <option value="">Select a season</option>
      {#each seasons as season}
        <option value="{season.season}" selected={selectedSeason === season.season}>
          {season.season}
        </option>
      {/each}
    </select>
    <select name="language" id="language" aria-label="Choose a language">
      <option value="">Select a language</option>
      {#each languages as language}
        <option value="{language.language}" selected={selectedLanguage === language.language}>
          {language.language}
        </option>
      {/each}
    </select>
    {#if !browser}
      <button type="submit">Apply Filters</button>
    {/if}
  </form>
  