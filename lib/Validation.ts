import { z } from "zod";

export const userFormValidation = z.object({
    name: z.string()
      .min(2, { message: "Username must be at least 2 characters." })
      .max(50, { message: "Username must be at most 50 characters." }),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), { message: "Invalid phone number" })
  });
  