// playlist/+page.server.js
import { fetchAllData, mapPlaylistsWithDetails, mapStoriesWithDetails } from '$lib/api';
import { FetchApi } from '$lib/index';

export async function load({ locals }) {
    const profileId = 122; // NEEDS TO BE CONNECTED TO ACCOUNT.JS
    const data = await fetchAllData();

    const storiesWithDetails = mapStoriesWithDetails(data.stories, data.audios, data.languages);
    const enrichedPlaylists = await Promise.all(
        mapPlaylistsWithDetails(data.playlists, data.stories, data.playlistStories).map(async (playlist) => {
            const likes = await FetchApi(`/tm_likes?filter[playlist][_eq]=${playlist.id}&filter[profile][_eq]=${profileId}`);
            return {
                ...playlist,
                isLiked: likes?.length > 0,
                likeId: likes?.[0]?.id || null,
            };
        })
    );

    return {
        ...data,
        playlists: enrichedPlaylists,
        stories: storiesWithDetails,
        languages: data.languages
    };
}