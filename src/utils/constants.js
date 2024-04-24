export const API_KEY = process.env.REACT_APP_API_KEY;

export const TMDB_GETMOVIES_API = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

export const TMDB_GETVIDEODATA_API = "https://api.themoviedb.org/3/movie/";

export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const TMDB_FALL_BACK_IMAGE_URL = "https://image.tmdb.org/t/p/original";

export const TMDB_GETPOPULARMOVIES_API = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

export const TMDB_TOPRATEDMOVIES_API = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

export const TMDB_UPCOMINGMOVIES_API = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

export const TMDB_TOPRATEDTVSERIES_API = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';

export const TMDB_POPULARTVSERIES_API = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';

export const TMDB_AIRINGTODAY_API = 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1';


export const movieTypes = ['Now Playing On Netflix','Popular On Netflix','Top Rated Movies On Netflix',
'Up Coming Movies On Netflix', 'Top Rated TV Series On Netflix', 'Popular TV Series On Netflix',
'Airing Today On Netflix']

export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // Authorization : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjA4MTUwMTYyYWU4OWU5MzM3MzU2MWUzOGFjZWQwMyIsInN1YiI6IjY2MjI4NTQ2Y2NkZTA0MDE2NDA1ZTExNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HiNerRZJZpg2kUVkkOzvcPOPlPbYEXHVk7e1Eae0PPo'
      Authorization : 'Bearer '+process.env.REACT_APP_ACCESS_TOKEN
    }
};

export const GPT_API_KEY = process.env.REACT_APP_GPT_API_KEY;

export const SearchByTitleQueryPart1 = "https://api.themoviedb.org/3/search/movie?query=";

export const SearchByTitleQueryPart2 = "&include_adult=false&language=en-US&page=1";