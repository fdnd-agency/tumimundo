<script>
  export let type = 'text';
  export let placeholder = '';
  export let value = '';
  export let name = '';
  export let inputClass = '';
  export let label = '';
  export let error = '';
</script>

<label for={name}>
  {#if label}
    {label}
  {:else if type === 'email'}
  Email
  {:else if type === 'password'}
    Password
  {:else}
    Name
  {/if}
</label>

{#if type === 'email'}
  <input
    type="email"
    id={name}
    name={name}
    placeholder={placeholder}
    aria-label={name}
    bind:value={value}
    class={inputClass}
  />
{:else if type === 'password'}
  <input
    type="password"
    id={name}
    name={name}
    placeholder={placeholder}
    aria-label={name}
    bind:value={value}
    class={inputClass}
  />
  {#if error}
    <span class="error">{error}</span>
  {/if}
{:else}
  <input
    type="text"
    id={name}
    name={name}
    placeholder={placeholder}
    aria-label={name}
    bind:value={value}
    class={inputClass}
    required
  />
  {#if error}
    <span class="error">{error}</span>
  {/if}
  {/if}

<style>
  label {
    color: black;
    margin-bottom: .6em;
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 1.2rem;
  }
  input {
    background-color: #EEEEEE;
    border: none;
    margin-bottom: 1.2em;
    font-size: 1rem;
    height: 2rem;
    width: 100%;
    border-radius: .5em;
    padding: 1.5rem 1rem;
    box-sizing: border-box;
  }
  .error {
    color: #b60000;
    font-size: 0.95em;
    margin-top: -1em;
    margin-bottom: 1em;
    display: block;
    text-align: left;
  }
</style>