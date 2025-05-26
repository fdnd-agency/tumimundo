<script>
  import { Back, VisualsSVG, DarkModeSVG, CloudsSVG } from '$lib/index';
  import { onMount } from 'svelte';
  import CloudsSvg from '../../../lib/components/svg/CloudsSVG.svelte';

  export let data;
  const { story, audio } = data;
  const audioSrc = story.audios?.[0]?.file || '';

  let transcriptLines = audio?.transcript ? parseVTT(audio.transcript) : [];

  let audioEl;
  let currentTime = 0;
  let currentLineIndex = -1;
  let transcriptRefs = [];

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
    const lines = vtt.split('\n');
    const result = [];
    let current = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line === '' || line === 'WEBVTT') continue;

      if (line.includes('-->')) {
        const [start, end] = line.split('-->').map(s => parseTime(s.trim()));
        current = { start, end, text: '' };
        continue;
      }

      if (current) {
        current.text += line + ' ';
        const nextLine = lines[i + 1]?.trim();
        if (!nextLine || nextLine.includes('-->')) {
          result.push({ ...current, text: current.text.trim() });
          current = null;
        }
      }
    }

    return result;
  }

  function parseTime(timeString) {
    const [h, m, s] = timeString.split(':');
    const [sec, ms = 0] = s.split('.');
    return (
      parseInt(h) * 3600 +
      parseInt(m) * 60 +
      parseInt(sec) +
      (parseInt(ms) || 0) / 1000
    );
  }

  // Detects the active sentence of the story
  $: {
    const index = transcriptLines.findIndex(
      (line) => currentTime >= line.start && currentTime < line.end
    );
    if (index !== -1 && index !== currentLineIndex) {
      currentLineIndex = index;
      scrollToActiveLine();
    }
  }

  function scrollToActiveLine() {
    const el = transcriptRefs[currentLineIndex];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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
      <img src={story.image} alt={story.summary} />
    </section>
  {/if}

  <section class="transcript">
    <h2>{story.title}</h2>

    {#if transcriptLines.length > 0}
      {#each transcriptLines as line, i}
        <p
          class:active={i === currentLineIndex}
          bind:this={transcriptRefs[i]}
        >
          {line.text}
        </p>
      {/each}
    {:else}
      <p>No transcripts available.</p>
    {/if}
  </section>

  <section class="player">
    {#if audioSrc}
      <audio
        bind:this={audioEl}
        on:timeupdate={() => currentTime = audioEl.currentTime}
        controls
      >
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    {:else}
      <p>No audio available</p>
    {/if}
  </section>

  <CloudsSvg/>

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
  z-index: 0;
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

.visuals img {
  max-width: 20em;
  max-height: 20em;
  border-radius: 1em;
}

.transcript {
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  margin-top: 1em;
  line-height: 1.4;
  max-height: 5em;
  max-width: 15em;
  overflow-y: auto;
  color: white;
  scroll-behavior: smooth;
  overflow-y: scroll; 
  scrollbar-width: none;       
  -ms-overflow-style: none;  
}

.transcript::-webkit-scrollbar {
  display: none;
}

.transcript p {
  margin: 0.4em 0;
  transition: background-color 0.3s, color 0.3s;
}

.transcript p.active {
  color: #f3a22a;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
}

.player {
  position: relative;
  width: 100%;
  height: 8em;
  padding: 1em;
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
  color: white;
  margin: 1em;
  margin-bottom: 0;
}

.player audio {
  width: 100%;
}
</style>
