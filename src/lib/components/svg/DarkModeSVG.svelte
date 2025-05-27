<script>
  export let darkMode = true;
</script>

<div class="icon-label">
  {#if darkMode}
    <!-- Moon -->
    <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 20C7.5 25 14.5 26 20.5 22.5C19 22.5 13.5 21 10.5 16C7.5 11 8.5 5.5 10.5 3C6.5 4 3.5 7 2 11C1 14.5 2 17.5 4 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>Dark</span>
  {:else}
    <!-- Sun -->
    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16.5" cy="16.5" r="6.5" stroke="white" stroke-width="2.5"/>
      <line x1="16.5" y1="2" x2="16.5" y2="6" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="16.5" y1="27" x2="16.5" y2="31" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="2" y1="16.5" x2="6" y2="16.5" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="27" y1="16.5" x2="31" y2="16.5" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="6" y1="6" x2="9" y2="9" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="27" y1="27" x2="24" y2="24" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="6" y1="27" x2="9" y2="24" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="27" y1="6" x2="24" y2="9" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
    <span>Light</span>
  {/if}
</div>

<style>
  .icon-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-family: sans-serif;
    font-size: 1em;
    gap: 0.2em;
  }
</style>
