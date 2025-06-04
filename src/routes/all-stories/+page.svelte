<script>
    import { Story, Back, Filter } from '$lib/index';
  
    /** @type {import('./$types').PageData} */
    export let data;
  
    $: ({ stories, seasons, languages, animals, selectedSeason, selectedLanguage, selectedAnimal, selectedSorting } = data);
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
        {animals}  
        selectedSeason={selectedSeason} 
        selectedLanguage={selectedLanguage}
        selectedAnimal={selectedAnimal}
        selectedSorting={selectedSorting}
      />
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
  
    .filters :global(select){
      background-color: hsla(266, 72%, 35%, 1);
      color: var(--color-white);
      border: none;
      border-radius: 0.25em;
      padding: 0.2em 0.3em;
      font-size: 1em;
      width: 100%;
    }
  
    .filters :global(option){
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
  