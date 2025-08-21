"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning" | "loading";

interface Toast {
    id: number;
    title: string;
    description?: string;
    type: ToastType;
    closable?: boolean;
}

type ToastState = Toast[];

type ToastAction =
    | { type: "ADD_TOAST"; toast: Omit<Toast, "id"> }
    | { type: "REMOVE_TOAST"; id: number };

const ToastContext = createContext<{
    toasts: ToastState;
    create: (toast: Omit<Toast, "id">) => void;
    remove: (id: number) => void;
}>({
    toasts: [],
    create: () => { },
    remove: () => { },
});

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
    switch (action.type) {
        case "ADD_TOAST":
            return [...state, { ...action.toast, id: new Date().getTime() }];
        case "REMOVE_TOAST":
            return state.filter((t) => t.id !== action.id);
        default:
            return state;
    }
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, dispatch] = useReducer(toastReducer, []);

    const create = (toast: Omit<Toast, "id">) => dispatch({ type: "ADD_TOAST", toast });
    const remove = (id: number) => dispatch({ type: "REMOVE_TOAST", id });

    return (
        <ToastContext.Provider value={{ toasts, create, remove }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
