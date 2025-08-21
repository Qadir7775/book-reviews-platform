import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Book, UpdateBookData, BookState } from '../../types/book';
import { bookApi } from '../../api/bookApi';
import { RootState } from '../store';

const initialState: BookState = {
    books: [],
    loading: false,
    error: null,
    selectedBook: null,
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        const response = await bookApi.getBooks();
        return response;
    }
);

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (id: string) => {
        const response = await bookApi.getBook(id);
        return response;
    }
);

export const createBooks = createAsyncThunk(
    'books/createBooks',
    async ({ books, token }: { books: Omit<Book, "id" | "createdBy" | "createdAt">[], token: string }) => {
        const response = await bookApi.createBooks(books, token);
        return response;
    }
);

export const updateBook = createAsyncThunk(
    'books/updateBook',
    async ({ id, bookData, token }: { id: string, bookData: UpdateBookData, token: string }) => {
        const response = await bookApi.updateBook(id, bookData, token);
        return response;
    }
);

export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async ({ id, token }: { id: string, token: string }) => {
        await bookApi.deleteBook(id, token);
        return id;
    }
);

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setSelectedBook: (state, action: PayloadAction<Book | null>) => {
            state.selectedBook = action.payload;
        },
        clearSelectedBook: (state) => {
            state.selectedBook = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch books
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch books';
            });

        // Fetch single book
        builder
            .addCase(fetchBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBook = action.payload;
            })
            .addCase(fetchBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch book';
            });

        // Create books
        builder
            .addCase(createBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books.push(...action.payload);
            })
            .addCase(createBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create books';
            });

        // Update book
        builder
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.books.findIndex(book => book._id === action.payload._id);
                if (index !== -1) {
                    state.books[index] = action.payload;
                }
                if (state.selectedBook?._id === action.payload._id) {
                    state.selectedBook = action.payload;
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update book';
            });

        // Delete book
        builder
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.filter(book => book._id !== action.payload);
                if (state.selectedBook?._id === action.payload) {
                    state.selectedBook = null;
                }
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete book';
            });
    },
});

export const { clearError, setSelectedBook, clearSelectedBook } = bookSlice.actions;

export const selectBooks = (state: RootState) => state.books.books;
export const selectBooksLoading = (state: RootState) => state.books.loading;
export const selectBooksError = (state: RootState) => state.books.error;
export const selectSelectedBook = (state: RootState) => state.books.selectedBook;

export default bookSlice.reducer;
