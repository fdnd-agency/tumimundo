<script>
  import { onMount } from 'svelte';
  import Eclipse from '../../lib/components/svg/Eclipse.svelte';

  let currentSlide = 0;

  onMount(() => {
    const carousel = document.querySelector('.carousel');
    const indicators = document.querySelectorAll('.indicator');

    const buttons = document.querySelectorAll('.carousel-button');
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const direction = this.classList.contains('left') ? -1 : 1;
        scrollCarousel(carousel, direction);
      });
    });

    function scrollCarousel(carousel, direction) {
      const scrollAmount = carousel.clientWidth;
      carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      });

      currentSlide = (currentSlide + direction + indicators.length) % indicators.length;
    }

    indicators.forEach(indicator => {
      indicator.addEventListener('click', function () {
        const targetSlide = Number(this.dataset.slide);
        const difference = targetSlide - currentSlide;

        scrollCarousel(carousel, difference);
        currentSlide = targetSlide;
      });
    });
  });
</script>

<main>
  <section>
    <ul class="carousel">
      <li>
        <section>
          <a href="/sign-up">Skip</a>
            <div class="mouse">
              <!-- <svg width="242" height="242" viewBox="0 0 242 242" fill="none" xmlns="http://www.w3.org/2000/svg" class="eclipse">
                <circle cx="121" cy="121" r="121" fill="hsla(213, 53%, 52%, 1)"/>
              </svg>                         -->
              <Eclipse/>
              <picture class="rat">
                <source srcset="/characters/Rat.svg?format=avif" type="image/avif">
                <source srcset="/characters/Rat.svg?format=webp">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src="/characters/Rat.svg" alt="rat image" height="250">
              </picture>
            </div>

            <div class="carousel-indicators">
              <span class="indicator active" data-slide="0"></span>
              <span class="indicator" data-slide="1"></span>
              <span class="indicator" data-slide="2"></span>
            </div>
          
            <h1>Learn languages</h1>
            <p>
                Every household is different. Some only speak one language, others even as much as three!
                Learning more than one language has great neurological benefits for anyone at any age. With TuMi Mundo your child can learn up to 3 languages.
            </p>
          <button type="button" class="carousel-button right button-1" data-target=".carousel" aria-label="right-button">Continue</button>  
        </section>
      </li>

      <li>
        <section class="slide-2">
          <a href="/sign-up">Skip</a>
            <div class="mouse">
              <Eclipse color="hsla(199, 48%, 38%, 1)" />
              <picture class="rat">
                <source srcset="/characters/Rat.svg?format=avif" type="image/avif">
                <source srcset="/characters/Rat.svg?format=webp">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src="/characters/Rat.svg" alt="rat image" height="250">
              </picture>
            </div>

            <div class="carousel-indicators">
              <span class="indicator" data-slide="0"></span>
              <span class="indicator active" data-slide="1"></span>
              <span class="indicator" data-slide="2"></span>
            </div>
          
            <h1>Test the progress</h1>
            <p>
                During the learning journal you can measure the improvement of your child.  
                There is an option to share the data with researchers to further improve the method and participate in special researches! You can manage the option to share your data at any given time in the app.
            </p>
          <button type="button" class="carousel-button right button-2" data-target=".carousel" aria-label="right-button">Continue</button>  
        </section>
      </li>

      <li>
        <section class="slide-3">
          <a href="/sign-up">Skip</a>
            <div class="mouse">
              <Eclipse color="hsla(173, 95%, 25%, 1)" />                     
              <picture class="rat">
                <source srcset="/characters/Rat.svg?format=avif" type="image/avif">
                <source srcset="/characters/Rat.svg?format=webp">
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src="/characters/Rat.svg" alt="rat image" height="250">
              </picture>
            </div>

            <div class="carousel-indicators">
              <span class="indicator" data-slide="0"></span>
              <span class="indicator" data-slide="1"></span>
              <span class="indicator active" data-slide="2"></span>
            </div>
        
            <h1>See the results</h1>
            <p>
              See the results of the tests and watch as your child learns a language with TuMi Mundo.
              The older your child becomes the further into the method you go, it starts with listening, it ends with being able to have a full conversation.
            </p>
          <a href="/sign-up" class="make-acc">Make an account</a>
        </section>
      </li>
    </ul>
  </section>
</main>

<style>

* {
  color: var(--color-white);
  text-decoration: none;
  --main-blue: hsla(215, 74%, 65%, 1);
  --secondary-blue: hsla(213, 53%, 52%, 1);
}
section:nth-of-type(1) {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  width: 100vw;
}
.slide-2{
  background-color: hsla(195, 49%, 48%, 1);
}
.slide-3{
  background-color: hsla(174, 94%, 34%, 1);
}
.mouse {
  width: 100%;
  height: 25em;
  display: flex;
  justify-content: center; 
  align-items: center;   
  position: relative; 
}
picture {
  position: relative; 
}
.rat {
  position: absolute;
  top: 0; 
  left: 0; 
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  max-width: 100%;
  height: auto;
}
h1, p {
  text-align: center;
}
h1 {
  font-size: 1.25em;
  margin-bottom: 1em;
}
p {
  font-size: .8em;
  max-width: 45ch;
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
}
a:nth-of-type(1) {
  margin-left: auto;
  color: var(--color-white);
  font-size: 1.25em;
  padding: 1em;
}
button, a:nth-of-type(2) {
  margin: auto;
  margin-bottom: 2.5em;
  border-radius: .6em;
  width: 80%;
  padding: 1em;
  text-align: center;
  font-size: 1em;
  border: none;
}
.button-1 {
  background-color: hsla(213, 53%, 52%, 1); 
}
.button-2 {
  background-color: hsla(198, 43%, 41%, 1);
}
.make-acc{
  background-color: hsla(173, 94%, 24%, 1);
}

.carousel{
  display: flex;
  scroll-snap-type: x mandatory;
  width: 100%;
  overflow: auto;
  align-self: center;
}
.carousel > li{
  scroll-behavior: smooth;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh; 
  width: 100vw;
  background-color: var(--main-blue);
}
.carousel-indicators {
  display: flex;
  justify-content: center;
  margin-bottom: 1.8em;
  z-index: 10;
}
.indicator {
  width: .6em;
  height: .6em;
  border-radius: 50%;
  border: 1px solid lightgray;
  background-color: transparent;
  margin: 0 5px;
  cursor: pointer;
}
.indicator.active {
  background-color: var(--color-white); 
}

</style>
