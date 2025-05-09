<script>
  
  import { fetchApi, Play, LikeButton} from '$lib/index';
  import { createEventDispatcher } from 'svelte';


  export let playlist;
  const { image, title, playtime, stories, isLiked: initialIsLiked, likeId: initialLikeId } = playlist;

  let isLiked = initialIsLiked;
  let existingLikeId = initialLikeId;

  let profileId = 122;

  const dispatch = createEventDispatcher();

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
      if (response?.likeId) {
        existingLikeId = response.likeId;
      }
      
      // Dispatch een event naar de parent component
      dispatch('likeToggle', { playlistId: playlist.id, isLiked });
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  }
</script>

<article>
  <div class="playlist-image flex-items">
    <picture>
      <source srcset="{image}?width=128&format=avif" type="image/avif">
      <source srcset="{image}?width=128&format=webp" type="image/webp">
      <img
      src="{image}?width=128"
      alt="{title}"
      style="view-transition-name:playlist-image-{playlist.id};"
      />
    </picture>
  </div>

  <h3
  class="playlist-title"
  style="view-transition-name:playlist-title-{playlist.id};"
>
  <a href={`/playlist/${playlist.id}`} aria-label="Go to playlist">
    {title}
  </a>

  <div class="playlist-playtime flex-items"  style="view-transition-name:playlist-play-{playlist.id};">
    <Play/>
    <p>{playtime}</p>
  </div>

  <div class="playlist-icons flex-items">
    <form action="/like" method="POST" on:submit|preventDefault={toggleLike}>
      {#if isLiked}
        <input type="hidden" name="likeId" value="{existingLikeId}">
        <input type="hidden" name="_method" value="DELETE">
      {:else}
        <input type="hidden" name="playlistId" value="{playlist.id}">
        <input type="hidden" name="profileId" value="{profileId}">
      {/if}
      
      <button type="submit" class="playlist-icons" aria-label="{isLiked ? 'Unlike' : 'Like'}">
        <LikeButton {isLiked} />
      </button>
    </form>
  </div>
</article>



<style>
  h1 > a {
  position: relative;
  isolation: isolate;
  z-index: 0;
}
  :root {
    --small-space: .5em;
    --color-text: black;
  }

  p {
    font-size: var(--small-space);
  }

  .flex-items {
    display: flex;
    align-items: center;
  }

  article {
    width: 10em;
    height: 15em;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);

    background-color: #fff;
    overflow: hidden;
    padding: var(--small-space);
    border-radius: .25em;
    color: black;

    gap: .5em;
  }

  .playlist-title {
    font-size: 0.8em;
    font-weight: 600;
    grid-area: 4 / 1 / 5 / 3;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .playlist-image {
    grid-area: 1 / 1 / 4 / 3;
    justify-content: center;
  }

  .playlist-image img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: .25em;
  }

  .playlist-playtime {
    grid-area: 5 / 1 / 6 / 2;
    gap: var(--small-space);
  }

  .playlist-icons {
    grid-area: 5 / 2 / 6 / 3; 
    justify-content: flex-end;
  }

  .playlist-playtime svg:hover circle {
    fill: #3A54DE;
  }

  .playlist-icons button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  .playlist-icons button svg:hover, .playlist-icons button svg:hover path {
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

  :global(.playlist-icons button svg.liked, .playlist-icons button svg.liked path) {
    fill: #F33232;
    stroke: #F33232;
  }

  :global(.playlist-icons button svg.liked) {
    animation: scale .5s ease-in;
  }

/* view transition for title */
::view-transition-old(playlist-title-*),
::view-transition-new(playlist-title-*) {
  animation: fade-slide 0.4s ease;
}

@keyframes fade-slide {
  from {
    opacity: 0;
    transform: translateY(0.5em);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
