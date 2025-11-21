import { z } from "zod";

const baseSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.email().min(1),
  providerID: z.string().nullable(),
});

const localSchema = baseSchema.extend({
  provider: z.literal("local"),
  password: z
    .string()
    .min(8, "A senha precisa ter no minimo 8 caracteres")
    .regex(/[a-z]+/, "É necessario pelo menos uma letra minuscula")
    .regex(/[A-Z]+/, "É necessario pelo menos uma letra maiuscula")
    .regex(/[0-9]+/, "É necessario pelo menos um número")
    .regex(/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]+/, "É necessário conter pelo menos um caracter especial."),
});

const facebookSchema = baseSchema.extend({
  provider: z.literal("facebook"),
  password: z.null(),
});

const googleSchema = baseSchema.extend({
  provider: z.literal("google"),
  password: z.null(),
});

const eventSchema = z.union([localSchema, facebookSchema, googleSchema]);

const registerSchema = z.union([localSchema.omit({ id: true }), facebookSchema.omit({ id: true }), googleSchema.omit({ id: true })]);

type Tevent = z.infer<typeof eventSchema>;
type Tregister = z.infer<typeof registerSchema>;

export { eventSchema, registerSchema, Tevent, Tregister };
