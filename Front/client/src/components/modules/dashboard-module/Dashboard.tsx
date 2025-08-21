"use client";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../store/slices/authSlice';
import BookList from './BookList';
import AddBookForm from './AddBookForm';
import { Book } from '../../../types/book';

const Dashboard: React.FC = () => {
    const { user } = useSelector(selectAuth);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const handleAddSuccess = () => {
        setShowAddForm(false);
    };

    const handleEditBook = (book: Book) => {
        setEditingBook(book);
        setShowAddForm(true);
    };

    const handleCancel = () => {
        setShowAddForm(false);
        setEditingBook(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.name || 'User'}!
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Manage your book collection and discover new reads.
                    </p>
                </div>

                <div className="mb-8 flex justify-between items-center">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Add New Book
                        </button>
                    </div>
                </div>

                {showAddForm ? (
                    <div className="mb-8">
                        <AddBookForm
                            onSuccess={handleAddSuccess}
                            onCancel={handleCancel}
                        />
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Your Books
                        </h2>
                        <BookList onEditBook={handleEditBook} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
