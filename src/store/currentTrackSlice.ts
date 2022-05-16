import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface currentTrackState {
  value: any
}

const initialState = {
  value: undefined,
} as currentTrackState

export const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState,
  reducers: {
    handleCurrentTrack: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
  },
})

// const accessToken = useSelector((state) => state.accessToken.value)

export const { handleCurrentTrack } = currentTrackSlice.actions
export default currentTrackSlice.reducer
