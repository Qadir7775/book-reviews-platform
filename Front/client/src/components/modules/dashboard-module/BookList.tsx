"use client";
import React, { useEffect } from 'react';
import { fetchBooks, selectBooks, selectBooksLoading, selectBooksError } from '../../../store/slices/bookSlice';
import BookCard from './BookCard';
import { Book } from '../../../types/book';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface BookListProps {
    onEditBook?: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ onEditBook }) => {
    const dispatch = useAppDispatch();
    const books = useAppSelector(selectBooks);
    const loading = useAppSelector(selectBooksLoading);
    const error = useAppSelector(selectBooksError);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 text-lg mb-4">Error loading books</div>
                <div className="text-gray-600">{error}</div>
                <button
                    onClick={() => dispatch(fetchBooks())}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-600 text-lg mb-2">No books found</div>
                <div className="text-gray-500">Start by adding some books to your collection</div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
                <BookCard
                    key={book._id}
                    book={book}
                    onEdit={onEditBook}
                />
            ))}
        </div>
    );
};

export default BookList;
