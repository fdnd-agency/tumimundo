<script>
  import { Back, VisualsSVG, DarkModeSVG } from '$lib/index';
  import { onMount } from 'svelte';

  export let data;
  const { story, audio } = data;
  const audioSrc = story.audios?.[0]?.file || '';
  const transcriptLines = parseVTT(audio.transcript);

  let showVisuals = true;
  let jsEnabled = false;

  onMount(() => {
    jsEnabled = true;

    const stored = localStorage.getItem('showVisuals');
    if (stored !== null) {
      showVisuals = stored === 'true';
    }
  });

  function toggleVisuals() {
    showVisuals = !showVisuals;
    localStorage.setItem('showVisuals', showVisuals);
  }

  function parseVTT(vtt) {
    return vtt
      .split('\n')
      .filter(line => line && !line.includes('-->') && !line.startsWith('WEBVTT'))
      .map(line => line.replace(/"/g, ''));
  }
</script>

<main>
  <header>
    <a href="/lessons" aria-label="Go back"><Back color="white" /></a>
    <div class="actions">
      <button aria-label="Dark mode"><DarkModeSVG /></button>

      {#if jsEnabled}
        <button aria-label="Toggle visuals" on:click={toggleVisuals}>
          {#if showVisuals}
            <VisualsSVG mode="off" />
          {:else}
            <VisualsSVG mode="on" />
          {/if}
        </button>
      {/if}
    </div>
  </header>

  {#if showVisuals}
    <section class="visuals">
      <img src="{story.image}" alt="{story.summary}" />
    </section>
  {/if}

  <section class="transcript">
  <h2>{story.title}</h2>
  {#each transcriptLines as line}
    <p>{line}</p>
  {/each}
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

main {
  background: linear-gradient(to bottom, #2e003e, #5f2c82);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

header,
.visuals,
.transcript,
.player {
  padding: 1em;
  max-width: 31.25em;
}

.visuals,
.transcript {
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

.visuals {
  margin: auto;
}

.transcript {
  text-align: left;
  font-size: 1.4em;
  font-weight: bold;
  margin-top: 1em;
  line-height: 1.4;
  max-height: 8em;
  width: 20em;
  overflow: auto;
  color: white;
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
  color: white;
}

.player audio {
  width: 100%;
}
</style>
