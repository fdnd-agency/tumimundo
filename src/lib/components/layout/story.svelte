<script>
  export let story;

  const { image, title, summary, playtime, language, audios } = story;
  
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
    <img src={"/languages/"+ language.toLowerCase() + ".svg"} alt="{language} flag" height="17.59" width="17.58" loading="lazy">
  </picture>

  <p class="story-summary">{summary}</p>

  <div class="story-playtime flex-items">
    {#if firstAudio}
    <a href={firstAudio} target="_blank" aria-label="Listen to {title}">
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="9" fill="#3A54DE"/>
        <path d="M12.8159 9.79599C13.3367 9.39307 13.3367 8.6069 12.8159 8.20397C11.2422 6.98629 9.48494 6.02651 7.60988 5.36056L7.26734 5.2389C6.61199 5.00614 5.91977 5.44954 5.83105 6.12603C5.58317 8.01614 5.58317 9.98383 5.83105 11.8739C5.91977 12.5504 6.61199 12.9938 7.26733 12.7611L7.60988 12.6394C9.48494 11.9735 11.2422 11.0137 12.8159 9.79599Z" fill="white"/>
      </svg>  
    </a>
  {:else}
    <span>No audio available</span>
  {/if}

    <p>{playtime}</p>
  </div>

  <div class="story-icons flex-items">
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.6875 11.1094H12.6914C14.1416 11.1094 15.3281 10.5501 15.3281 9.11602C15.3281 7.6819 13.9307 7.17882 12.7969 7.12266C12.5625 4.87986 10.9248 3.51562 9 3.51562C7.18066 3.51562 6.00891 4.72298 5.625 5.92031C4.04297 6.07061 2.67188 6.86637 2.67188 8.51484C2.67188 10.1633 4.0957 11.1094 5.83594 11.1094H7.3125" stroke="#B0B0B0" stroke-width="0.84375" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.3125 12.7995L9 14.4843L10.6875 12.7995" stroke="#B0B0B0" stroke-width="0.84375" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 8.15625V14.0633" stroke="#B0B0B0" stroke-width="0.84375" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> 
    
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5.5" stroke="#B0B0B0"/>
      <rect x="3" y="5.57141" width="6" height="0.857143" rx="0.428571" fill="#B0B0B0"/>
      <rect x="6.42871" y="3" width="6" height="0.857143" rx="0.428571" transform="rotate(90 6.42871 3)" fill="#B0B0B0"/>
    </svg>        
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
