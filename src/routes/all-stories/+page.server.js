// @author roumaisa el filali
// @author Marjam Lodien
/** @type {import('./$types').PageLoad} */
export let csr = true;
import { error } from '@sveltejs/kit';
import { fetchAllData, mapStoriesWithDetails, fetchSeasons, SeasonDetailInStories } from '$lib/api';
import { fetchAnimals } from '../../lib/api';
/**
 * Loads data for the page, fetching stories, animals, languages and seasons.
 * @async
 * @function load
 * @param {fetch} context.fetch - The fetch function for making HTTP requests.
 * @param {url} context.url - The current page URL object.
 * @returns {Promise<Object>} A promise that resolves to an object containing stories, animals, languages seasons and selected filters.
 * @throws {Error} If there's an error during data fetching.
 */
export async function load({ fetch, url }) {
    try {
      const [data, animals, seasonsData] = await Promise.all([
        fetchAllData(fetch),
        fetchAnimals(fetch),
        fetchSeasons(fetch)
      ]);
  
      let storiesWithDetails = mapStoriesWithDetails(data.stories, data.audios, data.languages);
      storiesWithDetails = SeasonDetailInStories(storiesWithDetails, seasonsData.seasons);
  
      const selectedSeason = url.searchParams.get('season') || '';
      const selectedLanguage = url.searchParams.get('language') || '';

      const filteredStories = storiesWithDetails.filter(story => 
        (!selectedSeason || story.season === selectedSeason) &&
        (!selectedLanguage || story.language === selectedLanguage)
      );
  
      return {
        stories: filteredStories,
        animals,
        languages: data.languages,
        seasons: seasonsData.seasons,
        selectedSeason,
        selectedLanguage
      };
    } catch (err) {
      console.error('Error loading data:', err);
      throw error(500, {
        message: err.message
      });
    }
  }
