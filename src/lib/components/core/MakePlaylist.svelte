<script>
    /** @type {import('./$types').PageData} */

    import { Input, Story, Check, SmallCross } from '$lib/index'
    import { writable } from 'svelte/store'

    export let data 

let selectedLanguage = writable('languages');
/** $: zorgt voor een reactive statement. de inhoud hiervan wordt automatisch geupdate wanneer data hierin wordt gewijzigd */
$: stories = [];
$: noStoriesFound = stories.length === 0;

$: {
    if ($selectedLanguage !== 'languages') {
        stories = data.stories.filter(story => 
            story.language && story.language.toLowerCase() === $selectedLanguage.toLowerCase()
        );
    } else {
        stories = data.stories;
    }
}

</script>

<dialog class="popup" id="popup">
    <div class="popup__content">
        <h2>Make a playlist!</h2>
      
      <form action="#" class="form" method="POST">
        <Input name="Name" placeholder="Playlist name"/>
        <Input name="Description" type="text" placeholder="Playlist description"/>
        
        <h3>Add stories</h3>
        <p>Click on the + to add story to playlist</p>

        <section class="story-list">
            <ul>
            {#if noStoriesFound}
                <p class="no-stories-message">No stories found</p>
            {:else}
                {#each stories as story (story.id)}
                <li>
                    <Story {story} /> 
                </li> 
                {/each}
            {/if}
            </ul>
        </section>
      
        <div class="buttons-container">
            <a href="#create-playlist" class="close-button">Cancel <SmallCross/></a>
            <button class="create-button">Create <Check/></button>
        </div>

      </form>
    </div>
</dialog>

<style>
.story-list {
    display: grid;          
    grid-template-rows: repeat(3, auto); 
    max-height: 16em;         
    overflow-y: auto;  
    flex-grow: 1;
    max-height: 40vh;
    min-height: 10em;   
    overflow-y: auto;
    padding-bottom: 1em;
    text-align: left;
}
.popup {
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
}
.popup__content {
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: #fff;
    padding: 1em;
    width: 30em;
    /* width: 100vw; */
    position: fixed; 
    top: 50%; 
    left: 50%; 
    height: 80%; 
    max-height: 90%;
    overflow: hidden;
    border: none; 
    border-radius: var(--border-radius); 
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
h3, p{
    text-align: left;
}
h3{
    font-size: 1.2em;
}
.buttons-container {
    display: flex;
    justify-content: center;
    gap: .5em;
    position: absolute;
    bottom: 1rem; 
    right: 1rem; 
}
.close-button, .create-button {
    padding: .5em;
    border-radius: var(--border-radius);
    font-size: 1em;
    border: none;
    display: flex;
    align-items: center;
    gap: .2em;
    box-shadow: 1px 3px 3px grey;
}
.close-button{
    color: black;
    background-color: #fff;
    /* border: 1px solid black; */
    /* font-weight: 600; */
}
.create-button{
    color: white;
    background-color: #256639;
}
@media (max-width: 75em) {
  .popup__content {
    width: 60%;
    max-width: none;
  }
}
@media (max-width: 56.25em) {
  .popup__content {
    width: 70%;
  }
}
@media (max-width: 37.5em) {
  .popup__content {
    width: 96%;
  }
}
.popup:target {
    opacity: 1;
    visibility: visible;
}
.popup:target .popup__content {
    opacity: 1;
}
@media only screen and (min-width: 600px) {
    .story-list {
        height: 15em;
    }
}
@media only screen and (max-width: 600px) {
    .story-list {
        min-height: 12em;
    }
}


</style>