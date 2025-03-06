<script>
    import { Button } from '$lib/index'
  
    export let data
  </script>
  
  <main>
    <section>
        <h1>Choose a buddy</h1>
        <p>During the learning journey your child will have a buddy that learns with them, gives reminders and shows the statistics! Here you can pick a buddy.</p>
        <p>Drag left or right, or use the buttons on the side to see all the buddies!</p> 

        <form>
            <div class="scroll-container">
            <ul>
                {#each data.buddys as { name, animal }}
                <li>
                    <img src="/buddys/{name}.svg" alt="Rat">
                    <h2>{name}</h2>
                    <p>{animal}</p>
                </li>
                {/each}
            </ul>
            </div>
        <Button type="input" variant="primary" />
      </form>
    </section>
  </main>
  
<style>

main {
    background: var(--bg-image-blue);
    color: white;
    height: 120vh;
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
}

h1 {
    margin: 2em 0;
}

p {
    max-width: 30em;
    margin-bottom: 1em;
}

/* Scrollbare container */
.scroll-container {
    width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 1em;
    display: flex;
    justify-content: center; 
    scroll-padding-left: 50%; 
}

/* Horizontale lijst */
ul {
    display: flex;
    gap: 1em;
    padding: 0;
    margin: 0;
    list-style: none;
}

/* Lijstitems */
li {
    flex: 0 0 auto;
    /* width: 200px; */
    text-align: center;
    /* background: rgba(255, 255, 255, 0.1); */
    padding: 1em;
    border-radius: 10px;
    scroll-snap-align: center;
}

/* Afbeeldingen */
li img {
    width: 100%;
    height: auto;
    border-radius: 10px;
}

/* Formulier */
form {
    width: 30em;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
  