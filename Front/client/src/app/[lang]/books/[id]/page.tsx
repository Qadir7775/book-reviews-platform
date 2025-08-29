"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { bookApi } from "@/api/bookApi";
import { Book } from "@/types/book";
import { Review } from "@/types/review";
import { reviewApi } from "@/api/reviewApi";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/slices/authSlice";
import Image from "next/image";
import Link from "next/link";

export default function BookDetailsPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
    const [reviewError, setReviewError] = useState<string | null>(null);

    const { token } = useSelector(selectAuth);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await bookApi.getBook(params.id);
                setBook(data);
            } catch (err: any) {
                setError(err?.message || "Failed to load book");
            } finally {
                setLoading(false);
            }
        };
        if (params?.id) fetchBook();
    }, [params]);

    useEffect(() => {
        const loadReviews = async () => {
            if (!params?.id) return;
            setReviewsLoading(true);
            setReviewError(null);
            try {
                const data = await reviewApi.getByBook(params.id);
                setReviews(data);
            } catch (err: any) {
                setReviewError(err?.message || "Failed to load reviews");
            } finally {
                setReviewsLoading(false);
            }
        };
        loadReviews();
    }, [params]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-12">
                        <div className="text-red-600 text-lg mb-4">{error || "Book not found"}</div>
                        <Link href="/books" className="text-blue-600 hover:underline">Back to books</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="text-sm text-gray-700 hover:text-gray-900"
                    >
                        ← Back
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="md:flex gap-6">
                        {book.coverImage && (
                            <div className="md:w-1/3 mb-4 md:mb-0">
                                <Image
                                    src={book.coverImage}
                                    alt={`Cover of ${book.title}`}
                                    width={320}
                                    height={480}
                                    className="w-full h-auto rounded"
                                />
                            </div>
                        )}

                        <div className="md:flex-1 space-y-3">
                            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">{book.title}</h1>
                            <div className="text-gray-700">by {book.author}</div>
                            <div className="text-sm text-gray-500">Added on {new Date(book.createdAt).toLocaleDateString()}</div>
                            <p className="text-gray-800 leading-relaxed mt-4">{book.description}</p>
                        </div>
                    </div>

                    <ReviewsSection
                        bookId={book._id}
                        reviews={reviews}
                        loading={reviewsLoading}
                        error={reviewError}
                        onRefresh={async () => {
                            const data = await reviewApi.getByBook(book._id);
                            setReviews(data);
                        }}
                        token={token}
                    />
                </div>
            </div>
        </div>
    );
}


interface ReviewsSectionProps {
    bookId: string;
    reviews: Review[];
    loading: boolean;
    error: string | null;
    onRefresh: () => Promise<void> | void;
    token: string | null;
}

function ReviewsSection({ bookId, reviews, loading, error, onRefresh, token }: ReviewsSectionProps) {
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setSubmitError("Please sign in to leave a review.");
            return;
        }
        setSubmitting(true);
        setSubmitError(null);
        try {
            await reviewApi.create({ book: bookId, rating, comment }, token);
            setComment("");
            setRating(5);
            await onRefresh();
        } catch (err: any) {
            setSubmitError(err?.message || "Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!token) return;
        try {
            await reviewApi.remove(id, token);
            await onRefresh();
        } catch {
            // ignore; backend handles authorization
        }
    };

    return (
        <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>

            {loading && (
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    Loading reviews...
                </div>
            )}

            {error && <div className="text-red-600 mb-4">{error}</div>}

            {reviews.length === 0 && !loading && (
                <div className="text-gray-600 mb-6">No comments yet. Be the first to review!</div>
            )}

            <ul className="space-y-4 mb-8">
                {reviews.map((r) => {
                    const userObj = typeof r.user === 'string' ? null : r.user;
                    const displayName = userObj?.username || userObj?.name || 'User';
                    return (
                        <li key={r._id} className="border rounded-md p-4 bg-gray-50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-semibold text-gray-900">{displayName}</div>
                                    <div className="text-yellow-600 text-sm">Rating: {r.rating} / 5</div>
                                </div>
                                {token && (
                                    <button
                                        onClick={() => handleDelete(r._id)}
                                        className="text-red-600 text-sm hover:underline"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                            <p className="text-gray-800 mt-2 whitespace-pre-wrap">{r.comment}</p>
                            <div className="text-xs text-gray-500 mt-1">{new Date(r.createdAt).toLocaleString()}</div>
                        </li>
                    );
                })}
            </ul>

            <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-md border">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Rating</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="border rounded px-2 py-1"
                        >
                            {[1, 2, 3, 4, 5].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm text-gray-700 mb-1">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border rounded px-3 py-2 min-h-[80px]"
                            placeholder="Write your thoughts about this book..."
                        />
                    </div>
                    <div className="self-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
                        >
                            {submitting ? 'Posting...' : 'Post Review'}
                        </button>
                    </div>
                </div>
                {submitError && <div className="text-red-600 mt-2 text-sm">{submitError}</div>}
                {!token && (
                    <div className="text-sm text-gray-600 mt-2">
                        Please sign in to leave a review.
                    </div>
                )}
            </form>
        </div>
    );
}


