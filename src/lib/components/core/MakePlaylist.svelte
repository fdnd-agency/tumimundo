<script>
    /**
     * Props:
     *   @prop {Object} data - Data required for rendering stories and playlists.
     *
     * Reactive Variables:
     *   $selectedLanguage: Tracks which language is selected for filtering stories.
     *   $selectedStories: Array of selected story IDs.
     *
     * State:
     *   formError: General error message for the form.
     *   formSuccess: Indicates if the form was submitted successfully.
     *   errors: Field-specific error messages.
     *   values: Field values to repopulate the form after a failed submit.
     *   formElement: Reference to the form DOM element.
     *
     * Methods:
     *   toggleStory(event): Toggles selection of stories in the playlist.
     *   closePopup(): Closes the popup dialog and resets form fields.
     */

    import { Input, Story, Check, SmallCross, AddStory } from '$lib/index'
    import { enhance } from '$app/forms';
    import { writable } from 'svelte/store';
    import { invalidateAll } from '$app/navigation';

    /** @type {Object} */
    export let data;

    

    /** @type {string} */
    let formError = '';
    /** @type {boolean} */
    let formSuccess = false;
    /** @type {Object} */
    let errors = {};
    /** @type {Object} */
    let values = {};
    /** @type {HTMLFormElement} */
    let formElement;

    /** @type {import('svelte/store').Writable<string>} */
    let selectedLanguage = writable('languages');
    /** @type {import('svelte/store').Writable<number[]>} */
    let selectedStories = writable([]);

    /**
     * Filter stories by selected language.
     * @type {Array}
     */
    $: stories = $selectedLanguage !== 'languages'
        ? data.stories.filter(story => story.language && story.language.toLowerCase() === $selectedLanguage.toLowerCase())
        : data.stories;

    /** @type {boolean} */
    $: noStoriesFound = stories.length === 0;

    /**
     * Toggle a story in the selectedStories store.
     * @param {CustomEvent} event - The toggle event with storyId and checked status.
     */
    function toggleStory(event) {
        const { storyId, checked } = event.detail;
        if (checked) {
            selectedStories.update(ids => [...ids, storyId]);
        } else {
            selectedStories.update(ids => ids.filter(id => id !== storyId));
        }
    }

    /**
     * Close the popup and reset form state.
     */
    function closePopup() {
        window.location.hash = 'create-playlist';
        if (formElement) {
            formElement.reset();
        }
        selectedStories.set([]);
        formError = '';
        formSuccess = false;
        errors = {};
        values = {};
    }
</script>

<dialog class="popup" id="popup">
    <div class="popup__content">
        <h2>Make a playlist!</h2>
        <form
            bind:this={formElement}
            action="?/createPlaylist"
            class="form"
            method="POST"
            novalidate
            use:enhance={async ({ formElement }) => {
                /**
                 * Handles the result of the form submission.
                 * @param {Object} result - The result object from the server.
                 */
                return async ({ result }) => {
                    if (result.type === 'success') {
                        formSuccess = true;
                        formError = '';
                        errors = {};
                        values = {};
                        formElement.reset();
                        selectedStories.set([]);
                        await invalidateAll();
                        setTimeout(() => {
                            closePopup();
                        }, 1000);
                    } else if (result.type === 'failure') {
                        formError = result.data.error;
                        errors = result.data.errors || {};
                        values = result.data.values || {};
                    }
                };
            }}
        >

        <Input
        name="Name"
        type="text"
        placeholder="Playlist name"
        value={values.title || ''}
        error={errors.title}
      />
      

            <Input
                name="Description"
                type="text"
                placeholder="Playlist description"
                value={values.description || ''}
                error={errors.description}
            />

            <h3>Add stories</h3>
            <p>Click on the + to add story to playlist</p>

            <section class="story-list">
                <ul>
                    {#if noStoriesFound}
                        <p class="no-stories-message">No stories found</p>
                    {:else}
                        {#each stories as story (story.id)}
                            <li>
                                <div class="story-item">
                                    <Story {story} />
                                    <AddStory
                                        storyId={story.id}
                                        checked={$selectedStories.includes(story.id)}
                                        on:toggle={(event) => toggleStory({ detail: { storyId: story.id, checked: event.detail.checked } })}
                                    />
                                </div>
                            </li>
                        {/each}
                    {/if}
                </ul>
            </section>
            {#if errors.stories}
                <span class="error">{errors.stories}</span>
            {/if}

            {#if formSuccess}
                <p class="success">Playlist created successfully!</p>
            {/if}
            <div class="buttons-container">
                <a href="#create-playlist" class="close-button" on:click={closePopup}>Cancel <SmallCross/></a>
                <button type="submit" class="create-button">Create <Check/></button>
            </div>
        </form>
    </div>
</dialog>

<style>
.error {
    color: #b60000;
    font-size: 1em;
    margin-top: 1em;
    text-align: center;
}
.success {
    color: #256639;
    font-size: 1em;
    margin-top: 2em;
    text-align: center;
}
.story-item {
    display: flex;
}

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
    z-index: 9999;
}
.popup__content {
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: #fff;
    padding: 1em;
    width: 30em;
    position: fixed;
    top: 50%;
    left: 50%;
    height: 80%;
    max-height: 90%;
    overflow: hidden;
    border: none;
    border-radius: var(--border-radius);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    position: relative;
}
li{
    margin-bottom: .2em;
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
