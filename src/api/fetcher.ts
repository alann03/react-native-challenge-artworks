const BASE_URL = "https://api.artic.edu/api/v1";

export const fetcher = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
