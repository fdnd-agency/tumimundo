<script>
    import { Story, Search, Back } from '$lib/index';
    import { writable } from 'svelte/store';

    /** @type {import('./$types').PageData} */
    export let data;

    let selectedLanguage = writable('languages');
    let selectedSeason = writable('seasons');
    /** $: zorgt voor een reactive statement. de inhoud hiervan wordt automatisch geupdate wanneer data hierin wordt gewijzigd */
    $: stories = [];
    $: noStoriesFound = stories.length === 0;

    $: {
        stories = data.stories.filter(story => {
            const languageMatch = $selectedLanguage === 'languages' ||
                (story.language === $selectedLanguage);
            
            const seasonMatch = $selectedSeason === 'seasons' ||
                (story.season === $selectedSeason);
 
            return languageMatch && seasonMatch;
        });
    }

    function handleLanguageChange(event) {
        selectedLanguage.set(event.target.value);
    }

    function handleSeasonChange(event) {
        selectedSeason.set(event.target.value === 'season' ? 'seasons' : event.target.value);
    }

</script>

<main>
    <header>
        <div class="heading">
            <a href="/lessons" aria-label="Go back to lessons">
                <Back color="white"/>
            </a>
            <h1>All Stories</h1>
        </div>
    
        <Search />
    
        <ul class="nav-ul">
            <li>
                <select name="animal" id="animal-select" aria-label="Choose an animal">
                    <option value="animal">Animal</option>
                        {#each data.animals as animal}
                            <option value="{ animal.animal }">{ animal.animal }</option>
                        {/each}
                </select>
                
            </li>
            <li>
                <select name="season" id="season-select" aria-label="Choose a season"  on:change={handleSeasonChange}>
                    <option value="season">Season</option>
                    {#each data.seasons as season}
                        <option value="{season.season}">{season.season}</option>
                    {/each}
                </select>
            </li>
            <li>
                <select name="language" id="language" aria-label="Choose a language" on:change={handleLanguageChange}>
                    <option value="languages">Languages</option>
                    {#each data.languages as language}
                        <option value="{language.language}">{language.language}</option>
                    {/each}
                </select>
            </li>
            <li>
                <select name="sorting" id="sorting"aria-label="Choose a sorting">
                    <option value="sorting">Sorting</option>
                    <option value="from a to z">From A - Z</option>
                    <option value="from z to a">From Z to A</option>
                    <option value="short to long playtime">Short to long playtime</option>
                    <option value="long to short playtime">Long to short playtime</option>
                </select>
            </li>
        </ul>
    </header>
    
    <section class="story-list">
        {#if noStoriesFound}
            <p class="no-stories-message">No stories found</p>
        {:else}
            {#each stories as story (story.id)}
                <Story {story} />
            {/each}
        {/if}
    </section>
</main>

<style>
main {
    background-image: var(--bg-image-purple);
    color: var(--color-white);
    min-height: 100vh; 
}

.heading,
.nav-ul {
    display: flex;
    align-items: center;
}

select,
header,
.nav-ul > li {
    width: 100%;
}

.heading {
    justify-content: space-between;
    margin: 1em 0;
    padding: 1em;
    position: relative; 
}

.heading > h1 {
    position: absolute;
    left: 50%;
    font-size: 1.7em;
    transform: translateX(-50%);
}

header {
    z-index: 10;
    height: 100%;
    justify-content: space-between; 
    padding: 0.625em 1.25em;
    background-color: transparent;
}

.nav-ul > li {
    background-color: hsla(266, 72%, 35%, 1);
    font-size: 1em;
    padding: 0.2em 0.3em;
    border-radius: .25em;
}

.nav-ul {
    margin-top: 0.3em;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5em;
    list-style-type: none;
    overflow-x: auto;
}

select {
    background-color: transparent;
    overflow-x: auto; 
    border: none;
    color: var(--color-white);
}

option,
option:active {
    color: black;
}

section {
    padding: 1.25em;
}

ul {
    list-style: none;
    padding: 0;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
}

.story-list {
    padding: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
}

.no-stories-message {
    color: var(--color-white);
    font-size: 1.2em;
    text-align: center;
    width: 100%;
    padding: 2em;
}

@media only screen and (min-width: 54.0625em) {
    .nav-ul {
        gap: 1em;
    }
}
</style>
