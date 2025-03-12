<script>
    import { userState, Edit, AddProfile } from '$lib/index';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    export let data;
    let profiles = data.profiles || [];
    let profileUsers = data.profileUsers || [];
    let userId = $userState.userId;
    let filteredProfiles = [];

    onMount(() => {
        if (!userId) {
            // goto('/log-in');
            goto('/profile-selection')
        }
    });

    $: {
        if (userId) {
            filteredProfiles = profiles.filter(profile => {
                return profileUsers.some(profileUser => profileUser.user_id === userId && profileUser.profile_id === profile.id);
            });
        }
    }

    async function handleProfileSelection(profileId) {
        userState.update(state => ({
            ...state,
            profileId: profileId
        }));
        await goto('/');
        // await goto ('/profile-selection')
    }
</script>

<main>
    <section class="top-bar">
        <h1>Select account</h1>
        <button class="edit-button">
            <Edit/>
            <p>Edit</p>
        <button>
    </section>
    <ul>
        {#each filteredProfiles as profile}
            <li>
                <button on:click={() => handleProfileSelection(profile.id)}>
                    <img src="{profile.avatar}" alt="Profile avatar of {profile.name_of_child}" />
                    <h2>{profile.name_of_child}</h2>
                </button>
            </li>
        {/each}
        <li>
            <a href="/">
                <AddProfile/>
                <h2>Add profile</h2>
            </a>
        </li>
    </ul>
</main>
<style>
main {
    background: var(--bg-image-blue);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    height: 100dvh;
    color: var(--color-white);
    margin: auto;
    padding: 1em;
    padding-top: 3em;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 1em;
}

.top-bar h1 {
    flex-grow: 1;
    text-align: center;
    font-size: 1.5em;
}

.edit-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.2em;
}

.edit-button p {
    font-size: 0.9em;
    margin: 0;
}

ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-row-gap: 5em;
    list-style: none;
    padding: 0;
    margin: 2em 0;
}

li {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5em;
}

li button img {
    width: 6.5em;
    height: 6.5em;
    border-radius: 50%;
    object-fit: cover;
}

button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

h1 {
    font-size: 1.25em;
    text-align: center;
    margin-bottom: 1em;
}

h2 {
    font-size: 1em;
}
</style>