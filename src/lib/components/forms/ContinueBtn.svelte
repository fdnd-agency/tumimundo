<script>
  export let type = 'button'; 
  export let label = 'Continue';
  export let variant = 'primary'; 
  export let onClick = () => {};
</script>

{#if type === 'button'}
  <button class={variant} on:click={onClick}>{label}</button>
{:else if type === 'input'}
  <input type="submit" class={variant} value={label} on:click={onClick} />
{/if}

<style>
  :global(:root) {
    --button-blue: hsl(200, 52%, 46%);
    --button-darker-blue: hsl(200, 49%, 26%);
    --button-grey: hsl(0, 0%, 75%);
  }

  input[type="submit"], button {
    margin-top: auto;
    width: 85%;
    max-width: 31.25em;
    padding: .8em;
    border-radius: .4em;
    border: none;
    font-size: 1.1em;
    bottom: 0;
    margin-bottom: 2.5em;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .primary {
    background-color: var(--button-blue);
    color: var(--primary-text);
  }

  .primary:hover, .primary:focus {
    background-color: var(--primary-hover);
  }

  .secondary {
    background-color: var(--button-grey);
    color: hsl(0, 0%, 48%);
  }

  .secondary:hover, .secondary:active {
    background-color: var(--button-darker-blue);
    color: white;
  }
</style>
