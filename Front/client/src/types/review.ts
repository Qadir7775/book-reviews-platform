export interface ReviewUser {
    _id: string;
    username?: string;
    name?: string;
}

export interface Review {
    _id: string;
    user: ReviewUser | string;
    book: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}


