import { z } from "zod"

export const formLoginSchema = z.object({
  email: z.email("O email precisa ser válido").toLowerCase().trim(),
  password: z
    .string()
    .min(8, "A senha precisa ter no mínimo 8 caracteres")
    .max(10, "A senha só pode ter no maximo 10 caracteres")
    .regex(/(?=.*?[A-Z])/, "A senha precisa conter 1 letra maiúscula")
    .regex(/(?=.*?[a-z])/, "A senha precisa conter 1 letra minúscula")
    .regex(/(?=.*?[0-9])/, "A senha precisa conter 1 número")
    .regex(
      /(?=.*[#?!@$%^&)(*-])/,
      "A senha precisa conter 1 caractere especial",
    )
    .regex(/^\S+$/, "A senha não pode conter espaços"),
})
