"use client";
import React from 'react';
import { Book } from '../../../types/book';
import { deleteBook, setSelectedBook } from '../../../store/slices/bookSlice';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../store/slices/authSlice';
import { useAppDispatch } from '@/store/hooks';
import Image from 'next/image';

interface BookCardProps {
    book: Book;
    onEdit?: (book: Book) => void;
    showActions?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, showActions = true }) => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(selectAuth);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await dispatch(deleteBook({ id: book._id, token: token! })).unwrap();
            } catch (error) {
                console.error('Failed to delete book:', error);
            }
        }
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(book);
        } else {
            dispatch(setSelectedBook(book));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            {book.coverImage && (
                <div className="mb-4">
                    <Image
                        src={book.coverImage}
                        alt={`Cover of ${book.title}`}
                        width={200}
                        height={300}
                        className="w-full h-48 object-cover rounded-md"
                    />
                </div>
            )}

            <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {book.title}
                </h3>

                <p className="text-gray-600 font-medium">
                    by {book.author}
                </p>

                <p className="text-gray-700 text-sm line-clamp-3">
                    {book.description}
                </p>

                <div className="text-xs text-gray-500">
                    Added on {new Date(book.createdAt).toLocaleDateString()}
                </div>

                {showActions && (
                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={handleEdit}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookCard;
