import { fetchCollection } from '$lib/api';
import { PUBLIC_APIURL } from '$env/static/public';

export async function load({ params, fetch }) {
    if (!params.id || !/^\d+$/.test(params.id)) {
        return { error: 'Invalid playlist ID' };
    }

    const playlistId = params.id;
    try {
        const playlist = await fetchCollection(fetch, 'tm_playlist', playlistId);
        if (!playlist) {
            return { error: 'Playlist not found' };
        }
        
        playlist.image = `${PUBLIC_APIURL}/assets/${playlist.image}`;

        const storyIds = playlist.stories || [];
        const stories = await Promise.all(
            storyIds.map(id => 
                fetchCollection(fetch, 'tm_story', id)
                    .catch(err => {
                        console.warn(`Failed to fetch story ${id}:`, err);
                        return null;
                    })
            )
        );

        return {
            playlist: {
                ...playlist,
                stories: stories.filter(Boolean),
            }
        };
    } catch (err) {
        console.error('Failed to fetch playlist:', err);
        return { error: 'Failed to fetch playlist data' };
    }
}
