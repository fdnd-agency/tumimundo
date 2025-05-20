<script>
    /**
     * Represents a popup dialog for creating a new playlist and selecting stories.
     *
     * Props:
     *   @prop {Object} data - Data required for rendering stories and playlists.
     *
     * Reactive Variables:
     *   $selectedLanguage: Tracks which language is selected for filtering stories.
     *
     * Methods:
     *   toggleStory(event):
     *     Toggles selection of stories in the playlist.
     *
     *   closePopup():
     *     Closes the popup dialog and resets form fields.
     *
     * Behavior:
     *   On successful form submission, resets fields and closes popup after a delay.
     *
     */
    import { Input, Story, Check, SmallCross, AddStory } from '$lib/index'
    import { enhance } from '$app/forms';
    import { writable } from 'svelte/store';
    import { invalidateAll } from '$app/navigation';

    export let data
    let formError = '';
    let formSuccess = false;
    let formElement;

    let selectedLanguage = writable('languages');
    let selectedStories = writable([]);

    $: stories = $selectedLanguage !== 'languages'
        ? data.stories.filter(story => story.language && story.language.toLowerCase() === $selectedLanguage.toLowerCase())
        : data.stories;

    $: noStoriesFound = stories.length === 0;

    function toggleStory(event) {
        const { storyId, checked } = event.detail;
        if (checked) {
            selectedStories.update(ids => [...ids, storyId]);
        } else {
            selectedStories.update(ids => ids.filter(id => id !== storyId));
        }
    }

    function closePopup() {
        window.location.hash = 'create-playlist';
        if (formElement) {
            formElement.reset();
        }
        selectedStories.set([]);
        formError = '';
        formSuccess = false;
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
            use:enhance={async ({ formElement }) => {
                return async ({ result }) => {
                    if (result.type === 'success') {
                        formSuccess = true;
                        formError = '';
                        formElement.reset();
                        selectedStories.set([]);
                        await invalidateAll();
                        setTimeout(() => {
                            closePopup();
                        }, 1000);
                    } else if (result.type === 'failure') {
                        formError = result.data.error;
                    }
                };
            }}
        >

            <Input name="Name" type="text" placeholder="Playlist name" />
            <Input name="Description" type="text" placeholder="Playlist description" />

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

            {#if formError}
                <p class="error">{formError}</p>
            {/if}
            {#if formSuccess}
                <p class="success">Playlist created successfully!</p>
            {/if}

            <div class="buttons-container">
                <a href="#create-playlist" class="close-button" on:click={closePopup}>Cancel <SmallCross /></a>
                <button type="submit" class="create-button">Create <Check /></button>
            </div>

        </form>
    </div>
</dialog>

<style>
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
  height: 100vh;
  border: none;
  z-index: 9999;
}

.popup__content {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 90%;
  max-width: 32em;
  height: auto;
  max-height: 90vh;
  padding: 1em;
  border-radius: var(--border-radius);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.story-list {
  min-height: 10em;
  max-height: 40vh;
  overflow-y: auto;
  padding-bottom: 1em;
  text-align: left;
}

.story-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li {
  margin-bottom: 0.2em;
}

h2{
    margin: auto;
}

h3,
p {
  text-align: left;
}

h3 {
  font-size: 1.2em;
}

p{
    margin-bottom: 1em;
}

.buttons-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: auto;
  padding-top: 1em;
  position: sticky;
  bottom: 0;
  background: white;
}

.close-button,
.create-button {
  padding: 0.5em 1em;
  border-radius: var(--border-radius);
  font-size: 1em;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.2em;
  box-shadow: 1px 3px 3px grey;
}

.close-button {
  color: black;
  background-color: #fff;
}

.create-button {
  color: white;
  background-color: #256639;
}

.popup:target {
  opacity: 1;
  visibility: visible;
}

.popup:target .popup__content {
  opacity: 1;
}

/* 📱 Responsive tweaks */
@media (min-width: 48em) {
  .popup__content {
    width: 80%;
  }
}

@media (min-width: 62em) {
  .popup__content {
    width: 60%;
  }
}

@media (min-width: 75em) {
  .popup__content {
    width: 40%;
  }
}

</style>
