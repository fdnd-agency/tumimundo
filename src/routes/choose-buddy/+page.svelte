<script>
    import { Button } from '$lib/index'
    
    export let data
  </script>
    
  <main>
    <section>
      <h1>Choose a buddy</h1>
      <p>During the learning journey your child will have a buddy that learns with them, gives reminders and shows the statistics! Here you can pick a buddy.</p>
      <p>Drag left or right, or use the buttons to see all the buddies!</p> 
  
      <form>
        <div class="scroll-container">
          <ul>
            {#each data.buddys as { name, animal }}
              <li>
                <img src="/buddys/{name}.svg" alt="{name} the {animal}">
                <h2>{name}</h2>
                <p>The {animal}</p>
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
    box-sizing: border-box;
    width: 100%;
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    width: 100%;
}

h1 {
    margin: 2em 0;
}

p {
    max-width: 30em;
    margin-bottom: 1em;
}

.scroll-container {
    width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 1em;
    display: flex;
    justify-content: start;
}

ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 1em;
    padding: 0;
    margin: 0;
    list-style: none;
}

li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 28em;
    text-align: center;
    padding: 2em;
    border-radius: 10px;
    scroll-snap-align: center;
}

li img {
    /* width: 100%; */
    height: auto;
    border-radius: 10px;
}

form {
    width: 100%;
    max-width: 30em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

@media (max-width: 600px) {
    .scroll-container {
    padding-left: 10%;
    padding-right: 10%;
    }

    li {
    width: 100%; 
    padding: 3em;
    /* width: 23em; */
    }

    h1 {
    font-size: 1.5em;
    }

    p {
    font-size: 1em;
    margin-bottom: 0.5em;
    }
}
  </style>
  