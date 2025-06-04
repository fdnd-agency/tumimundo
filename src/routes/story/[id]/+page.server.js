import { fetchAudioById, fetchCollection, mapStoriesWithDetails } from '$lib/api';
import { PUBLIC_APIURL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params, cookies }) {
  const id = params.id;
  const story = await fetchCollection(fetch, 'tm_story', id);
  const allAudios = await fetchCollection(fetch, 'tm_audio');
  const allLanguages = await fetchCollection(fetch, 'tm_language');

  const [mappedStory] = mapStoriesWithDetails([story], allAudios, allLanguages);
  const audioId = mappedStory.audio?.[0];
  const audio = audioId ? await fetchAudioById(fetch, audioId) : null;

  const showVisuals = cookies.get('showVisuals') === 'true';
  const theme = cookies.get('theme') ?? 'dark';

  return {
    story: mappedStory,
    audio,
    showVisuals,
    theme
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  toggleVisuals: async ({ cookies, url }) => {
    const current = cookies.get('showVisuals') === 'true';
    cookies.set('showVisuals', (!current).toString(), { path: '/' });
    throw redirect(303, url.pathname);
  },

  toggleTheme: async ({ cookies, url }) => {
    const current = cookies.get('theme') ?? 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    cookies.set('theme', next, { path: '/' });
    throw redirect(303, url.pathname);
  }
};
