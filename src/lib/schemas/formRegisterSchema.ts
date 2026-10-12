import { z } from "zod"

export const formRegisterSchema = z.object({
  name: z
    .string()
    .min(2, "O nome precisa ter no mínimo 2 caracteres")
    .max(10, "O nome só pode ter no maximo 10 caracteres")
    .regex(/\S/, "O nome não deve estar vazio")
    .regex(/^\S+(?:\s\S+)?$/, "O nome não pode conter mais de 1 espaço")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(" ")
    }),
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
    .regex(/(?=.*?[A-Z])/, "A senha precisa conter 1 letra maiúscula")
    .regex(/(?=.*?[a-z])/, "A senha precisa conter 1 letra minúscula")
    .regex(/(?=.*?[0-9])/, "A senha precisa conter 1 número")
    .regex(
      /(?=.*[#?!@$%^&)(*-])/,
      "A senha precisa conter 1 caractere especial",
    )
    .regex(/^\S+$/, "A senha não pode conter espaços"),
})
