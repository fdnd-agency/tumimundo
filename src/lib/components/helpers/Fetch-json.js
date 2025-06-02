// changed fetch-json.js to Fetch-json.js
export default async function fetchJson(url, options = {}) {
    const response = await fetch(url, options);
  
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }
  
    return response.json();
  }
