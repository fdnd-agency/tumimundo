import { writable } from 'svelte/store';

export const userState = writable({
  userId: null,
  profileId: null
});
