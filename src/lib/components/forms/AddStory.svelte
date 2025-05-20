<script>
    /**
     * Represents a checkbox for selecting a story in the playlist creation form.
     *
     * Props:
     * @prop {number} storyId - The ID of the story associated with this checkbox.
     * @prop {boolean} checked=false - Whether the checkbox is initially checked or not.
     *
     * Events:
     * Dispatches:
     *`toggle`: Fired when the checkbox state changes. Includes:
     *      - checked: Boolean indicating whether the checkbox is checked or not.
     *
     * Methods:
     *   handleChange(event):
     *     Updates the `checked` state and dispatches the `toggle` event.
     *
     */
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
        tabindex="0"
        checked={checked}
        on:change={handleChange}
    />
    <span class="checkbox-custom">
        <svg width="22" height="22" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="5.5" stroke="#B0B0B0"/>
            <rect x="3" y="5.57141" width="6" height="0.857143" rx="0.428571" fill="#B0B0B0"/>
            <rect x="6.42871" y="3" width="6" height="0.857143" rx="0.428571" transform="rotate(90 6.42871 3)" fill="#B0B0B0"/>
        </svg>
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
        width: 22px;
        height: 22px;
        margin-left: 1em;
        position: relative;
    }
  
    .story-checkbox input:focus + .checkbox-custom {
        outline: 2px solid #256639;
        border-radius: 50%;
    }
  
    .story-checkbox input:checked + .checkbox-custom {
        background-color: #256639;
        border-radius: 50%;
    }
  
    .story-checkbox input:checked + .checkbox-custom svg {
        display: none;
    }
  
    .story-checkbox input:checked + .checkbox-custom::after {
        content: '';
        position: absolute;
        display: block;
        left: 7px;
        top: 2.5px;
        width: 6px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
  </style>
  