<script>
    export let data;

    import { Input, userState, Close } from '$lib/index';
    import { goto } from '$app/navigation';

    let users = data.users;
    let email = '';
    let password = '';
    let errorMessage = '';

    async function handleLogin(event) {
        event.preventDefault();

        if (!email || !password) {
            errorMessage = 'Please fill out both fields.';
            return;
        }

        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
            userState.set({ userId: user.id, profileId: null });
            
            await goto('/profile-selection');
        } else {
            errorMessage = 'Invalid email or password.';
        }
    }
</script>

<main>
    <section>
        <h1>Tumi Mundo</h1>
        <p>Your language learning app</p>

        <div class="buttons">
            <label class="popup-button" for="login-popup">Login</label>
            <a href="/onboarding" class="sign-up">New to Tumi Mundo? Sign up!</a>
            <a href="/log-in">I don't remember my password/username</a>
        </div>
    </section>

    <div class="popup-container">
        <input type="checkbox" id="login-popup">
        <div class="popup">
            <label for="login-popup" class="transparent-label"></label>
            <div class="popup-inner">
                <div class="popup-title">
                    <h2>Log in</h2>
                    <div class="close-div">
                        <Close/>
                        <label for="login-popup" class="popup-close-btn">Close</label>
                    </div>
                </div>
                <div class="popup-content">
                    <form on:submit|preventDefault={handleLogin}>
                        <ul>
                            <li><Input type="email" name="email-input" placeholder="Email" bind:value={email} /></li>
                            <li><Input type="password" name="password-input" placeholder="Password" bind:value={password} /></li>
                            <li><button type="submit" class="login-popup">Log in</button></li>
                            {#if errorMessage}
                            <li class="error-message">{errorMessage}</li>
                            {/if}
                            <li><a href="/">I don't remember my password/username</a></li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>


<style>

:root {
    --color-text: white;;

    --padding-small: 0.8rem;
    --padding-medium: 1rem;
    --padding-large: 2rem;

    --gap-small: .3em;
    --gap-medium: .6em;

    --popup-width: 25em;
    --popup-height: 31.25em;
}

section {
    padding: 0 var(--padding-large);
}

main, section, .buttons {
    display: flex;
    flex-direction: column;
}

section, .buttons {
    align-items: center;
}

main {
    background: url(/log-in-background.png), var(--bg-image-blue);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    height: 100dvh;
    width: 100%;
    color: var(--color-text);
}

section {
    flex-grow: 1;
    justify-content: start;
}

h1 {
    margin-top: 10rem;
    font-size: 3em;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

p, button, label {
    font-size: var(--font-size-md);
}

.buttons {
    margin-top: auto;
    gap: var(--gap-medium);
    margin-bottom: 3.75em;
    width: 100%;
}

button, .popup-button, .login-popup, .sign-up{
    text-decoration: none;
    border: 1px solid var(--color-white);
    border-radius: .6em;
    padding: .8rem;
    max-width: 17rem;
    background-color: var(--color-login-bg);
    color: var(--color-white);
    text-align: center;
    cursor: pointer;
    margin: auto;
    display: block;
}

.popup-button {
    width: 100%;
}

button, .sign-up{
    text-decoration: none;
    background-color: #F0F0F0;
    color: hsla(0, 0%, 33%, 1);
    padding: .8rem 1rem;
}

button:hover, .popup-button:hover {
    background-color: var(--color-login-bg-hover);
}

a {
    color: var(--color-link);
    text-decoration: underline;
    max-width: 22rem;
    text-align: center;
}

.popup-title {
    display: flex;
    align-items: center; 
    justify-content: space-between; 
    position: relative; 
}

.popup-title h2 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--font-size-lg);
}

.close-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--gap-small);
    margin-left: auto;
}

.close-div svg {
    cursor: pointer;
    margin-right: -.6em;
}

.close-div label {
    cursor: pointer;
    color: hsla(0, 0%, 20%, 1);
    margin-right: -.6em;
}

h2 {
    margin: auto;
}

h2, label {
    color: black;
}

input {
    padding: var(--padding-medium);
    background-color: var(--color-bg-light);
    border: none;
    border-radius: 1.875em;
    margin-bottom: 1.25em;
    font-size: var(--font-size-md);
    height: 3rem;
}

label {
    margin-bottom: var(--gap-medium);
    max-width: 20rem;
}

.popup-container {
    display: inline-block;
}

.popup-container .popup {
    position: fixed;
    top: 0;
    width: 100%;
    height: 150%;
    background: var(--color-popup-bg);
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition: 250ms all;
}

.popup-container .popup .popup-inner {
    height: var(--popup-height);
    width: var(--popup-width);
    box-sizing: border-box;
    border-radius: 1.25em;
    padding: 1.25em;
    background: var(--color-white);
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 150%;
    transition: 250ms all;
}

.popup-container .popup .popup-inner .popup-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25em;
}

.popup-container > input {
    display: none;
}

.popup-container > input:checked + .popup {
    opacity: 1;
    visibility: visible;
}

.popup-container > input:checked + .popup .popup-inner {
    top: 50%;
}

.error-message {
    color: red;
    margin-top: .6em;
    text-align: center;
}
</style>    