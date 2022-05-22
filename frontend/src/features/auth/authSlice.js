// burasi users icin ana state

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Register user
export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user) // authService.den gelen register() fonksiyonunu calistiriyorum
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Login user
export const login = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user) // authService.den gelen login() fonksiyonunu calistiriyorum
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Logout user
export const logout = createAsyncThunk('auth/logout',
    async () => {
        await authService.logout() // authService.den gelen logout() fonksiyonunu calistiriyorum
    }
)

//*** A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state. */
export const authSlice = createSlice({
    name: 'auth',
    initialState, // initialState'i builder parametresi olarak burdan gonderiyorum
    reducers: {
        reset: (state) => { // state'i resetlemek icin
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        /* 
            builder dedigimiz initialState
            burda case'lere gore state degisimlerini yapiyorum
            pending,rejected,fulfilled,typePrefix createAsyncThunk'dan parametre olarak geliyor
        */
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer