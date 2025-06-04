import { fetchApi } from '$lib/index';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const method = formData.get('_method') || 'POST';

    switch (method) {
      case 'DELETE': {
        const likeId = formData.get('likeId');

        if (!likeId) {
          return new Response(JSON.stringify({ error: 'Missing likeId' }), { status: 400 });
        }

        // Handle unlike (DELETE)
        await fetchApi(`/tm_likes/${likeId}`, 'DELETE');
        break;
      }

      case 'POST': {
        const playlistId = formData.get('playlistId');
        const profileId = formData.get('profileId');

        if (!playlistId || !profileId) {
          return new Response(JSON.stringify({ error: 'Missing playlistId or profileId' }), { status: 400 });
        }

        // Handle like (POST)
        await fetchApi('/tm_likes', 'POST', {
          playlist: playlistId,
          profile: parseInt(profileId, 10),
        });
        
        break;
      }
      default:
        return new Response(JSON.stringify({ error: 'Unsupported method' }), { status: 405 });
    }

    return new Response(null, {
      status: 303,
      headers: {
        Location: '/lessons',
      },
    });
  } catch (error) {
    console.error('Error in /like:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
