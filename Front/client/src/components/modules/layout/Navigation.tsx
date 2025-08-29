"use client";
import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../../../store/slices/authSlice';
import { useRouter } from 'next/navigation';

const Navigation: React.FC = () => {
    const { user, token } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/auth/signin');
    };

    if (!token || !user) {
        return (
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-900">
                                Book Reviews
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/auth/signin"
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            Book Reviews
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700 text-sm">
                            Welcome, {user.name}
                        </span>
                        <Link
                            href="/profile"
                            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
