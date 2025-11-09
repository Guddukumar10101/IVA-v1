// src/schema/contactSchema.ts
import * as z from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email address." }),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, { message: "Invalid phone number." })
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters." })
    .max(100, { message: "Subject cannot exceed 100 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000, { message: "Message cannot exceed 1000 characters." }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
