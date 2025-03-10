<script>
    import { Input, Story } from '$lib/index'

    let stories = []

</script>

<dialog class="popup" id="popup">
    <div class="popup__content">
        <h2>Make a playlist!</h2>
      
      <form action="#" class="form" method="POST">
        <Input name="Name" placeholder="Playlist name"/>
        <Input name="Description" type="text" placeholder="Playlist description"/>
        
        <h3>Add stories</h3>
        <p>Click on the + to add story to playlist</p>
      
        <div class="buttons-container">
            <a href="#create-playlist" class="close-button">Cancel</a>
            <button class="create-button">Create</button>
        </div>

      </form>
    </div>
</dialog>

<style>

.popup {
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    transform: translate(-50%, -50%);
    padding: 1em;
    width: 100%;
    height: 110vh;
    border: none;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.popup__content {
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: #fff;
    padding: 1em;
    width: 30em;
    position: fixed; 
    top: 50%; 
    left: 50%; 
    height: 60%; 
    border: none; 
    border-radius: var(--border-radius); 
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
h3, p{
    text-align: left;
}
h3{
    font-size: 1.2em;
}
.buttons-container {
    display: flex;
    justify-content: center;
    gap: .5em;
    position: absolute;
    bottom: 1rem; 
    right: 1rem; 
}
.close-button, .create-button {
    padding: .5em;
    border-radius: var(--border-radius);
    font-size: 1em;
    border: none;
}
.close-button{
    color: black;
    background-color: fff;
    border: 1px solid black;
}
.create-button{
    color: white;
    background-color: #256639;
}
@media (max-width: 75em) {
  .popup__content {
    width: 60%;
    max-width: none;
  }
}
@media (max-width: 56.25em) {
  .popup__content {
    width: 70%;
  }
}
@media (max-width: 37.5em) {
  .popup__content {
    width: 90%;
  }
}
.popup:target {
    opacity: 1;
    visibility: visible;
}
.popup:target .popup__content {
    opacity: 1;
}

</style>