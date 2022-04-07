import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncDiscover = createAsyncThunk(
  "movie/fetchAsyncDiscover",
  async (page) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    return data.results;
  }
);
export const fetchAsyncTrending = createAsyncThunk(
  "movie/fetchAsyncTrending",
  async (page) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );
    return data.results;
  }
);
export const fetchAsyncPopular = createAsyncThunk(
  "movie/fetchAsyncPopular",
  async (page) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );
    return data.results;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movie/fetchAsyncShows",
  async (page) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    return data.results;
  }
);
export const fetchAsyncTopRated = createAsyncThunk(
  "movie/fetchAsyncTopRated",
  async (page) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );
    return data.results;
  }
);
export const fetchAsyncDetails = createAsyncThunk(
  "movie/fetchAsyncDetails",
  async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    return data;
  }
);
export const fetchAsyncShowsDetails = createAsyncThunk(
  "movie/fetchAsyncShowsDetails",
  async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    return data;
  }
);
export const fetchAsyncSearch = createAsyncThunk(
  "movie/fetchAsyncSearch",
  async (type, searchText, page) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    return data.results;
  }
);

const initialState = {
  trending: [],
  popular: [],
  shows: [],
  singleDetail: {},
  showDetails: {},
  topRated: [],
  discover: [],
  search: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommend = action.payload.recommend;
      state.newDisney = action.payload;
      state.original = action.payload.original;
      state.trending = action.payload.trending;
    },
    getMovies: (state, action) => {
      state.newMovies = action.payload;
    },
  },
  extraReducers: {
    [fetchAsyncDiscover.fulfilled]: (state, action) => {
      console.log("sucessfully");
      return { ...state, discover: action.payload };
    },
    [fetchAsyncTrending.fulfilled]: (state, action) => {
      console.log("sucessfully");
      return { ...state, trending: action.payload };
    },
    [fetchAsyncPopular.fulfilled]: (state, action) => {
      console.log("sucessfully");
      return { ...state, popular: action.payload };
    },
    [fetchAsyncTopRated.fulfilled]: (state, action) => {
      console.log("sucessfully");
      return { ...state, topRated: action.payload };
    },
    [fetchAsyncShows.fulfilled]: (state, action) => {
      console.log("sucessfully");
      return { ...state, shows: action.payload };
    },
    [fetchAsyncDetails.fulfilled]: (state, action) => {
      console.log("sucessfully");
      return { ...state, singleDetail: action.payload };
    },
    [fetchAsyncShowsDetails.fulfilled]: (state, action) => {
      console.log("sucessfully");
      return { ...state, showDetails: action.payload };
    },
    [fetchAsyncSearch.fulfilled]: (state, action) => {
      console.log("sucessfully");
      return { ...state, showDetails: action.payload };
    },
  },
});

export const { setMovies, getMovies } = movieSlice.actions;

export const selectTrending = (state) => state.movie.trending;
export const selectPopular = (state) => state.movie.popular;
export const selectShows = (state) => state.movie.shows;
export const selectSingleDetail = (state) => state.movie.singleDetail;
export const selectShowDetails = (state) => state.movie.showDetails;
export const selectTopRated = (state) => state.movie.topRated;
export const selectDiscover = (state) => state.movie.discover;
export const selectMovies = (state) => state.movie.newMovies;
export const selectSearch = (state) => state.movie.search;

export default movieSlice.reducer;
