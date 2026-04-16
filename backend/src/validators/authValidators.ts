import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 chars"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be atleast 6 chars"),
  orgName: z.string().min(2, "Organization name erquired"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be atleast 6 chars"),
});
