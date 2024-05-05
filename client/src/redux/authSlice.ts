import {createSlice} from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface AuthState {
    isLoggedIn: boolean
}

const initialState : AuthState = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'isLoggedIn',
    initialState,
    reducers: {
        toggleAuth: (state) => {
            state.isLoggedIn = !state.isLoggedIn
        }
    }
})

export const {toggleAuth} = authSlice.actions;
export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn

export default authSlice.reducer;