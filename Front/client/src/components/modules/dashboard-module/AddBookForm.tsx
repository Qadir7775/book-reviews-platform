"use client";
import React, { useEffect } from "react";
import { createBooks, selectBooksLoading, updateBook } from "../../../store/slices/bookSlice";
import { selectAuth } from "../../../store/slices/authSlice";
import { CreateBookData, Book, UpdateBookData } from "../../../types/book";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import FormInput from "@/components/customs/inputs/FormInput";
import { useForm } from "react-hook-form";

interface AddBookFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    book?: Book | null;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onSuccess, onCancel, book }) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectBooksLoading);
    const { token } = useAppSelector(selectAuth);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CreateBookData>({
        defaultValues: {
            title: "",
            author: "",
            description: "",
            coverImage: "",
        },
    });

    // Prefill when editing
    useEffect(() => {
        if (book) {
            setValue("title", book.title || "");
            setValue("author", book.author || "");
            setValue("description", book.description || "");
            setValue("coverImage", book.coverImage || "");
        }
    }, [book, setValue]);

    const onSubmit = async (data: CreateBookData) => {
        if (!token) {
            alert("You must be logged in to add books");
            return;
        }

        try {
            if (book && book._id) {
                const updateData: UpdateBookData = {
                    title: data.title,
                    author: data.author,
                    description: data.description,
                    coverImage: data.coverImage,
                };
                await dispatch(updateBook({ id: book._id, bookData: updateData, token })).unwrap();
            } else {
                await dispatch(
                    createBooks({
                        books: [
                            {
                                ...data,
                                _id: "",
                                updatedAt: new Date().toISOString(),
                            },
                        ],
                        token,
                    })
                ).unwrap();
            }
            onSuccess?.();
        } catch (error) {
            console.error(book ? "Failed to update book:" : "Failed to create book:", error);
            alert(book ? "Failed to update book. Please try again." : "Failed to create book. Please try again.");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{book ? "Edit Book" : "Add New Book"}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormInput
                    header="Title *"
                    label="Book Title"
                    name="title"
                    field="title"
                    register={register}
                    errors={errors}
                />

                <FormInput
                    header="Author *"
                    label="Author"
                    name="author"
                    field="author"
                    register={register}
                    errors={errors}
                />

                <FormInput
                    header="Description *"
                    label="Description"
                    name="description"
                    field="description"
                    type="text"
                    register={register}
                    errors={errors}
                />

                <FormInput
                    header="Cover Image"
                    label="Cover Image URL"
                    name="coverImage"
                    field="coverImage"
                    type="url"
                    register={register}
                    errors={errors}
                />

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (book ? "Updating..." : "Adding...") : book ? "Update Book" : "Add Book"}
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
