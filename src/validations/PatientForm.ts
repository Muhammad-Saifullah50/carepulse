import { z } from "zod"

export const PatientFormSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name must be at most 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), { message: "Invalid phone number" })
})
