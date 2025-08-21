// src/app/auth/signin/page.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button, Box, Typography } from "@mui/material";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/customs/inputs/FormInput";
import { signinSchema } from "@/components/validations/signinValidation";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/api/authApi";
import { loginSuccess } from "@/store/slices/authSlice";
import { useToast } from "@/components/ui/ToastContext";



type SignInFormData = z.infer<typeof signinSchema>;

const SignInPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signinSchema),
    });
    const dispatch = useDispatch();
    const router = useRouter();
    const { create } = useToast();

    const onSubmit = async (data: SignInFormData) => {
        try {
            const logindata = await login(data);
            create({
                title: "Uğurla daxil oldunuz",
                type: "success",
                closable: true,
            });
            dispatch(loginSuccess(logindata));
            router.push('/profile');
        } catch (err) {
            console.error(err);
            create({
                title: "Daxil olma uğursuz oldu",
                type: "error",
                closable: true,
            });
        }
    };




    return (
        <section>
            <Box maxWidth={400} mx="auto" mt={10}>
                <Typography variant="h4" mb={3}>Daxil ol</Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormInput
                        label="Email"
                        name="email"
                        field="email"
                        type="email"
                        register={register}
                        errors={errors}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        field="password"
                        label="Password"
                        register={register}
                        errors={errors}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isSubmitting}
                        sx={{ mt: 2 }}
                    >
                        Daxil ol
                    </Button>
                </form>
            </Box>
        </section>
    );
};

export default SignInPage;
