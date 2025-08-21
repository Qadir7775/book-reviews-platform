import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const login = async (credentials: any) => {
    const res = await axios.post(`${API_URL}/api/auth/login`, credentials);
    return res.data;
};

export const registerfetch = async (data: any) => {
    const res = await axios.post(`${API_URL}/api/auth/register`, data);
    return res.data;
};
