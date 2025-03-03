<script>
import { Input, Back } from '$lib/index'

</script>

<title>sign-up</title>
<main>
    <section>
        <div class="heading">
            <a href="/onboarding">
                <Back color="black"/>
            </a>
            <h1>Sign up</h1> 
        </div>
    
        <form action="/profile-selection">
                <Input type="text"/>
                <Input type="email"/>
                <Input type="password"/>

            <article>
                <div>
                    <label class="switch">
                        <input type="checkbox" aria-label="toggle-button">
                        <span class="slider round"></span>
                    </label>

                    <p>Agree to the terms of services and the privacy policy <a href="/click" class="click-here">(click here for more information)</a></p>
                </div>
        
                <div>
                    <label class="switch">
                        <input type="checkbox" aria-label="toggle-button">
                        <span class="slider round"></span>
                    </label>

                    <p>Agree to share data with research universities and participate in research <a href="/" class="click-here">(click here for more information)</a></p>
                </div>
            </article>

            <input type="submit" value="Sign up!" class="sign-upbtn">
        </form>
    </section>
</main>


<style>
*{
    padding: 0;
    margin: 0;
}
section, form, main{
    display: flex;
    flex-direction: column;
}
main{
    align-items: center;
}
section {
    padding: 1.25em;
    max-width: 30em ;
    height: 100dvh; 
}
form {
    flex-grow: 1;
}
.heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    height: 5em;
    margin-bottom: 1.8em;
    margin-top: .6em;
}

.heading h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    font-size: 1.5rem;
}

.heading a {
    text-decoration: none;
    margin-left: 0; 
    display: flex; 
    align-items: center;
}

label{
    font-size: 1.25em;
}                                                                                
p{
    max-width: 40ch;
}

input{
    padding: 1rem;
    background-color: var(--color-white);
    border: none;
    border-radius: .6em;
    margin-bottom: 1.25em ;
    font-size: 1em;
}
label{
    margin-bottom: .6em;
}
div{
    display: flex;
    flex-direction: row;
    margin-bottom: 1.25em;
}

/* Styling for toggle button */
.switch {
  position: relative;
  display: inline-block;
  width: 5em;
  height: 1.25em;
  margin-right: .6em;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 2em;
  background-color: var(--color-white);
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 1em;
  width: 1em;
  left: 2px;
  bottom: 3px;
  background-color: var(--color-white);
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: hsla(217, 91%, 60%, 1);;
}
input:focus + .slider {
  box-shadow: 0 0 1px hsla(217, 91%, 60%, 1);
}
input:checked + .slider:before {
  -webkit-transform: translateX(1.25em);
  -ms-transform: translateX(1.25em);
  transform: translateX(1.25em);
}
.slider.round {
  border-radius: 1em;
}
.slider.round:before {
  border-radius: 50%;
}
.sign-upbtn{
    align-self: center;
    bottom: 0;
    border-radius: .6em;
    width: 95%;
    background-color: hsla(198, 43%, 41%, 1);
    padding: .6em;
    text-align: center;
    font-size: 1em;
    color: var(--color-white);
    text-decoration: none; 
    margin-top: auto;  
    margin-bottom: 3.75em;
}
.click-here{
    color: hsla(217, 75%, 65%, 1);
}

</style>
