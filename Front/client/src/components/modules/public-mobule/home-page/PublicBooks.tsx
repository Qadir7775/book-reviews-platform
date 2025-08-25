"use client";
import React from 'react';
import BookList from '@/components/modules/dashboard-module/BookList';

const PublicBooksPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">All Books</h1>
                <BookList publicView />
            </div>
        </div>
    );
};

export default PublicBooksPage;


