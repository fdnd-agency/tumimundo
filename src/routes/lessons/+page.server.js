import { fail } from '@sveltejs/kit';
import { createPlaylistWithStories, fetchApi, fetchAllData, mapPlaylistsWithDetails, mapStoriesWithDetails } from '$lib/api';


export async function load({ fetch }) {
    const profileId = 122;
    const data = await fetchAllData(fetch);

    const storiesWithDetails = mapStoriesWithDetails(data.stories, data.audios, data.languages);
    const enrichedPlaylists = await Promise.all(
        mapPlaylistsWithDetails(data.playlists, data.stories, data.playlistStories).map(async (playlist) => {
            const likes = await fetchApi(fetch, `tm_likes?filter[playlist][_eq]=${playlist.id}&filter[profile][_eq]=${profileId}`);
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
/**
 * Creates a new playlist with the given title, description, and selected stories.
 *
 * @async
 * @function createPlaylist
 * @param {Object} options - The options object.
 * @param {Request} options.request - The request object containing form data.
 * @param {Object} options.locals - The locals object containing user information.
 * @param {Function} options.fetch - The fetch function for making API requests.
 * @returns {Promise<Object>} A promise that resolves to:
 *   - success {boolean} - Indicates if the playlist was created successfully.
 *   - playlists {Array} - Updated playlists after creation.
 *   - stories {Array} - Updated stories after creation.
 *   - error {string} - Error message if creation failed.
 *   - errors {Object} - Validation errors if any.
 */
export const actions = {
    createPlaylist: async ({ request, locals, fetch }) => {
        const formData = await request.formData();
        const title = formData.get('Name');
        const description = formData.get('Description');
        const stories = formData.getAll('stories');

        console.log('Formuliergegevens:', { title, description, stories });

        const errors = {};
        if (!title || title.trim() === '') {
            errors.title = 'Title is required';
        } else if (title.length > 25) {
            errors.title = 'Title must be less than 25 characters';
        }

        if (!description || description.trim() === '') {
            errors.description = 'Description is required';
        }

        if (!stories || stories.length === 0) {
            errors.stories = 'At least one story must be selected';
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, {
                error: 'Validation failed',
                errors,
                values: { title, description }
            });
        }

        try {
            const newPlaylist = await createPlaylistWithStories(fetch,
                { title, description, user_created: locals.user?.id },
                stories.map(id => parseInt(id, 10))
            );

            const data = await fetchAllData(fetch);
            const enrichedPlaylists = mapPlaylistsWithDetails(data.playlists, data.stories, data.playlistStories);

            return {
                success: true,
                playlists: enrichedPlaylists,
                stories: mapStoriesWithDetails(data.stories, data.audios, data.languages)
            };
        } catch (error) {
            console.error('Error creating playlist:', error);
            return fail(500, { error: 'Failed to create playlist', values: { title, description } });
        }
    }
};