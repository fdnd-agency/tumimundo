// @author marjam lodien
/** @type {import('./$types').PageLoad} */
export let csr = true;

import { fetchAllData } from '$lib/api';

export async function load({ fetch, url }) {
    const searchQuery = url.searchParams.get("search");

    const data = await fetchAllData(fetch);

    // Filter the language if searchterm is given
    if (searchQuery) {
        data.languages = data.languages.filter(language =>
            language.language.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return {
        ...data,
        languages: data.languages
    };
}