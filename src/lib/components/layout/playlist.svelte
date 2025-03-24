<script>
  
  import { FetchApi, Play, LikeButton} from '$lib/index';
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
      const response = await FetchApi(endpoint, method, {
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
    <img src="{image}" alt="">
  </div>

  <h3 class="playlist-title">
    <a href={`/playlist/${playlist.id}`} aria-label="Go to playlist page">{title}</a>
  </h3>

  <div class="playlist-playtime flex-items">
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
    line-clamp: 2;
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

  .playlist-icons button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
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

</style>
