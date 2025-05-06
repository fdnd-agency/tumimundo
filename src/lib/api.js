import getDirectusInstance from '$lib/directus';
import { readItem, readItems, createItem, deleteItem } from '@directus/sdk';
import { PUBLIC_APIURL } from '$env/static/public';
 
const assetBaseUrl = `${PUBLIC_APIURL}/assets/`;
 
export async function fetchCollection(fetch, collectionName, id = null) {
    const directus = getDirectusInstance(fetch);
 
    if (id) {
        return await directus.request(readItem(collectionName, id));
    }
 
    return await directus.request(readItems(collectionName));
}
  
/**
 * Creates a new playlist in Directus and links it with selected stories.
 *
 * @async
 * @function createPlaylistWithStories
 * @param {Function} fetch - The fetch function for making API requests.
 * @param {Object} playlistData - Data for the new playlist, including title, description, and user ID.
 * @param {Array<number>} storyIds - Array of story IDs to link with the playlist.
 * @returns {Promise<Object>} A promise that resolves to the newly created playlist object.
 */

export async function createPlaylistWithStories(fetch, { title, description, user_created }, storyIds) {
    const directus = getDirectusInstance(fetch);

    try {
        // Maak een nieuwe playlist aan met de stories direct erin
        const newPlaylist = await directus.request(
            createItem('tm_playlist', {
                title,
                description,
                user_created,
                stories: storyIds // Dit voegt de stories direct toe aan de playlist
            })
        );

        console.log('New Playlist Created:', newPlaylist);

        return newPlaylist;
    } catch (error) {
        console.error('Error creating playlist with stories:', error);
        throw error;
    }
}
export async function fetchAnimals(fetch) {
    const directus = getDirectusInstance(fetch);
    try {
        const animals = await directus.request(readItems('tm_animal', {
            fields: ['id', 'animal']
        }));
        return animals;
    } catch (error) {
        console.error('Error fetching animals:', error);
        throw error;
    }
}
 
export async function fetchSeasons(fetch) {
    try {
        const seasons = await fetchCollection(fetch, 'tm_season');
        return { seasons };
    } catch (error) {
        console.error('Error fetching season data:', error);
        throw error;
    }
}
 
export async function fetchAllData(fetch) {
    const [
        users,
        profiles,
        profileStatistics,
        buddys,
        languages,
        audios,
        playlists,
        speakers,
        stories,
        likes,
        playlistStories,
        profileUsers
    ] = await Promise.all([
        fetchCollection(fetch, 'tm_users'),
        fetchCollection(fetch, 'tm_profile'),
        fetchCollection(fetch, 'tm_profile_statistics'),
        fetchCollection(fetch, 'tm_buddy'),
        fetchCollection(fetch, 'tm_language'),
        fetchCollection(fetch, 'tm_audio'),
        fetchCollection(fetch, 'tm_playlist'),
        fetchCollection(fetch, 'tm_speaker_profile'),
        fetchCollection(fetch, 'tm_story'),
        fetchCollection(fetch, 'tm_likes'),
        fetchCollection(fetch, 'tm_playlist_stories'),
        fetchCollection(fetch, 'tm_profile_user')
    ]);
 
    return {
        users,
        profiles,
        profileStatistics,
        buddys,
        languages,
        audios,
        playlists,
        speakers,
        stories,
        likes,
        playlistStories,
        profileUsers
    };
}
 
function retrieveFromAssets(url) {
    return `${assetBaseUrl}${url}`;
}
 
function formatPlaytime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
}
 
export function mapStoriesWithDetails(stories, audios, languages) {
    return stories.map((story) => {
        const language = languages.find((lang) => lang.id === story.language)?.language || "unknown.svg";
        const storyAudios = story.audio.map((audioId) => {
            const audioData = audios.find((audio) => audio.id === audioId);
            if (audioData) {
                const audioFile = retrieveFromAssets(audioData.audio_file);
                return {
                    id: audioData.id,
                    file: audioFile,
                    voice_colours: audioData.voice_colours,
                    speaker_profile: audioData.speaker_profile
                };
            }
            return null;
        }).filter(Boolean);
 
        if (story.image) {
            story.image = retrieveFromAssets(story.image);
        }
 
        if (story.playtime) {
            story.playtimeSeconds = story.playtime;
            story.playtime = formatPlaytime(story.playtime);
        }
 
        story.language = language;
 
        return {
            ...story,
            audios: storyAudios
        };
    });
}
export function mapPlaylistsWithDetails(playlists, stories) {
    return playlists.map((playlist) => {
        const playlistStoriesData = (playlist.stories || [])
            .map(storyId => stories.find(story => story.id === storyId))
            .filter(Boolean);

        const totalPlaytime = playlistStoriesData.reduce((sum, story) => {
            return sum + (story.playtime || 0);
        }, 0);

        if (playlist.image) {
            playlist.image = retrieveFromAssets(playlist.image);
        }

        const formattedPlaytime = totalPlaytime > 0 ? formatPlaytime(totalPlaytime) : "0 min 0 sec";

        return {
            ...playlist,
            image: playlist.image,
            playtime: formattedPlaytime,
            stories: playlistStoriesData,
        };
    });
} 
 
export function mapProfilesWithImages(profiles) {
    return profiles.map((profile) => {
        if (profile.avatar) {
            profile.avatar = retrieveFromAssets(profile.avatar);
        }
 
        return {
            ...profile
        };
    });
}
 
export async function fetchApi(fetch, endpoint) {
    const directus = getDirectusInstance(fetch);
    try {
        const response = await directus.request(readItems(endpoint));
        return response;
    } catch (error) {
        console.error('Error in fetchApi:', error);
        throw error;
    }
}

export async function deleteFromCollection(fetch, collectionName, id) {
    const directus = getDirectusInstance(fetch);
    try {
        return await directus.request(deleteItem(collectionName, id));
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}
