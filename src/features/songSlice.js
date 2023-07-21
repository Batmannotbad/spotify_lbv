import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  song: [],
  loading: true,
  error: null,
  currentSong:[]
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    getSong: (state, action) => {
      state.song = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    clearSongData: (state) => {
      state = initialState;
    },
  },
});

export const { getSong, setCurrentSong,clearSongData } = songSlice.actions;

export default songSlice.reducer;
