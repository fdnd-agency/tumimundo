<script>
  export let isLiked = false;
</script>

<svg 
  width="24" height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg" 
  class:liked={isLiked}
>
  <path 
    d="M11.6536 7.15238C11.8471 7.33832 12.1529 7.33832 12.3464 7.15238C13.1829 6.34871 14.326 5.75 15.6 5.75C18.1489 5.75 20.25 7.64769 20.25 10.0298C20.25 11.7261 19.4577 13.1809 18.348 14.428C17.2397 15.6736 15.7972 16.7316 14.4588 17.6376L12.1401 19.207C12.0555 19.2643 11.9445 19.2643 11.8599 19.207L9.54125 17.6376C8.20278 16.7316 6.76035 15.6736 5.65201 14.428C4.54225 13.1809 3.75 11.7261 3.75 10.0298C3.75 7.64769 5.85106 5.75 8.4 5.75C9.67403 5.75 10.8171 6.34871 11.6536 7.15238Z" 
    stroke="#C4C4C4" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  />
</svg>

<style>
  .liked {
    fill: #F33232;
    stroke: #F33232;
    animation: scale 0.5s ease-in;
  }

  @keyframes scale {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.4);
    }
  }
</style>
