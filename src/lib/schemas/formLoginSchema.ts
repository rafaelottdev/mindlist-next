import { z } from "zod"

export const formLoginSchema = z.object({
  email: z
    .email("O email precisa ser válido")
    .max(150, "O email esta muito grande")
    .regex(/^[^@\s]{1,64}@[^\s@]+$/, "O email esta muito grande")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, "A senha precisa ter no mínimo 8 caracteres")
    .max(10, "A senha só pode ter no maximo 10 caracteres")
    .regex(/^\S+$/, "A senha não pode conter espaços"),
})
