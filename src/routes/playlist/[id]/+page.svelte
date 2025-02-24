<script>
  import { Story } from '$lib/index';

  export let data; 

  let playlist = data?.playlist;
</script>

<main>
  <nav>
    <a href="/lessons">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3398 8.55508C27.0797 9.29502 27.0797 10.4947 26.3398 11.2346L17.5743 20.0001L26.3398 28.7656C27.0797 29.5055 27.0797 30.7052 26.3398 31.4452C25.5998 32.1851 24.4002 32.1851 23.6602 31.4452L13.555 21.3399C12.815 20.6 12.815 19.4003 13.555 18.6603L23.6602 8.55508C24.4002 7.81514 25.5998 7.81514 26.3398 8.55508Z" fill="black"/>
      </svg>
    </a>

    <div class="dots-container">
      <button class="dots" aria-expanded="false">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </button>
      <ul class="dropdown">
        <li><a href="#">Share</a></li>
        <li><a href="#">Edit Playlist</a></li>
        <li><a href="#">Delete</a></li>
      </ul>
    </div>
  </nav>

  <img src="/playlist-header.svg" alt="header" class="header-svg">

  <section class="meta-section">
    <h1>{playlist.title}</h1>
    <p>{playlist.description}</p>

    <div class="meta-info">
      <img src="/icons/profile-icon.svg" alt="profile picture">
      <p>Made by <strong>User { playlist.creator }</strong></p>
      <img src="/icons/clock.svg" alt="time">
      <p>2u 11m</p>
    </div>

    <div class="meta-play">
      <a><img src="/icons/download.svg" alt="download"></a>
      <a class="heart-svg"><img src="/icons/heart.svg" alt="like"></a>
      <a><img src="/icons/play.svg" alt="play"></a>
    </div>
  </section>

  {#if playlist}
    <section class="stories-section">
      <ul>
        {#each playlist.stories as story}
          <Story {story} />
        {/each}
      </ul>
    </section>
  {:else}
    <p>Playlist niet gevonden.</p>
  {/if}
</main>

<style>
* {
  color: var(--color-text-light);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav, .meta-section {
  padding: var(--space-md);
}

nav, .meta-section, .meta-info, .meta-play {
  max-width: 31.25em;
}

main {
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: var(--bg-image-playlist);
}

.header-svg {
  position: absolute;
  top: 0;
  z-index: 0;
}

nav {
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100%;
  margin-top: 3.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Styling for dots button*/
.dots-container {
  position: relative;
  display: inline-block;
}

.dots {
  background: none;
  border: none;
  cursor: pointer;
  width: 1.5rem; 
  height: 3.125em;
  display: flex;
  justify-content: space-between; 
  align-items: center;
}

/* Dots styling */
.dot {
  width: .37em;
  height: .4em;
  border-radius: 50%;
  background-color: black;
}

/* Dropdown menu */
.dropdown {
  position: absolute;
  top: 3em;
  left: auto;
  right: 0; 
  transform: none; 
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: none;
  list-style: none;
  padding: 0.5em 0;
  min-width: 8em;
  z-index: 1;
}

.dots:focus + .dropdown,
.dots-container:focus-within .dropdown {
  display: block;
}

.dropdown li {
  padding: 0.5em 1em;
}

.dropdown li a {
  text-decoration: none;
  color: black;
  display: block;
}

.dropdown li:hover {
  background: #f0f0f0;
}

/* Styling voor meta-info */
.meta-info, .meta-play {
  display: flex;
  align-items: center;
}

.meta-info {
  margin-top: 1em;
}

.meta-info > p:nth-of-type(1) {
  margin-right: auto;
}

.meta-section {
  margin-top: 37vh;
}

.meta-info > img {
  padding-right: .3em;
}

.heart-svg {
  margin: 0 auto 0 .5em;
}

/* Styling voor stories-section */
.stories-section {
  height: 25em;
  overflow-y: scroll;
  width: 100%;
  scrollbar-width: none;
}

.stories-section > ul {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.625em;
}

@media only screen and (min-width: 600px) {
  main {
    background-color: lightblue;
  }
}
</style>
