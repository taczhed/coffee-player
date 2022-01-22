import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface accessTokenState {
  value: string | undefined
}

const initialState = {
  value: undefined,
} as accessTokenState

export const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    handleAccessToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

// const accessToken = useSelector((state) => state.accessToken.value)

export const { handleAccessToken } = accessTokenSlice.actions
export default accessTokenSlice.reducer
