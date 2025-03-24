export default async function FetchJson(url, options = {}) {
    const response = await fetch(url, options);
  
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
  
    return response.json();
  }