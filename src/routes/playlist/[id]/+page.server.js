import { fetchCollection } from '$lib/api';
import { PUBLIC_APIURL } from '$env/static/public';
/**
 * Laadt een playlist en bijbehorende verhalen op basis van route-parameters.
 *
 * @param {Object} context - De context van de load-functie.
 * @param {Object} context.params - Route parameters, verwacht een 'id' veld.
 * @param {Function} context.fetch - Fetch-functie om API-aanroepen te doen.
 * @returns {Promise<Object>} Een object met de playlist (inclusief verhalen) of een error.
 */
export async function load({ params, fetch }) {
    /**
     * Controleer of het playlist ID geldig is (alleen cijfers).
     */
    if (!params.id || !/^\d+$/.test(params.id)) {
        return { error: 'Invalid playlist ID' };
    }

    /** @type {string} */
    const playlistId = params.id;
    try {
        /**
         * Haal de playlist op via de API.
         * @type {Object|null}
         */
        const playlist = await fetchCollection(fetch, 'tm_playlist', playlistId);
        if (!playlist) {
            return { error: 'Playlist not found' };
        }
        
        /**
         * Voeg een absolute image-URL toe aan de playlist.
         * @type {string}
         */
        playlist.image = `${PUBLIC_APIURL}/assets/${playlist.image}`;

        /**
         * Haal de verhalen op die bij de playlist horen.
         * @type {Array<string|number>}
         */
        const storyIds = playlist.stories || [];
        /**
         * Array van opgehaalde verhalen (kan null bevatten als ophalen mislukt).
         * @type {Array<Object|null>}
         */
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
