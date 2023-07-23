import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface authState {
  email: string | null
  role:string | null
  userName:string |null
}

// Define the initial state using that type
const initialState: authState = {
    email: "",
    role:"",
    userName:""
}

export const loginSlice = createSlice({
  name: 'login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginHandlerFunc: (state,action) => {
      state.email = action.payload.email
      state.role = action.payload.role
      state.userName = action.payload.username
    },
    logoutHandlerFunc: (state) => {
        state.email = null
        state.role = null
        state.userName = null
    },
  },
})

export const { loginHandlerFunc, logoutHandlerFunc } = loginSlice.actions
export const loginReducer =  loginSlice.reducer
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.login.value

