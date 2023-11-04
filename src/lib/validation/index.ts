import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Nome muito pequeno!"}),
    username: z.string().min(2, {message: "Nome de usuário muito pequeno!"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "A senha deve conter pelo menos 8 caracteres!"}),
  });
  
  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "A senha deve conter pelo menos 8 caracteres!"}),
  });

  export const PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string(),
  });