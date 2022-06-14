import { createSlice } from "@reduxjs/toolkit";
import * as authActions from './auth.actions';

export const AUTH_FEATURE: string = "authFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: any;
    currentUser: any;
}

export const initialState: InitialState = {
    loading: false,
    errorMessage: null,
    currentUser: null
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        // register a user
        builder.addCase(authActions.registerUser.pending, (state) => {
            state.loading = true;
        }).addCase(authActions.registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action
        }).addCase(authActions.registerUser.rejected, (state, action) => {
            state.loading = false;
            state.currentUser = null;
            state.errorMessage = action.error
        })
            // Login user
            .addCase(authActions.loginUser.pending, (state) => {
                state.loading = true;
            }).addCase(authActions.loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload
            }).addCase(authActions.loginUser.rejected, (state, action) => {
                state.loading = false;
                state.currentUser = null;
                state.errorMessage = action.error
            })
            // LogOut user
            .addCase(authActions.logOutUser.pending, (state) => {
                state.loading = true;
            }).addCase(authActions.logOutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = null;
            }).addCase(authActions.logOutUser.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.error
            })

            // Google Login
            .addCase(authActions.googleLogin.pending, (state) => {
                state.loading = true;
            }).addCase(authActions.googleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload
            }).addCase(authActions.googleLogin.rejected, (state, action) => {
                state.loading = false;
                state.currentUser = null;
                state.errorMessage = action.error
            })

            // Facebook Login
            .addCase(authActions.facebookLogin.pending, (state) => {
                state.loading = true;
            }).addCase(authActions.facebookLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload
            }).addCase(authActions.facebookLogin.rejected, (state, action) => {
                state.loading = false;
                state.currentUser = null;
                state.errorMessage = action.error
            })
    }
})
export const { setUser } = authSlice.actions;