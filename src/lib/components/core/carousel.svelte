<script>
        import { Story, Back } from '$lib/index';

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

<section class="all-stories">

<ul bind:this={storyList} class="story-list">
    {#each data.stories as story}
    <li>
        <Story {story} />
    </li>
    {/each}
</ul>

<nav class="carousel-nav">
    <button aria-label="Previous" on:click={() => scrollCarousel(-1)}>
        <Back color="white"/>
    </button>
    <ul>
        <li><input type="radio" aria-label="nav-button"></li>
        <li><input type="radio" aria-label="nav-button"></li>
        <li><input type="radio" aria-label="nav-button"></li>
    </ul>
    <button aria-label="Next" on:click={() => scrollCarousel(1)}>
        <Back color="white" flipped={true}/>
    </button>
</nav>

</section>


<style>


nav{
    display: flex;
    margin-top: var(--space-md);
    align-items: center;
    justify-content: center;
} 
nav > ul {
    display: flex;
    margin: 0 var(--space-lg);
}
nav > button {
    border: none;
    border-radius: var(--border-radius);
    padding: var(--space-sm);
    height: 2em;
    width: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #9264F4;
}
input[type=radio] {
    height: 1.2em;
    width: 1.2em;
    margin: var(--space-sm);
    padding: var(--space-md);
}
.story-list {
    margin: var(--space-md);
}
.story-list > li {
    scroll-snap-align: center;
}
.story-list {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: var(--grid-rows);
    gap: var(--space-xs);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: var(--space-md) 0;
    width: 100%;
    max-width: 23em;
    box-sizing: border-box;
}
    
@media only screen and (min-width: 600px) {
    main {
        align-items: center;
    }
    .story-list {
        grid-template-rows: repeat(4, auto);
    }
}
@media only screen and (min-width: 800px) {
    .story-list {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(4, auto);
        max-width: 44em;
    }
}

</style>
