
<script>
    import { Story, Playlist, Menu, Carousel } from '$lib/index';

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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#F3A22A"/>
                        <path d="M17.0874 13.0613C17.7817 12.5241 17.7817 11.4759 17.0874 10.9387C14.9891 9.31508 12.6461 8.03537 10.146 7.14743L9.68929 6.98522C8.8155 6.67488 7.89254 7.26607 7.77425 8.16805C7.44374 10.6882 7.44374 13.3118 7.77425 15.8319C7.89254 16.7339 8.8155 17.3251 9.68929 17.0148L10.146 16.8526C12.6461 15.9646 14.9891 14.6849 17.0874 13.0613Z" fill="white"/>
                    </svg><a href="all-stories">31 min. 55 sec</a></small>
            </li>
            <li class="create-playlist">
                <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30" width="8" height="68" rx="4" fill="white"/>
                    <rect x="68" y="30" width="8" height="68" rx="4" transform="rotate(90 68 30)" fill="white"/>
                </svg>                
                <h3>Make a playlist !</h3>
                <small><a href="/create-playlist">Add your favorite stories in one playlist</a></small>
            </li>
        </ul>
    </section>

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
            {#each data.playlists.filter(playlist => playlist.isLiked) as playlist}
                <Playlist {playlist} />
            {/each}
        </section>
    </section>

    <section class="own-playlist suggested-playlist">
        <h2>Suggested playlists</h2>
        <section class="playlist-list">
            {#each data.playlists.filter(playlist => !playlist.isLiked) as playlist}
                <Playlist {playlist} />
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
    