<script>
    import { Story, Back, Filter } from '$lib/index';
  
    /** @type {import('./$types').PageData} */
    export let data;
  
    $: ({ stories, seasons, languages, selectedSeason, selectedLanguage } = data);
    $: noStoriesFound = stories.length === 0;
  </script>
  
  <main>
    <header>
      <div class="heading">
        <a href="/lessons" aria-label="Go back to lessons">
          <Back color="white"/>
        </a>
        <h1>All Stories</h1>
      </div>
    </header>
    
    <div class="filters">
      <Filter 
        {seasons} 
        {languages}  
        selectedSeason={selectedSeason} 
        selectedLanguage={selectedLanguage}
      />
      <select name="animal" id="animal-select" aria-label="Choose an animal">
        <option value="animal">Select an animal</option>
        {#each data.animals as animal}
          <option value="{ animal.animal }">{ animal.animal }</option>
        {/each}
      </select>
      <select name="sorting" id="sorting" aria-label="Choose a sorting">
        <option value="sorting">Sorting</option>
        <option value="from a to z">From A - Z</option>
        <option value="from z to a">From Z to A</option>
        <option value="short to long playtime">Short to long playtime</option>
        <option value="long to short playtime">Long to short playtime</option>
      </select>
    </div>
    
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
      padding: 1em;
    }
  
    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1em;
      position: relative;
    }
  
    .heading > h1 {
      position: absolute;
      left: 50%;
      font-size: 1.7em;
      transform: translateX(-50%);
    }
  
    .filters {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1em;
      margin-bottom: 2em;
    }
  
    .filters :global(form) {
      display: contents;
    }
  
    .filters :global(select),
    .filters select {
      background-color: hsla(266, 72%, 35%, 1);
      color: var(--color-white);
      border: none;
      border-radius: 0.25em;
      padding: 0.2em 0.3em;
      font-size: 1em;
      width: 100%;
    }
  
    .filters :global(option),
    .filters option {
      color: black;
    }
  
    .story-list {
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
  
    @media only screen and (max-width: 768px) {
      .filters {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
  