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
              <Back color="white" height="32"/>
          </button>
          <h2><strong>1</strong></h2>
          <button type="button" aria-label="Next" on:click={() => scrollCarousel(1)}>
              <Back color="white" flipped={true} height="32"/>
          </button>            
      </nav>
  </form>
</main>

<style>
button{
  background-color: var(--button-blue);
  border: none;
  padding-left: .3em;
  /* width: 4em; */
  /* border-radius: 1em; */
}
nav{
  display: flex;
  gap: 3em;
}
nav > button {
    border: none;
    border-radius: var(--border-radius);
    padding: var(--space-sm);
    height: 2.5em;
    width: 4em;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #9264F4; */
}
main {
  background: var(--bg-image-blue);
  color: white;
  height: 120vh;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

section {
  display: flex;
  flex-direction: column;
  padding: 1em;
}

h1 {
  margin: auto;
  margin-bottom: 2em;
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
  padding: 1em;
  margin: auto;
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
/* 
@media (max-width: 600px) {

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
} */
</style>
