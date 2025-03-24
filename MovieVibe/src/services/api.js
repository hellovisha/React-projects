const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '192a03cafdf9aaaa40e9994259398e3c'; // Your key, truncated in the error

export const fetchPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// Maybe also SearchMovies
export const SearchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
};