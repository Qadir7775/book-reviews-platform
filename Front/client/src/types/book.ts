export interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    coverImage?: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface BookState {
    books: Book[];
    loading: boolean;
    error: string | null;
    selectedBook: Book | null;
}

export interface CreateBookData {
    title: string;
    author: string;
    description: string;
    coverImage?: string;
}

export interface UpdateBookData {
    title?: string;
    author?: string;
    description?: string;
    coverImage?: string;
}
