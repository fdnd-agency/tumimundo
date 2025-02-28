
<script>
 // Standard data
  export let type = 'button';
  export let label = 'Continue';
  export let onClick = () => {};
</script>


{#if type === 'button'}
  <button on:click={onClick}>{label}</button>
{:else if type === 'input'}
  <input type="submit" value={label} on:click={onClick} />
{/if}

<style>

input[type="submit"], button{
    width: 85%;
    padding: .8em;
    border-radius: .4em;
    border: none;
    font-size: 1.1em;
    color: #4f4f4f;
    background-color: #d4d4d4 ;
    position: fixed;
    bottom: 0;
    margin-bottom: 2.5em;
}
input[type="submit"]:hover,:focus{
    cursor: pointer;
    color: white;
    background-color: #215165 ;
    border: 1px solid red;
}
    
</style>