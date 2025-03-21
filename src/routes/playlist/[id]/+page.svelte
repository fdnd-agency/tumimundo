<script>
  
  import { Story, fetchApi, Dropdown  } from '$lib/index';

  export let data;
 
  let playlist = data?.playlist;

  let isLoading = !playlist;
  let error = null;

  $: {
    if (playlist) {
      isLoading = false;
    }
  }

  let isLiked = playlist?.isLiked || false;
  let existingLikeId = playlist?.likeId || null;
  let profileId = 122;
 
  async function toggleLike(event) {
    event.preventDefault();
 
    const endpoint = isLiked ? `/tm_likes/${existingLikeId}` : '/tm_likes';
    const method = isLiked ? 'DELETE' : 'POST';
 
    try {
      const response = await fetchApi(endpoint, method, {
        playlist: playlist.id,
        profile: profileId
      });
 
      isLiked = !isLiked;
      existingLikeId = response?.id || null;
      playlist = { ...playlist, isLiked, likeId: existingLikeId };
 
    } catch (err) {
      console.error('Error toggling like:', err);
      error = err.message || 'Er is iets fout gegaan';
    }
  }
</script>

<main>
  <article>
      <header>
      <nav>
          <a href="/lessons" aria-label="go back" class="go-back-btn">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3398 8.55508C27.0797 9.29502 27.0797 10.4947 26.3398 11.2346L17.5743 20.0001L26.3398 28.7656C27.0797 29.5055 27.0797 30.7052 26.3398 31.4452C25.5998 32.1851 24.4002 32.1851 23.6602 31.4452L13.555 21.3399C12.815 20.6 12.815 19.4003 13.555 18.6603L23.6602 8.55508C24.4002 7.81514 25.5998 7.81514 26.3398 8.55508Z" fill="black"/>
            </svg>
          </a>
        <Dropdown/>
      </nav>

      <picture class="playlist-image-container">
        <source srcset="{playlist.image}?width=448&format=avif" type="image/avif">
        <source srcset="{playlist.image}?width=448&format=webp" type="image/webp">
        <source srcset="{playlist.image}?width=448" type="image/jpeg">
        <img 
          src="{playlist.image}?width=64" 
          alt="playlist"
          height="380" 
          width="448" 
          class="playlist-image"
        />
      </picture>
    </header>
    

   <section class="meta-section">
    <h1>{playlist.title}</h1>
    <p>{playlist.description}</p>

    <div class="meta-info">
      <img src="/icons/profile-icon.svg" alt="profile" height="30">
      <p>Made by <strong>User { playlist.creator }</strong></p>
      <img src="/icons/clock.svg" alt="time" height="20">
      <p>2u 11m</p>
    </div>

     <div class="meta-play">
      <a href="/download"><img src="/icons/download.svg" alt="download" height="27"></a>
        <button on:click={toggleLike} class="heart-svg" aria-label="{isLiked ? 'Unlike' : 'Like'}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class:liked={isLiked}>
            <path d="M11.6536 7.15238C11.8471 7.33832 12.1529 7.33832 12.3464 7.15238C13.1829 6.34871 14.326 5.75 15.6 5.75C18.1489 5.75 20.25 7.64769 20.25 10.0298C20.25 11.7261 19.4577 13.1809 18.348 14.428C17.2397 15.6736 15.7972 16.7316 14.4588 17.6376L12.1401 19.207C12.0555 19.2643 11.9445 19.2643 11.8599 19.207L9.54125 17.6376C8.20278 16.7316 6.76035 15.6736 5.65201 14.428C4.54225 13.1809 3.75 11.7261 3.75 10.0298C3.75 7.64769 5.85106 5.75 8.4 5.75C9.67403 5.75 10.8171 6.34871 11.6536 7.15238Z" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <a href="/play"><img src="/icons/play.svg" alt="play" height="60"></a>
    </div>
  </section>

    {#if isLoading}
    <div class="loading">Loading playlist...</div>
  {:else if error}
    <p class="error">Error loading playlist: {error}</p>
  {:else if playlist && playlist.stories.length > 0}
    <section class="stories-section">
      <ul>
        {#each playlist.stories as story}
        <li>
          <Story {story} />
        </li>
        {/each}
      </ul>
    </section>
  {:else}
    <section class="no-playlist">
      <p>Playlist not found.</p>
      <a href="/lessons" class="view-all">View all playlists</a>
    </section>
  {/if}
  </article>
</main>

<style>
* {
  color: var(--color-text-light);
}
main{
  display: flex;
  background-image: var(--bg-image-playlist);
  min-height: 100vh;
}
.view-all{
  text-decoration: underline;
}
.go-back-btn{
  z-index: 10;
}
nav, .meta-section {
  padding: var(--space-md);
}
nav, .meta-section, .meta-info, .meta-play {
  max-width: 31.25em;
  width: 100%;
  flex-wrap: wrap;
}
.playlist-image-container {
  z-index: 0;
  height: auto; 
  aspect-ratio: 1 / 1; 
  overflow: hidden; 
  padding: 1em 1em 0 1em;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.playlist-image {
  height: calc(100% - 5em); 
  width: calc(100% - 5em); 
  aspect-ratio: 1 / 1;
  object-fit: cover; 
  display: block; 
  border-radius: var(--border-radius);
}
article {
  margin: 0 auto;
  height: max-content;
  width: 31.25em;;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}
header{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
nav{
  position: absolute;
  width: 100%;
  margin-top: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
a {
  z-index: 0;
}
/* styling for meta info */
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
.meta-info > img {
  padding-right: .3em;
}
.heart-svg {
  margin: 0 auto 0 .5em;
}
/* styling for stories section */
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
.no-playlist{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10em; 
}

  .heart-svg {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 auto 0 .5em;
  }
  
  .heart-svg svg {
  width: 24px;
  height: 24px;
  }
  
  .heart-svg svg.liked {
  fill: #F33232;
  stroke: #F33232;
  }
  
  @keyframes scale {
  0%, 100% {
  transform: scale(1);
  }
  50% {
  transform: scale(1.4);
  }
  }
  

  .heart-svg svg.liked {
  animation: scale .5s ease-in;
  }
  </style>

