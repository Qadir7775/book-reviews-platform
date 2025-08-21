"use client";

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useToast } from "./ToastContext";

const GlobalToaster = () => {
    const { toasts, remove } = useToast();

    return (
        <>
            {toasts.map((toast) => (
                <Snackbar
                    key={toast.id}
                    open={true}
                    autoHideDuration={3000}
                    onClose={() => remove(toast.id)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        severity={toast.type === "loading" ? "info" : toast.type}
                        onClose={() => toast.closable && remove(toast.id)}
                        variant="filled"
                        sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}
                    >
                        {toast.type === "loading" && <CircularProgress size={16} color="inherit" />}
                        <div>
                            <div>{toast.title}</div>
                            {toast.description && <div style={{ fontSize: "0.875rem" }}>{toast.description}</div>}
                        </div>
                    </Alert>
                </Snackbar>
            ))}
        </>
    );
};

export default GlobalToaster;
