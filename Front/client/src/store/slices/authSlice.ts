import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: { name?: string; email: string } | null;
    token: string | null;
}

function getUserFromStorage() {
    if (typeof window === "undefined") return null;
    try {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    } catch {
        return null;
    }
}

function getTokenFromStorage() {
    if (typeof window === "undefined") return null;
    try {
        return localStorage.getItem("token");
    } catch {
        return null;
    }
}

const initialState: AuthState = {
    user: getUserFromStorage(),
    token: getTokenFromStorage(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(state.user));
                localStorage.setItem("token", state.token!);
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state: any) => state.auth;
export default authSlice.reducer;
