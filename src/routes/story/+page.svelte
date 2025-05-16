<script>
import { Back } from '$lib/index';
</script>

<main>
  <header>
    <a href="/" aria-label="Go back"><Back color="white"/></a>
    <div class="actions">
      <button aria-label="Dark mode">Moon svg</button>
      <button aria-label="Visuals off">TV svg</button>
    </div>
  </header>

  <section class="visuals">
    <img src="/" alt="Foxes in forest" />
  </section>

  <section class="story-text">
    <p>
      The wild foxes<br />
      jump over<br />
      the hedge<br />
      into the forest
    </p>
  </section>

  <section class="player">
    <audio controls>
      <source src="/audio/example.mp3" type="audio/mpeg" />
    </audio>
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
  padding: 1em;
  background: #42275a;
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
}

.player audio {
  width: 100%;
}
</style>
