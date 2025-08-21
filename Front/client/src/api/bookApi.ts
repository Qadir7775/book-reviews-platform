import { Book } from '../types/book';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const bookApi = {
    getBooks: async (): Promise<Book[]> => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/api/books/my`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        return response.json();
    },



    // Get a single book by ID
    getBook: async (id: string): Promise<Book> => {
        const response = await fetch(`${API_BASE_URL}/api/books/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book');
        }
        return response.json();
    },

    // Create new books
    createBooks: async (books: Omit<Book, 'id' | 'createdBy' | 'createdAt'>[], token: string): Promise<Book[]> => {
        const response = await fetch(`${API_BASE_URL}/api/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(books)
        });
        if (!response.ok) {
            throw new Error('Failed to create books');
        }
        return response.json();
    },

    // Update a book
    updateBook: async (id: string, bookData: Partial<Book>, token: string): Promise<Book> => {
        const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookData)
        });
        if (!response.ok) {
            throw new Error('Failed to update book');
        }
        return response.json();
    },

    // Delete a book
    deleteBook: async (id: string, token: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/api/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    }
};
