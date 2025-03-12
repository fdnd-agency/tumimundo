// @author roumaisa el filali
/** @type {import('./$types').PageLoad} */
export let csr = true;
import { error } from '@sveltejs/kit';
import { fetchAllData, mapStoriesWithDetails } from '$lib/api';
import { fetchAnimals, AnimalsInStories, fetchSeasons, SeasonDetailInStories } from '$lib/api';

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
    try {
        const [data, animalData, seasonsData] = await Promise.all([
            fetchAllData(fetch),
            fetchAnimals(fetch),
            fetchSeasons(fetch)
        ]);

        let storiesWithDetails = mapStoriesWithDetails(data.stories, data.audios, data.languages);
        storiesWithDetails = AnimalsInStories(storiesWithDetails, animalData); 
        storiesWithDetails = SeasonDetailInStories(storiesWithDetails, seasonsData.seasons)


        return {
            ...data,
            animals: animalData,
            stories: storiesWithDetails,
            languages: data.languages,
            seasons: seasonsData.seasons
        };
    } catch (err) {
        console.error('Error loading data:', err);
        throw error(500, {
            message: err.message || 'An unknown error occurred'
        });
    }
}
