<script>
    import { Playlist, Menu, Carousel, Play, Plus, Input, MakePlaylist } from '$lib/index';


    let currentPage = "lessons";

    /** @type {import('./$types').PageData} */
    export let data;

    let storyList;

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
            <div class="playlist-list">
                <ul class="playlist-scroll-list">
                    <li class="create-playlist">
                        <a href="#popup">
                        <Plus/>
                            <h3>Make a playlist</h3>
                            <small>Add your favorite stories in one playlist</small> 
                        </a>
                    </li>
                    {#each data.playlists.slice().reverse() as playlist (playlist.id)}
                        <li>
                        <Playlist {playlist} on:likeToggle={handleLikeToggle} />
                        </li>
                    {/each}
                </ul>
            </div>
    </section>

    <MakePlaylist {data}/>
    
    <section class="all-stories">
        <h2>All stories</h2>
        <nav class="language-filter">
            <label for="checkbox-nl"><img src="/languages/Dutch.svg" alt="dutch" width="20" height="20">Dutch</label>
            <input type="checkbox" id="checkbox-nl">

            <label for="checkbox-en"><img src="/languages/English.svg" alt="english" width="20" height="20">English</label>
            <input type="checkbox" id="checkbox-en">

            <a href="/all-stories">Show all</a>
        </nav>
        <Carousel {data}/>
    </section>

    <section class="own-playlist">
        <h2>Liked playlists</h2>
        <div class="playlist-list">
            <ul class="playlist-scroll-list">
                {#each data.playlists.filter(playlist => playlist.isLiked) as playlist (playlist.id)}
                    <li><Playlist {playlist} on:likeToggle={handleLikeToggle} /></li>
                {/each}
            </ul>
        </div>
    </section>

    <section class="own-playlist suggested-playlist">
        <h2>Suggested playlists</h2>
        <div class="playlist-list">
            <ul class="playlist-scroll-list">
                {#each data.playlists.filter(playlist => !playlist.isLiked) as playlist (playlist.id)}
                    <li><Playlist {playlist} on:likeToggle={handleLikeToggle} /></li>
                {/each}
            </ul>
        </div>
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

.create-playlist{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10em;
    height: 16em;
    background-color: #fff;
    border-radius: 0.5em;
    padding: 0.5em;
    color: black;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);

    & a{
        color: white;
    }

    & h3{
        margin-top: 1em;
        font-size: 1em;
        font-weight: bold;
        margin-bottom: 1em;
    }

    & small{
        margin-top: auto;
    }
}


.playlist-1 > a small {
    color: var(--color-text);
    display: flex;
    align-items: center;
    justify-content: center;
}

.own-playlist {
    display: flex;
    flex-direction: column;
}

/* Styling for "all stories" section & carousel nav */
.all-stories {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 31.25em ;
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

/* Styling for suggested playlist page */
.playlist-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-lg);
    overflow-x: auto;
    padding-bottom: var(--space-md);
    scroll-snap-type: x mandatory;
}
.playlist-scroll-list{
    display: flex;
    flex-direction: row ;
    gap: 1em;
}

@media only screen and (min-width: 600px) {
    main {
        align-items: center;
    }
}
    </style>
