import { fetchAudioById, fetchCollection } from '$lib/api';
import { PUBLIC_APIURL } from '$env/static/public';

export async function load({ fetch, params }) {
  const id = params.id;
  const assetBaseUrl = `${PUBLIC_APIURL}/assets/`;

  const story = await fetchCollection(fetch, 'tm_story', id);

  if (story.image) {
    story.image = `${assetBaseUrl}${story.image}`;
  }

  const audioId = story.audio?.[0];
  const audio = audioId ? await fetchAudioById(fetch, audioId) : null;

  return {
    story,
    audio
  };
}
