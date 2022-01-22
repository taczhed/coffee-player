import { configureStore } from "@reduxjs/toolkit"
import accessTokenReducer from "./features/accessTokenSlice"

const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
