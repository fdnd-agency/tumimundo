<script>
  export let storyId;
  export let checked = false;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleChange(event) {
      checked = event.target.checked;
      dispatch('toggle', { checked });
  }
</script>

<label class="story-checkbox">
  <input 
      type="checkbox" 
      name="stories" 
      value={storyId}
      {checked}
      on:change={handleChange}
  />
  <span class="checkbox-custom">
      {#if checked}
          <!-- Check SVG -->
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6" r="5.5" stroke="#256639" fill="#256639"/>
              <path d="M3.5 6L5.5 8L8.5 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      {:else}
          <!-- Plus SVG -->
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6" r="5.5" stroke="#B0B0B0"/>
              <rect x="3" y="5.57141" width="6" height="0.857143" rx="0.428571" fill="#B0B0B0"/>
              <rect x="6.42871" y="3" width="6" height="0.857143" rx="0.428571" transform="rotate(90 6.42871 3)" fill="#B0B0B0"/>
          </svg>
      {/if}
  </span>
</label>

<style>
  .story-checkbox {
      cursor: pointer;
      display: flex;
      align-items: center;
  }

  .story-checkbox input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
  }

  .checkbox-custom {
      display: inline-block;
      width: 14px;
      height: 14px;
  }

  .story-checkbox input:focus + .checkbox-custom {
      outline: 2px solid #256639;
      border-radius: 50%;
  }
</style>
