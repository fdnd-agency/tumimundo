<script>
import { Back, VisualsSVG, DarkModeSVG } from '$lib/index';

export let data;
const { story } = data;
const audioSrc = story.audios?.[0]?.file || '';

let showVisuals = true

</script>

<main>
  <header>
    <a href="/lessons" aria-label="Go back"><Back color="white"/></a>
    <div class="actions">
      <button aria-label="Dark mode"><DarkModeSVG/></button>
      <button aria-label="Toggle visuals" on:click={() => showVisuals = !showVisuals}>
      <VisualsSVG />
      </button>

    </div>
  </header>

  {#if showVisuals}
    <section class="visuals">
      <img src="{story.image}" alt="{story.summary}" />
    </section>
  {/if}


  <section class="story-text">
    <h1>{story.title}</h1>
    <p>{story.summary}</p>
  </section>

  <section class="player">
    
    {#if audioSrc}
      <audio controls>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    {:else}
      <p>No audio available</p>
    {/if}
  </section>
</main>

<style>

:global(body) {
  margin: 0;
  font-family: sans-serif;
  color: white;
}

main {
  background: linear-gradient(to bottom, #2e003e, #5f2c82);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

header, .visuals, .story-text, .player{
  padding: 1em;
  max-width: 31.25em;
}
.visuals, .story-text{
  margin: auto;
}

header {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

header a {
  font-size: 1.5em;
  color: white;
  text-decoration: none;
}

.actions button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2em;
  margin-left: 0.5em;
}
.visuals{
  margin: auto;
}
.story-text {
  text-align: center;
  font-size: 1.4em;
  font-weight: bold;
  margin-top: 1em;
  line-height: 1.4;
}

.player {
  position: relative;
  margin-top: 2em;
  width: 100%;
  height: 8em;
  padding: 1em;
  background: #42275a;
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
}

.player audio {
  width: 100%;
}
</style>
