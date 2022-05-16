import { configureStore } from "@reduxjs/toolkit"
import currentTrackReducer from "./currentTrackSlice"

const store = configureStore({
  reducer: {
    currentTrack: currentTrackReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
