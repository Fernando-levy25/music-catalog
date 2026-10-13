const BASE_URL = 'https://itunes.apple.com/search';

export async function fetchTracks(searchTerm) {
  const encodedTerm = encodeURIComponent(searchTerm.trim());
  const url = `${BASE_URL}?term=${encodedTerm}&entity=song&limit=40`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Erro ao consumir a API:', error);
    throw error;
  }
}