"use client";
import React, { useState } from 'react';
import { createBooks, selectBooksLoading } from '../../../store/slices/bookSlice';
import { selectAuth } from '../../../store/slices/authSlice';
import { CreateBookData } from '../../../types/book';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface AddBookFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onSuccess, onCancel }) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectBooksLoading);
    const { token } = useAppSelector(selectAuth);

    const [formData, setFormData] = useState<CreateBookData>({
        title: '',
        author: '',
        description: '',
        coverImage: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            alert('You must be logged in to add books');
            return;
        }

        try {
            await dispatch(
                createBooks({
                    books: [
                        {
                            ...formData,
                            _id: '',
                            updatedAt: new Date().toISOString(),
                        }
                    ],
                    token
                })
            ).unwrap();
            setFormData({ title: '', author: '', description: '', coverImage: '' });
            onSuccess?.();
        } catch (error) {
            console.error('Failed to create book:', error);
            alert('Failed to create book. Please try again.');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Book</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter book title"
                    />
                </div>

                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                        Author *
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter author name"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter book description"
                    />
                </div>

                <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                        Cover Image URL (optional)
                    </label>
                    <input
                        type="url"
                        id="coverImage"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter cover image URL"
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Adding...' : 'Add Book'}
                    </button>

                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddBookForm;
