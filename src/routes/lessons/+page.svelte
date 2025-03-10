
<script>
    import { Story, Playlist, Menu, Carousel, Play, Plus, Input, MakePlaylist } from '$lib/index';


    let currentPage = "lessons";

    /** @type {import('./$types').PageData} */
    export let data;

    let storyList;

    function scrollCarousel(direction) {
        const scrollAmount = storyList.clientWidth; 
        storyList.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth',
        });
    }
    function handleLikeToggle(event) {
        const { playlistId, isLiked } = event.detail;
        data.playlists = data.playlists.map(playlist => 
            playlist.id === playlistId 
                ? { ...playlist, isLiked: isLiked }
                : playlist
        )
    }

</script>

<main>
    <Menu {currentPage}/>

    <header>
        <h1>Lessons</h1>

        <ul>
            <li>1. Listening</li>
        </ul>
    </header>

    <section class="own-playlist">
        <h2>Own playlists</h2>
        <ul>
            <li class="playlist-1">
                <picture>
                    <source srcset="https://fdnd-agency.directus.app/assets/263e541a-9dd8-4978-8ad0-9a6e5b9dfe1a.webp" type="image/webp">
                    <img src="https://fdnd-agency.directus.app/assets/263e541a-9dd8-4978-8ad0-9a6e5b9dfe1a" class="story-img" alt="story">
                </picture>
                <h3>The octopus who was very hungry</h3>
                    <small> 
                        <Play/>  
                        <a href="all-stories">31 min. 55 sec</a>
                    </small>
            </li>
            <li class="create-playlist">
                <a href="#popup">
                   <Plus/>
                    <h3>Make a playlist !</h3>
                    <small>Add your favorite stories in one playlist</small> 
                </a>
            </li>
        </ul>
    </section>

    <MakePlaylist {data}/>
    
    <section class="all-stories">
        <h2>All stories</h2>

        <nav class="language-filter">
            <label for="checkbox-nl"><img src="/languages/Dutch.svg" alt="dutch">Dutch</label>
            <input type="checkbox" id="checkbox-nl">

            <label for="checkbox-en"><img src="/languages/English.svg" alt="english">English</label>
            <input type="checkbox" id="checkbox-en">

            <a href="/all-stories">Show all</a>
        </nav>

        <Carousel {data}/>
    </section>

    <section class="own-playlist">
        <h2>Liked playlists</h2>
        <section class="playlist-list">
            {#each data.playlists.filter(playlist => playlist.isLiked) as playlist (playlist.id)}
                <Playlist {playlist} on:likeToggle={handleLikeToggle} />
            {/each}
        </section>
    </section>

    <section class="own-playlist suggested-playlist">
        <h2>Suggested playlists</h2>
        <section class="playlist-list">
            {#each data.playlists.filter(playlist => !playlist.isLiked) as playlist (playlist.id)}
                <Playlist {playlist} on:likeToggle={handleLikeToggle} />
            {/each}
        </section>
    </section>

</main>


<style>
    :root {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    main {
        height: 100%;
        color: var(--color-text-light);
        background-image: var(--bg-image-purple);
        display: flex;
        flex-direction: column;
        padding-bottom: 5em;
    }
    
    section {
        padding: var(--space-md);
    }
    
    h1 {
        margin-top: var(--space-lg);
        margin-bottom: var(--space-md);
    }
    
    h2 {
        font-size: var(--font-size-lg);
        margin-bottom: var(--space-sm);
    }
    
    header {
        margin-bottom: var(--space-lg);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    /* Styling for "own playlist" section */
    .create-playlist, .playlist-1 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .create-playlist > a{
        color: white;
    }
    
    .playlist-1 {
        background-color: var(--color-text-light);
        color: var(--color-text);
    }
    
    .playlist-1 > a small {
        color: var(--color-text);
    }
    
    .playlist-1 > h3 {
        font-weight: var(--font-weight-bold);
        color: var(--color-text);
    }
    
    .own-playlist {
        display: flex;
        flex-direction: column;
    }
    
    .own-playlist > ul {
        display: flex;
        gap: var(--space-sm);
        overflow-x: auto;
    }
    
    .own-playlist > ul > li {
        height: 12.5rem;
        width: 9rem;
        color: var(--color-text);
        border-radius: var(--border-radius);
        padding: var(--space-md);
    }
    
    /* Styling for "all stories" section & carousel nav */
    .all-stories {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .all-stories > h2 {
        align-self: start;
        margin: 0;
    }
    
    nav {
        display: flex;
        margin-top: var(--space-md);
        align-items: center;
        justify-content: center;
    }

    .story-img {
        width: 100%; 
        max-width: 100%; 
        height: auto;
    }
    .language-filter {
        display: flex;
        align-items: center;
        width: 100%;
    }
    
    .language-filter > a {
        margin-left: auto;
        color: var(--color-white);
    }
    
    .language-filter > a:hover {
        text-decoration: underline;
    }
    
    label {
        display: flex;
        align-items: center;
        padding: var(--space-xs);
        padding-right: var(--space-sm);
        background-color: hsla(263, 21%, 62%, 1);
        color: var(--color-text);
        border-radius: var(--border-radius);
    }
    
    label:nth-of-type(1) {
        margin-right: var(--space-md);
    }
    
    input[type=checkbox] {
        opacity: 0;
        position: absolute;
    }
    
    input[type=checkbox]:checked + label {
        background-color: var(--color-text-light);
        font-weight: var(--font-weight-bold);
    }
    
    label > img {
        height: 1.5em;
        width: auto;
        margin-right: var(--space-sm);
    }
    
    /* Styling for "create playlist" section */
    .create-playlist {
        background-color: hsla(248, 27%, 36%, 1);
        text-align: center;
        color: var(--color-text-light);
    }
    
    .create-playlist > h3 {
        margin-bottom: var(--space-md);
        color: var(--color-text-light);
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-md);
    }
    
    .create-playlist > small {
        color: var(--color-text-light);
    }
    
    .playlist-1 > small {
        align-self: start;
        margin-top: auto;
    }
    
    /* Styling for suggested playlist page */
    section.playlist-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-lg);
        overflow-x: auto;
        padding-bottom: var(--space-md);
        scroll-snap-type: x mandatory;
    }
    
    @media only screen and (min-width: 600px) {
        main {
            align-items: center;
        }
    }
    </style>
    