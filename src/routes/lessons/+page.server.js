import { fail } from '@sveltejs/kit';
import { createPlaylistWithStories, fetchApi, fetchAllData, mapPlaylistsWithDetails, mapStoriesWithDetails } from '$lib/api';

// --- STRATEGY PATTERN: Validation strategies ---
const titleStrategies = [
  (value) => !value?.trim() && 'Title is required',
  (value) => value?.length > 25 && 'Title must be less than 25 characters'
];

const descriptionStrategies = [
  (value) => !value?.trim() && 'Description is required'
];

const storiesStrategies = [
  (value) => (!value || value.length === 0) && 'At least one story must be selected'
];

/**
 * Runs all validation strategies for a given value.
 * Returns the first error message found, or null if all pass.
 * @param {any} value - The value to validate
 * @param {Array<Function>} strategies - Array of validation functions
 * @returns {string|null}
 */
function validateField(value, strategies) {
  for (const strategy of strategies) {
    const error = strategy(value);
    if (error) return error;
  }
  return null;
}
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
export const actions = {
    createPlaylist: async ({ request, locals, fetch }) => {
        const formData = await request.formData();
        const values = {
            title: formData.get('Name'),
            description: formData.get('Description'),
            stories: formData.getAll('stories').map(id => parseInt(id, 10))
        };
     

        // Validate fields using strategies
        const errors = {
            title: validateField(values.title, titleStrategies),
            description: validateField(values.description, descriptionStrategies),
            stories: validateField(values.stories, storiesStrategies)
        };

        // Remove nulls from errors
        const filteredErrors = Object.fromEntries(
            Object.entries(errors).filter(([_, v]) => v)
        );

        if (Object.keys(filteredErrors).length > 0) {
            return fail(400, {
                error: 'Validation failed',
                errors: filteredErrors,
                values
            });
        }

        try {
            const result = await createPlaylistWithStories(
                fetch,
                { title: values.title, description: values.description, user_created: locals.user?.id },
                values.stories
            );

            if (result.status === 201) {
                return {
                    status: 201,
                    redirect: `/playlist/${result.data.id}`,
                    success: true
                };
            } else {
                return {
                    status: result.status || 500,
                    error: result.error || 'Failed to create playlist',
                    values
                };
            }
        } catch (error) {
            console.error('Error creating playlist:', error);
            return {
                status: 500,
                error: 'Failed to create playlist',
                values
            };
        }
    }
};
