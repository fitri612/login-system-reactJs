import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoginPending: false,
    isLoginSuccess: false,
    errorMessages: null,
    user: {}
}

function callLoginApi(email, password) {
    return new  Promise(function(resolve, reject) {
        setTimeout(() => {
            if (email === 'fitri@login.com' && password === 'admin') {
                resolve({
                    email: email,
                })
            }
            else {
                reject('Invalid email or password')
            }
        }, 1000)
    })
}

export const authLoginAPI = createAsyncThunk('auth/login', async({email, password}) => {
    try {
        const response = await callLoginApi(email, password)
        return response
    }
    catch (error) {
        throw(error)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(authLoginAPI.pending, (state) => {
            state.isLoginPending = true
        })
        .addCase(authLoginAPI.fulfilled, (state, action) => {
            console.log('fulfilled', action)
            const { email } = action.payload
            state.isLoginPending = false
            state.isLoginSuccess = true
            state.user = { email }
        })
        .addCase(authLoginAPI.rejected, (state, action) => {
            console.log('rejected', action)
            state.isLoginPending = false
            state.errorMessages = action.error.message
        })
    }
})

export default authSlice.reducer