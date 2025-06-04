// Credits to the original Tumi mundo project. https://github.com/briannededeugd/tumimundo/tree/main
import { PUBLIC_APIURL } from '$env/static/public';

export async function FetchApi(path, method = 'GET', data = null) {
  const url = `${PUBLIC_APIURL}/items${path}`;

  const options = {
      method,
      headers: {
          'Content-Type': 'application/json',
      },
  };

  if (method !== 'GET' && data) {
      options.body = JSON.stringify(data);
  }

  try {
      const response = await fetch(url, options);

      // Check if the response has a body
      let result = null;
      if (response.headers.get('Content-Type')?.includes('application/json')) {
          result = await response.json();
      }

      if (response.ok) {
          return result?.data || null; // Return the data if available
      } else {
          console.error('Error:', result);
          throw new Error(result?.error || 'An error occurred');
      }
  } catch (error) {
      throw new Error(error.message);
  }
}
