import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("E-mail invalido").min(1),
  password: z.string().min(1),
});

export const registerSchema = z
  .object({
    name: z.string().min(3),
    email: z.email("E-mail invalido").min(1),
    password: z
      .string()
      .min(8, "A senha precisa ter no minimo 8 caracteres")
      .regex(/[a-z]+/, "É necessario pelo menos uma letra minuscula")
      .regex(/[A-Z]+/, "É necessario pelo menos uma letra maiuscula")
      .regex(/[0-9]+/, "É necessario pelo menos um número")
      .regex(/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]+/, "É necessário conter pelo menos um caracter especial."),
    confirmPwd: z.string(),
  })
  .refine(({ password, confirmPwd }) => password === confirmPwd, {
    message: "As senhas não correspondem",
    path: ["confirmPwd"],
  });
