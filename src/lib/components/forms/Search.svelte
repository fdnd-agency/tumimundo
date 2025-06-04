<script>
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

    export let data = [];
    export let searchTerm = "";

    const dispatch = createEventDispatcher();

    // Reactive client-side filtered data
    $: filteredData = searchTerm
        ? data.filter(item =>
            item.language.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : data;

    // Emit filtered data to the parent whenever it changes
    $: dispatch("filter", filteredData);

    // Emit the full dataset on component load
    onMount(() => {
        dispatch("filter", data);
    });
</script>

<div class="search-container">
    <!-- Server-side fallback -->
    <form action="/languages" method="GET">
        <input
            type="text"
            id="searchbar"
            placeholder="Search..."
            class="search"
            bind:value={searchTerm}
            name="search"
            aria-label="Search for languages"
        />
    </form>
</div>

<style>
.search-container {
    width: 100%;
    max-width: 31.25em;
    margin: auto;
    contain: inline-size;
}

.search {
    background-image: url(/icons/search-icon.svg);
    background-repeat: no-repeat;
    background-position: 2% 50%;
    padding: .8em 1.8em;
    border-radius: .5em;
    border: none;
    width: 100%;
    max-width: 31.25em;
    margin: .6em auto;
    box-sizing: border-box;
}
  
div{
    width: 100%;
    max-width: 28.75em;
    margin: .6em auto;
    box-sizing: border-box;
    font-size: 1em;
    transition: width 0.3s ease, font-size 0.3s ease;
}

@container (max-width: 300px) {
    .search {
        width: 2.5em;
        padding: .8em;
        font-size: 0; 
        background-position: center;
    }
}

@media (max-width: 300px) {
    .search-container {
        max-width: 18.75em;
    }
    .search {
        width: 2.5em;
        padding: .8em;
        font-size: 0;
        background-position: center;
    }
}
</style>

