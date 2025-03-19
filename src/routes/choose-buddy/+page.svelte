<script>
  import { Back } from '$lib/index'

  export let data
  let buddyList

  function scrollCarousel(direction) {
    if (!buddyList) return

    const scrollAmount = buddyList.clientWidth;

    buddyList.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    })
}
</script>

<main>
  <section>
      <h1>Choose a buddy</h1>
      <p>During the learning journey your child will have a buddy that learns with them, gives reminders and shows the statistics! Here you can pick a buddy.</p>
      <p>Drag left or right, or use the buttons to see all the buddies!</p> 
  </section>

  <form>
    <div class="scroll-container">
        <ul bind:this={buddyList}>
            {#each data.buddys as { name, animal }}
                <li>
                    <img src={`/buddys/${name}.svg`} alt="{name} the {animal}">
                    <h2>{name}</h2>
                    <p>The {animal}</p>
                </li>
            {/each}
        </ul>
    </div>

      <nav class="carousel-nav">
          <button type="button" aria-label="Previous" on:click={() => scrollCarousel(-1)}>
              <Back color="white"/>
          </button>
          <button type="button" aria-label="Next" on:click={() => scrollCarousel(1)}>
              <Back color="white" flipped={true}/>
          </button>            
      </nav>
  </form>
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
  max-width: 720px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1em;
  display: flex;
  justify-content: start;
  scroll-behavior: smooth;
  white-space: nowrap;
}

ul {
  overflow-x: auto ;
  display: flex;
  gap: 1em;
  padding: 0;
  margin: 0;
  list-style: none;
  width: max-content;
  scroll-snap-type: x mandatory;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0 0 22em;
  text-align: center;
  padding: 0.3em;
  border-radius: 10px;
  scroll-snap-align: center;
}

li img {
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
      padding: 2em;
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
