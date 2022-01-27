import { configureStore } from "@reduxjs/toolkit"
import accessTokenReducer from "./features/accessTokenSlice"
import currentSongReducer from "./features/currentSongSlice"

const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    currentSong: currentSongReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
