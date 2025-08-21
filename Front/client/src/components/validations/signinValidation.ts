import z from "zod";

export const signinSchema = z.object({
    email: z.string().email("Düzgün email daxil edin"),
    password: z.string().min(6, "Ən az 6 simvol olmalıdır"),
});