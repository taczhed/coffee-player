import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface currentSongState {
  value: string | undefined
}

const initialState = {
  value: undefined,
} as currentSongState

export const currentSongSlice = createSlice({
  name: "currentSong",
  initialState,
  reducers: {
    handleCurrentSong: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

// const accessToken = useSelector((state) => state.accessToken.value)

export const { handleCurrentSong } = currentSongSlice.actions
export default currentSongSlice.reducer