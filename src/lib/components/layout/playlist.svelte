<script>
  import { Play, LikeButton, fetchApi } from '$lib/index';
  import { createEventDispatcher } from 'svelte';

  export let playlist;
  const { image, title, playtime, isLiked: initialIsLiked, likeId: initialLikeId } = playlist;

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

      dispatch('likeToggle', { playlistId: playlist.id, isLiked });
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  }
</script>

<article class="playlist-card">
  <div class="image-container">
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

  <div class="playlist-playtime flex-items">
    <Play/>
    <p>{playtime}</p>
  </div>

    <form action="/like" method="POST" on:submit|preventDefault={toggleLike}>
      {#if isLiked}
        <input type="hidden" name="likeId" value="{existingLikeId}" />
        <input type="hidden" name="_method" value="DELETE" />
      {:else}
        <input type="hidden" name="playlistId" value="{playlist.id}" />
        <input type="hidden" name="profileId" value="{profileId}" />
      {/if}
      
      <button type="submit" class="playlist-icons" aria-label="{isLiked ? 'Unlike' : 'Like'}">
        <LikeButton {isLiked} />
      </button>
    </form>
  </div>
</article>

<style>
  .playlist-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 10em;
    height: 16em;
    background-color: #fff;
    border-radius: 0.5em;
    padding: 0.5em;
    color: black;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
  }

  .image-container {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 0.5em;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .playlist-title {
    font-size: 0.85em;
    font-weight: 600;
    margin-top: 0.4em;
    margin-bottom: 0.4em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .playtime {
    display: flex;
    align-items: center;
    gap: 0.25em;
    font-size: 0.75em;
  }

  .like-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .like-button svg.liked,
  .like-button svg.liked path {
    fill: #F33232;
    stroke: #F33232;
  }

  .like-button svg.liked {
    animation: scale 0.4s ease-in-out;
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