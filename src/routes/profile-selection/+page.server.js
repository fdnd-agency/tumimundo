import { fetchAllData, mapProfilesWithImages } from '$lib/api';

export async function load({ locals }) {
    const data = await fetchAllData();
    const enhancedProfiles = mapProfilesWithImages(data.profiles);

    return {
        ...data,
        profiles: enhancedProfiles
    };
}
