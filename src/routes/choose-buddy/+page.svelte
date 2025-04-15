<script>
  import { Back, Button } from '$lib/index'
  
  export let data
  let buddyList
  let currentIndex = 1
  let selectedBuddy = data.buddys[0]?.name // first buddy standard selected

  function scrollCarousel(direction) {
    if (!buddyList) return

    const item = buddyList.querySelector('li')
    if (!item) return

    const itemWidth = item.clientWidth + parseInt(getComputedStyle(item).marginRight || 0)

    buddyList.scrollBy({
      left: direction * itemWidth,
      behavior: 'smooth'
    });

    setTimeout(updateSelectedOnScroll, 300);
  }

  function updateSelectedOnScroll() {
    if (!buddyList) return

    const containerRect = buddyList.getBoundingClientRect()
    const centerX = containerRect.left + containerRect.width / 2

    let closestIndex = 0
    let closestDistance = Infinity

    const items = Array.from(buddyList.querySelectorAll('li'))

    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect()
      const itemCenter = itemRect.left + itemRect.width / 2
      const distance = Math.abs(centerX - itemCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    });

    currentIndex = closestIndex + 1
    selectedBuddy = data.buddys[closestIndex]?.name
  }
</script>


<main>
  <section>
    <h1>Choose a buddy</h1>
    <p>During the learning journey your child will have a buddy that learns with them, gives reminders and shows the statistics! Here you can pick a buddy.</p>
    <p>Drag left or right, or use the buttons to see all the buddies!</p> 
  </section>

  <form method="POST">
    <div class="scroll-container">
      <ul bind:this={buddyList} on:scroll={updateSelectedOnScroll}>
        {#each data.buddys as { name, animal }}
          <li>
            <label>
              <img src={`/buddys/${name}.svg`} alt="{name} the {animal}">
              <input type="radio" name="buddy" value={name} bind:group={selectedBuddy} required>
              <h2>{name}</h2>
              <p>The {animal}</p>
            </label>
          </li>
        {/each}
      </ul>
    </div>

  <nav class="carousel-nav">
    <button type="button" aria-label="Previous" on:click={() => scrollCarousel(-1)}>
      <Back color="white" height="32" />
    </button>

    <h2><strong>{currentIndex}</strong></h2>

    <button type="button" aria-label="Next" on:click={() => scrollCarousel(1)}>
      <Back color="white" flipped={true} height="32" />
    </button>            
  </nav>

    <Button type="input" />
  </form>
</main>

<style>
label{
  display: flex;
  flex-direction: column;
}
input[type="submit"], button {
  position: relative;
}
input[type="radio"] {
  /* display: none; */
}
main {
  background: var(--bg-image-blue);
  color: white;
  height: 100vh;
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

p:first-of-type {
  max-width: 30em;
  margin-bottom: 1em;
}

nav {
  display: flex;
  gap: 3em;
  padding: 1em;
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
  background-color: var(--button-blue);
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
  overflow-x: auto;
  display: flex;
  padding: 1em;
  margin: auto;
  list-style: none;
  width: max-content;
  scroll-snap-type: x mandatory;
  padding-left: calc(50% - 9.375em);
  padding-right: calc(50% - 9.375em);
}

li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0 0 auto;
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

@media (max-height: 680px) {
  main {
    /* height: 130vh; */
    height: 100%;
  }
}
@media (min-width: 680px) {
  main {
    /* height: 120vh; */
    height: 100%;
  }
}
</style>
