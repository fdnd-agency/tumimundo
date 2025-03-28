import getDirectusInstance from '$lib/directus';
import { readItem, readItems } from '@directus/sdk';
import { PUBLIC_APIURL } from '$env/static/public';

const assetBaseUrl = `${PUBLIC_APIURL}/assets/`;

export async function fetchCollection(fetch, collectionName, id = null) {
    const directus = getDirectusInstance(fetch);

    if (id) {
        // Haal één specifiek item op als een ID is meegegeven
        return await directus.request(readItem(collectionName, id));
    }

    // Haal een volledige collectie op als er geen ID is meegegeven
    return await directus.request(readItems(collectionName));
}
/**
 * Fetches a list of animals from the Directus API.
 *
 * @async
 * @function fetchAnimals
 * @param {fetch} fetch - The fetch function provided by SvelteKit's `load` function.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of animal objects.
 * @throws {Error} If there's an error during the API request.
 */
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
    const link = `${assetBaseUrl}${url}`;
    return link
}

function formatPlaytime(seconds) {
    const minutes = Math.floor(seconds / 60); // Calculate minutes
    const remainingSeconds = seconds % 60;   // Calculate remaining seconds
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

export function SeasonDetailInStories(stories, seasons) {
    return stories.map(story => ({
        ...story,
        season: seasons.find((s) => s.id === story.season)?.season || null
    }));
}

export function AnimalDetailInStories(stories, animals) {
    return stories.map(story => {
        const animal = animals?.find((a) => a.id === story.animal)?.animal || null;
        return {
            ...story,
            animal: animal
        };
    });
}
 
export function mapPlaylistsWithDetails(playlists, stories, playlistStories) {
    const storyMap = new Map(stories.map((story) => [story.id, story]));

    return playlists.map((playlist) => {
        const relatedStoryIds = playlistStories
            .filter((link) => link.playlist_id === playlist.id)
            .map((link) => link.story_id);

        const playlistStoriesData = relatedStoryIds
            .map((storyId) => {
                const story = storyMap.get(storyId);
                return story;
            })
            .filter(Boolean);

        const totalPlaytime = playlistStoriesData.reduce((sum, story) => {
            return sum + (story.playtime || 0);
        }, 0);

        if (playlist.image) {
            playlist.image = retrieveFromAssets(playlist.image);
        }

        const formattedPlaytime = totalPlaytime > 0 ? formatPlaytime(totalPlaytime) : "0 min 0 sec";

        const enrichedPlaylist = {
            ...playlist,
            image: playlist.image,
            playtime: formattedPlaytime,
            stories: playlistStoriesData,
        };

        return enrichedPlaylist;
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