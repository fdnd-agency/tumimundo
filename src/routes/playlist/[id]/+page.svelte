<script>
  import { Story, fetchApi, Back, Dropdown, DeleteSVG  } from '$lib/index';
  import { deleteFromCollection } from '$lib/api.js';

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
 
// Like playlist function
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

// Delete playlist function
  async function deletePlaylist(event) {
    event.preventDefault();

    if (!playlist?.id) {
      console.error('Geen playlist ID gevonden.');
      return;
    }

    try {
      await deleteFromCollection(fetch, 'tm_playlist', playlist.id);
      window.location.href = '/lessons';
    } catch (err) {
      console.error('Error deleting playlist:', err);
      error = err.message || 'Er is iets fout gegaan bij verwijderen.';
    }
  }

</script>

<main>
  <article>
      <header>
      <nav>
        <a href="/lessons" aria-label="go back" class="go-back-btn"><Back/></a>
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
          style="view-transition-name:playlist-image-{playlist.id};"
        />
      </picture>
    </header>

   <section class="meta-section">
    <h1 style="view-transition-name:playlist-title-{playlist.id};">
      {playlist.title}
    </h1>
    <p>{playlist.description}</p>

    <div class="meta-info">
      <img src="/icons/profile-icon.svg" alt="profile" height="30">
      <p>Made by <strong>User { playlist.creator }</strong></p>
      <img src="/icons/clock.svg" alt="time" height="20">
      <p>2u 11m</p>
      </div>

     <div class="meta-play"  style="view-transition-name:playlist-play-{playlist.id};">
        <a href="/download"><img src="/icons/download.svg" alt="download" height="27"></a>
        <button on:click={toggleLike} 
          class="heart-svg" 
          aria-label="{isLiked ? 'Unlike' : 'Like'}" 
          style="view-transition-name:playlist-like-{playlist.id};">
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


  <dialog id="delete">
    <div class="delete-content">
      <h2 class="black-text">Delete this playlist?</h2>
      <p class="black-text">It will be permanently removed from your profile, and you won't be able to recover it.</p>

      <div class="popup-btns">
        <a href="#" class="black-text cancel-btn">Cancel</a>
        <form method="POST" action={`/lessons/delete/${playlist.id}`} on:submit|preventDefault={deletePlaylist}>
          <button type="submit" class="delete-btn">Delete <DeleteSVG/></button>
        </form>
      </div>
    </div>
  </dialog>

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

/* Styling for delete popup */

dialog{
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 110vh;
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.delete-content{
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: #fff;
  max-width: 25em;
  width: 90%;
  position: fixed;
  top: 50%;
  left: 50%;
  height: 14em;
  overflow: hidden;
  border: none;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 1em;
  padding-left: 1.5em
}

.delete-content > h2{
  margin-bottom: 1em;
}

.popup-btns{
  margin-top: auto;
  margin-left: auto;
  display: flex;
}

.black-text{
  color: black;
}

dialog:target {
  opacity: 1;
  visibility: visible;
}

dialog:target .delete-content {
  opacity: 1;
}

.cancel-btn, .delete-btn{
  padding: .5em .7em .5em .7em;
  border-radius: var(--border-radius);
  font-weight: var(--font-weight-normal);
}

.cancel-btn{
  border: 1px solid black;
}

.delete-btn{
  margin-left: .5em;
  background-color: #D51D1D;
  display: flex;
  align-items: center;
  gap: .3em;
  font-size: 1em;
  border: none;
}

.delete-btn:hover{
  cursor: pointer;
}

.popup-btns a {
  display: flex;
  align-items: center;
}

</style>

