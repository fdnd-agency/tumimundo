<script>
  import { PlayStory, Download, AddStory } from '$lib/index';

  export let story = {}; // voorkomt dat story undefined is

const { 
  image = '', 
  title = 'Untitled', 
  summary = 'No summary available', 
  playtime = 'Unknown', 
  language = 'unknown', 
  audios = [] 
} = story;

  
  // SELECT THE FIRST AUDIO FILE, BECAUSE THERE ARE MULTIPLE AUDIOS TO 1 STORY.
  const firstAudio = audios?.[0]?.file || null;

</script>

<article>
  <picture class="story-image flex-items">
    <source srcset="{image}?width=64&format=avif" type="image/avif">
    <source srcset="{image}?width=64&format=webp" type="image/webp">
    <source srcset="{image}?width=64" type="image/jpeg">
    <img 
      src="{image}?width=64" 
      alt="{title} cover image" 
      height="64" 
      width="64" 
      loading="lazy"
    />
  </picture>
  

  <h2 class="story-title">{title}</h2>

  <picture class="story-language flex-items">
    <img src="/languages/{language}.svg" alt="{language}" height="17.59" width="17.58" loading="lazy">
  </picture>

  <p class="story-summary">{summary}</p>

  <div class="story-playtime flex-items">
    {#if firstAudio}
    <a href={firstAudio} target="_blank" aria-label="Listen to {title}">
      <PlayStory/>
    </a>
  {:else}
    <span>No audio available</span>
  {/if}

    <p>{playtime}</p>
  </div>

  <div class="story-icons flex-items">
    <Download/>
    <AddStory/>       
  </div>
</article>

<style>
  :root {
    --small-space: var(--space-sm);
  }

  p {
    font-size: var(--font-size-sm);
  }

  .flex-items {
    display: flex;
    align-items: center;
  }

  article {
    width: var(--article-width-large);
    height: var(--article-height-xlarge);
    display: grid;
    grid-template-columns: var(--grid-columns);
    grid-template-rows: var(--grid-rows);
    background-color: var(--color-bg);
    overflow: hidden;
    padding: var(--space-sm);
    border-radius: var(--border-radius);
    color: black;
  }

  .story-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    grid-area: 1 / 2 / 2 / 6;
  }

  .story-image {
    grid-area: 1 / 1 / 4 / 2;
  }

  .story-image img {
    max-width: var(--image-max-width);
    min-height: var(--image-min-height);
    object-fit: cover;
  }

  .story-language {
    grid-area: 1 / 5 / 2 / 6;
    justify-content: flex-end;
    gap: var(--space-sm);
  }

  .story-summary {
    grid-area: 2 / 2 / 3 / 5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: var(--font-size-xs);
  }

  .story-playtime {
    grid-area: 3 / 2 / 4 / 5; 
    gap: var(--space-sm);
    font-size: var(--font-size-xs);
  }

  .story-playtime a svg:hover circle {
    fill: #F3A22A;
  }

  .story-icons {
    grid-area: 3 / 5 / 4 / 6; 
    justify-content: flex-end;
    gap: var(--space-sm);
  }

  .story-icons svg:hover path,
  .story-icons svg:hover rect,
  .story-icons svg:hover circle {
    stroke: #000;
  }
  
  @media (min-width: 412px) {
    article {
      width: var(--article-width-large);
    }
  }
  
</style>
