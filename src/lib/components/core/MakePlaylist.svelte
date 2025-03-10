<script>
    import { Input, Story } from '$lib/index'

    let stories = []
</script>

<dialog open>
    <h2>Make a playlist!</h2>

    <div class="make-playlist-container">
        <Input name="Name" placeholder="Playlist name"/>
        <Input name="Description" type="text" placeholder="Playlist description"/>

        <section>
            <h3>Add stories</h3>
            <p>Click on the + to add story to playlist</p>

                {#each stories as story (story.id)}
                    <Story {story} />
                {/each}
        </section> 
    </div>
    
</dialog>

<style>

.make-playlist-container{
    width: 100%;
}

dialog{
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* inset: 50%; */
    transform: translate(-50%, -50%); /* Centreert perfect */
    padding: 1em;
    width: 90%;
    height: 60%;
    border: none;
    border-radius: var(--border-radius);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
h3{
    font-size: 1.2em;
}
@media only screen and (min-width: 600px) {
    dialog {
        max-width: 31.5em;
    }
}

</style>