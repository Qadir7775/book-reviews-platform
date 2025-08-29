import { Review } from "@/types/review";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const reviewApi = {
    getByBook: async (bookId: string): Promise<Review[]> => {
        const res = await fetch(`${API_BASE_URL}/api/reviews/book/${bookId}`, {
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
    },

    create: async (
        data: { book: string; rating: number; comment: string },
        token: string
    ): Promise<Review> => {
        const res = await fetch(`${API_BASE_URL}/api/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to create review");
        return res.json();
    },

    update: async (
        id: string,
        data: { rating?: number; comment?: string },
        token: string
    ): Promise<Review> => {
        const res = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to update review");
        return res.json();
    },

    remove: async (id: string, token: string): Promise<void> => {
        const res = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to delete review");
    },
};


