"use server";

import { z } from "zod";
import sql from "@/app/lib/db/postgres";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["buyer", "seller", "admin"]).default("buyer"),
});

const RegisterFormSchema = FormSchema;

export async function register(prevState: any, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or Invalid Fields. Failed to Register.",
    };
  }

  const { name, email, password, role } = validatedFields.data;

  try {
    // Check if user exists
    const existingUser = await sql`SELECT 1 FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return {
        message: "Email already in use.",
        errors: { email: ["Email already in use."] },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role})
    `;
  } catch (error) {
    console.error("Registration error:", error);
    return {
      message: "Database Error: Failed to Register User.",
    };
  }

  redirect("/auth/login");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  let redirectTo = "/products"; // Default redirect for buyers

  try {
    if (email) {
      const existingUser = await sql`SELECT role FROM users WHERE email = ${email}`;
      if (existingUser.length > 0) {
        const role = existingUser[0].role;
        if (role === "admin") redirectTo = "/admin";
        else if (role === "seller") redirectTo = "/seller";
      }
    }

    const credentials = Object.fromEntries(formData);
    credentials.redirectTo = redirectTo;

    await signIn("credentials", credentials);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
