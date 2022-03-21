const API_KEY = import.meta.env.VITE_API_KEY;

export const request = {
  fetchTrending:`/trending/all/week?api_key=${API_KEY}&language=en-us`,
  fetchNetflixOriginals:`/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated:`/discover/movie?api_key=${API_KEY}&languager=en-us`,
  fetchActionMovies:`/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies:`/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies:`/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies:`/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentMovies:`/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchMovieTrailer: (id: string) => `/movie/${id}/videos?api_key=${API_KEY}`,
}