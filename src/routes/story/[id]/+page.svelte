<script>
  import { Back, VisualsSVG, CloudsSVG, DarkModeSVG } from '$lib/index';
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';

  export let data;
  const { story, audio, theme, showVisuals: showVisualsFromServer } = data;
  const audioSrc = story.audios?.[0]?.file || '';

  let transcriptLines = audio?.transcript ? parseVTT(audio.transcript) : [];
  let audioEl;
  let currentTime = 0;
  let currentLineIndex = -1;
  let transcriptRefs = [];

  let showVisuals = showVisualsFromServer;
  let darkMode = theme === 'dark';
  let jsEnabled = false;

  onMount(() => {
    jsEnabled = true;
    const storedVisuals = localStorage.getItem('showVisuals');
    const storedTheme = localStorage.getItem('theme');

    if (storedVisuals !== null) showVisuals = storedVisuals === 'true';
    if (storedTheme) darkMode = storedTheme === 'dark';
  });

  function toggleVisuals() {
    if (!document.startViewTransition) {
      showVisuals = !showVisuals;
      localStorage.setItem('showVisuals', showVisuals);
      return;
    }
    document.startViewTransition(() => {
      showVisuals = !showVisuals;
      localStorage.setItem('showVisuals', showVisuals);
    });
  }

  function toggleTheme() {
    if (!document.startViewTransition) {
      darkMode = !darkMode;
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
      return;
    }
    document.startViewTransition(() => {
      darkMode = !darkMode;
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    });
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

<main class:light-mode={!darkMode} style="view-transition-name:main-bg;">
  <header>
    <a href="/lessons" aria-label="Go back">
      <Back color={darkMode ? 'white' : 'black'} />
    </a>

    <div class="actions">
      <form method="POST" action="?/toggleTheme" use:enhance on:submit|preventDefault={toggleTheme}>
        <button aria-label="Toggle theme" type="submit">
          <DarkModeSVG {darkMode} />
        </button>
      </form>

      <form method="POST" action="?/toggleVisuals" use:enhance on:submit|preventDefault={toggleVisuals}>
        <button aria-label="Toggle visuals" type="submit">
          {#if showVisuals}
            <VisualsSVG mode="off" />
          {:else}
            <VisualsSVG mode="on" />
          {/if}
        </button>
      </form>
    </div>
  </header>

  {#if showVisuals}
    <section class="visuals">
      <picture class="story-image flex-items">
        <source srcset="{story.image}?width=320&format=avif" type="image/avif">
        <source srcset="{story.image}?width=320&format=webp" type="image/webp">
        <source srcset="{story.image}?width=320" type="image/jpeg">
        <img 
          src="{story.image}?width=320" 
          alt="{story.summary} cover image" 
          height="270" 
          width="320" 
        />
      </picture>
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

  {#if darkMode}
    <CloudsSVG style="view-transition-name:clouds" color="dark" />
    <div class="moon" style="view-transition-name:clouds"></div>
  {:else}
    <CloudsSVG style="view-transition-name:clouds" color="light" />
    <div class="sun" style="view-transition-name:clouds"></div>
  {/if}
</main>

<style>
main {
  background: var(--bg-story-dark);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 0;
  overflow-y: hidden;
}

main.light-mode {
  background: var(--bg-image-blue);
}

.sun {
  position: absolute;
  top: -2em;
  left: -1em;
  width: 10em;
  height: 10em;
  background: radial-gradient(circle, #ffe066, #ffcc00);
  border-radius: 50%;
  box-shadow: 0 0 30px #ffcc00;
  animation: rise 1s ease-out forwards;
  z-index: -1;
}

.moon {
  position: absolute;
  top: -2em;
  left: -1em;
  width: 10em;
  height: 10em;
  background: radial-gradient(circle, #d3d3d3, #838383);
  border-radius: 50%;
  box-shadow: 0 0 30px #d6d6d6;
  animation: rise 1s ease-out forwards;
  z-index: -1;
}

header,
.visuals,
.transcript,
.player {
  padding: 1em;
  max-width: 31.25em;
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

.actions{
  display: flex;
}

.actions button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2em;
  margin-left: 0.5em;
  cursor: pointer;
}

.visuals {
  margin: auto;
}

.visuals img {
  max-width: 20em;
  max-height: 20em;
  border-radius: 1em;
  transition: 1s;
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

main.light-mode .transcript p.active {
  background-color: rgba(0, 0, 0, 0.05);
  color: #000000;
}

main.light-mode .transcript p {
  color: #272727;
}

.player {
  position: relative;
  width: 100%;
  height: 8em;
  padding: 1em;
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
  color: white;
  margin: 1em 0 0;
}

.player audio {
  width: 100%;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(2em);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

::view-transition-old(main-bg),
::view-transition-new(main-bg) {
  animation: fade-color 0.6s ease forwards;
}

@keyframes fade-color {
  from { opacity: 0.2; }
  to { opacity: 1; }
}

::view-transition-old(visuals),
::view-transition-new(visuals) {
  animation: fade-visual-img 0.4s ease;
}

@keyframes fade-visual-img {
  from {
    opacity: 0;
    transform: scale(0.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

</style>