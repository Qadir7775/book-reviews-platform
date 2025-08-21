"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/store/slices/authSlice";
import axios from "axios";

export default function AppInit() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                dispatch(loginSuccess({ user: res.data, token }));
            })
            .catch(() => {
                localStorage.removeItem("token");
                dispatch(logout());
            });
    }, [dispatch]);

    return null;
}
