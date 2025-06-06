import { fetchAllData } from '$lib/api';

export async function load({ locals }) {
    const data = await fetchAllData();

    return {
        ...data
    };
}