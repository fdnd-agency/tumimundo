<script>
import { Input, Back } from '$lib/index';

export let form;

let password = '';
let showPassword = false;
let showCriteria = false;

const criteria = [
  {
    label: 'A lowercase letter',
    test: pw => /[a-z]/.test(pw)
  },
  {
    label: 'An uppercase letter',
    test: pw => /[A-Z]/.test(pw)
  },
  {
    label: 'A number',
    test: pw => /\d/.test(pw)
  },
  {
    label: 'Minimum 8 characters',
    test: pw => pw.length >= 8
  }
];
</script>

<main>
    <section>
        <div class="heading">
            <a href="/onboarding">
                <Back color="black"/>
            </a>
            <h1>Sign up</h1> 
        </div>
    
        <form method="POST" action="/sign-up">
            <Input 
                inputClass={form?.errors?.name ? 'is-invalid' : ''}
                type="text" 
                name="name" 
                placeholder="Enter your full name"
                value={form?.values?.name ?? ''}
            />
            {#if form?.errors?.name}
                <div class="field-error">{form.errors.name}</div>
            {/if}

            <Input 
                inputClass={form?.errors?.email ? 'is-invalid' : ''}
                type="email" 
                name="email" 
                placeholder="email@example.com"
                value={form?.values?.email ?? ''}
            />
            {#if form?.errors?.email}
                <div class="field-error">{form.errors.email}</div>
            {/if}

            <div class="password-field-wrapper">
                <Input
                  bind:value={password}
                  inputClass={form?.errors?.password ? 'is-invalid' : ''}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  label="Password" 
                  on:focus={() => showCriteria = true}
                  on:blur={() => showCriteria = false}
                />
                <button
                  type="button"
                  class="toggle-password-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  on:click={() => showPassword = !showPassword}
                >
                  {#if showPassword}
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#444" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#444" stroke-width="2"/></svg>
                    {:else}
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#444" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3" stroke="#444" stroke-width="2"/><line x1="4" y1="20" x2="20" y2="4" stroke="#444" stroke-width="2"/></svg>
                  {/if}
                </button>
              </div>
              {#if form?.errors?.password}
                <div class="field-error">{form.errors.password}</div>
              {/if}
        
              {#if showCriteria || password.length > 0}
                <div class="password-criteria">
                  <h3>Password must contain the following:</h3>
                  <ul>
                    {#each criteria as item}
                    <li class={item.test(password) ? 'valid' : 'invalid'}>
                      {#if item.test(password)}
                        <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27 9L13 23L6 16" stroke="#2ecc40" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      {:else}
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6L14 14M14 6L6 14" stroke="#d32f2f" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                      {/if}
                      {item.label}
                    </li>
                    {/each}
                  </ul>
                </div>
              {/if}

            <Input 
                inputClass={form?.errors?.passwordConfirm ? 'is-invalid' : ''}
                type="password" 
                name="passwordConfirm" 
                placeholder="Confirm your password"
                label="Confirm password"
            />
            {#if form?.errors?.passwordConfirm}
                <div class="field-error">{form.errors.passwordConfirm}</div>
            {/if}

            <article>
                {#if form?.errors?.terms}
                    <div class="terms-error">{form.errors.terms}</div>
                {/if}

                <div class="toggle-row">
                    <label class="switch {form?.errors?.terms ? 'is-invalid' : ''}">
                        <input 
                        type="checkbox" 
                        aria-label="toggle-button"
                        name="terms"
                        checked={form?.values?.terms}
                        >
                        <span class="slider round"></span>
                    </label>

                    <p>Agree to the terms of services and the privacy policy <a href="/click" class="click-here">(click here for more information)</a>*</p>
                </div>
        
                <div class="toggle-row">
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

.password-field-wrapper {
  position: relative;
  flex-direction: column;
  margin-bottom: 0;
}

.password-field-wrapper .toggle-password-btn {
  position: absolute;
  top: 50%;
  right: 1rem;
  border: none;
}

.field-error {
  color: #d32f2f;
  margin-top: -0.8em;
  margin-bottom: 0.8em;
}

.terms-error {
  color: #d32f2f;
  margin-bottom: 0.4em; 
  margin-top: 0.5em;
}

.password-criteria {
  background: #f7fafd;
  border: 1px solid #e2e8f0;
  border-radius: 0.6em;
  padding: 1em;
  flex-direction: column ;
}

.password-criteria h3 {
  font-size: 1em;
  margin-bottom: 0.5em;
}

.password-criteria li.valid {
  color: #2ecc40;
  font-weight: 500;
}

.password-criteria li.invalid {
  color: #d32f2f;
  font-weight: 400;
}

label{
    font-size: 1.25em;
    margin-bottom: .6em;
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
/* label{
    margin-bottom: .6em;
} */
div{
    display: flex;
    flex-direction: row;
    margin-bottom: 1.25em;
}

/* Styling for toggle button */
.switch {
  position: absolute;
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

.toggle-row {
  position: relative;
  margin-bottom: 1.25em;
}

.toggle-row p {
  margin: 0;
  margin-left: 3.5em;
  line-height: 1.4;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 2em;
  background-color: grey;
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
  transform: translateX(0.80em);
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
    cursor: pointer;
}

.sign-upbtn:hover {
    background-color: var(--color-login-bg-hover);
}
.click-here{
    color: hsla(217, 75%, 65%, 1);
}

</style>
