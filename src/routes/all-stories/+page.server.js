// @author roumaisa el filali
/** @type {import('./$types').PageLoad} */
export let csr = true;
import { error } from '@sveltejs/kit';
import { fetchAllData, mapStoriesWithDetails, fetchSeasons, SeasonDetailInStories } from '$lib/api';
import { fetchAnimals } from '../../lib/api';
/**
 * Loads data for the page, fetching stories, animals, and languages.
 *
 * @async
 * @function load
 * @param {Object} context - The context object provided by SvelteKit's `load` function.
 * @param {fetch} context.fetch - The fetch function for making HTTP requests.
 * @returns {Promise<Object>} A promise that resolves to an object containing stories, animals, and languages.
 * @throws {Error} If there's an error during data fetching.
 */
export async function load({ fetch }) {
    try{
    const [data, animals, seasonsData] = await Promise.all([fetchAllData(fetch),fetchAnimals(fetch), fetchSeasons(fetch)]);

    let storiesWithDetails =  mapStoriesWithDetails(data.stories, data.audios, data.languages)
        storiesWithDetails = SeasonDetailInStories(storiesWithDetails, seasonsData.seasons)

    return {
        ...data,
        animals,
        stories: storiesWithDetails,
        languages: data.languages,
        seasons: seasonsData.seasons
    };
} catch (err) {
    console.error('Error loading data:', error);
    throw error(500, {
        message: error.message
    });
}
}
