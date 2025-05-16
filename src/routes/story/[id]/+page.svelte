<script>
import { Back } from '$lib/index';

export let data;
const { story } = data;
const audioSrc = story.audios?.[0]?.file || '';

</script>

<main>
  <header>
    <a href="/lessons" aria-label="Go back"><Back color="white"/></a>
    <div class="actions">
      <button aria-label="Dark mode">Moon svg</button>
      <button aria-label="Visuals off">TV svg</button>
    </div>
  </header>

  <section class="visuals">
    <img src="{story.image}" alt="Foxes in forest" />
  </section>

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
  justify-content: space-between;
  position: relative;
}

header, .visuals, .story-text{
  padding: 1em;
}

header {
  display: flex;
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
}

.wave-bg {
  height: 4em;
  background: #42275a;
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
}

.player {
  margin-top: 1em;
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
