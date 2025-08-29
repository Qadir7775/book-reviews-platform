"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Box, Typography } from "@mui/material";
import { signupSchema } from "@/components/validations/signupValidation";
import FormInput from "@/components/customs/inputs/FormInput";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import { registerfetch } from "@/api/authApi";
import { useRouter } from "next/navigation";


type SignUpFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signupSchema),
    });
    const dispatch = useDispatch();
    const routes = useRouter();

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const registerdata = await registerfetch(data);
            console.log("registerdata");

            dispatch(loginSuccess(registerdata));
            routes.push("/auth/signin");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section>
            <Box maxWidth={400} mx="auto" mt={10}>
                <Typography variant="h5" gutterBottom>
                    Qeydiyyat
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    <FormInput
                        label="Istifadəçi adı"
                        name="username"
                        field="username"
                        type="text"
                        register={register}
                        errors={errors}
                    />

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

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Qeydiyyatdan keç
                    </Button>
                </form>
            </Box>
        </section>
    );
};

export default SignupForm;
