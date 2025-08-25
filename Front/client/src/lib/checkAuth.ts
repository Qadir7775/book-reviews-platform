import { NextRequest } from "next/server";

export async function checkAuth(req: NextRequest) {
    const token = req.cookies.get("token")?.value;


    if (!token) {
        return { isAuth: false };
    }

    return { isAuth: true };
}
