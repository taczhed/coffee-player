import { configureStore } from "@reduxjs/toolkit"
import accessTokenReducer from "./accessTokenSlice"
import currentSongReducer from "./currentSongSlice"

const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    currentSong: currentSongReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
