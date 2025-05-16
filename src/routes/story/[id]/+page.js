import { fetchCollection, fetchApi, mapStoriesWithDetails } from '$lib/api.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  const story = await fetchCollection(fetch, 'tm_story', params.id);
  const audios = await fetchApi(fetch, 'tm_audio');
  const languages = await fetchApi(fetch, 'tm_language');

  const mappedStory = mapStoriesWithDetails([story], audios, languages)[0];

  return {
    story: mappedStory
  };
}
