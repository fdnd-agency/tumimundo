import { fetchAudioById, fetchCollection, mapStoriesWithDetails } from '$lib/api';
import { PUBLIC_APIURL } from '$env/static/public';

export async function load({ fetch, params }) {
  const id = params.id;
  const assetBaseUrl = `${PUBLIC_APIURL}/assets/`;

  const story = await fetchCollection(fetch, 'tm_story', id);
  const allAudios = await fetchCollection(fetch, 'tm_audio');
  const allLanguages = await fetchCollection(fetch, 'tm_language');

  const [mappedStory] = mapStoriesWithDetails([story], allAudios, allLanguages);
  const audioId = mappedStory.audio?.[0];
  const audio = audioId ? await fetchAudioById(fetch, audioId) : null;

  return {
    story: mappedStory,
    audio
  };
}
