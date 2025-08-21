// validations/signupValidation.ts
import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(2, "Ad minimum 2 simvol olmalıdır"),
    email: z.string().email("Düzgün email daxil edin"),
    password: z.string().min(6, "Şifrə minimum 6 simvol olmalıdır"),
});
