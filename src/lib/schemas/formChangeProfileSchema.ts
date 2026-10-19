import { z } from "zod"

export const formChangeProfileSchema = z
  .object({
    profileImage: z
      .custom<FileList>(
        (value) => typeof FileList !== "undefined" && value instanceof FileList,
        "Selecione um arquivo válido",
      )
      .optional()
      .refine((files) => {
        const file = files?.item(0)

        return !file || file.size <= 5 * 1024 * 1024
      }, "A imagem precisa ter no máximo 5 MB")
      .refine((files) => {
        const file = files?.item(0)

        return (
          !file ||
          ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
            file.type,
          )
        )
      }, "Formato da imagem invalido"),

    profileName: z
      .string()
      .trim()
      .refine(
        (name) => !name || name.length >= 2,
        "Precisa ter no mínimo 2 caracteres",
      )
      .refine(
        (name) => !name || name.length <= 10,
        "Só pode ter no maximo 10 caracteres",
      )
      .refine(
        (name) => !name || /^\S+(?: \S+)?$/.test(name),
        "Não pode conter mais de 1 espaço",
      )
      .transform((name) =>
        name
          ? name
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          : undefined,
      )
      .optional(),

    currentPassword: z
      .string()
      .refine(
        (password) => !password || /^\S+$/.test(password),
        "Não pode conter espaços",
      )
      .optional(),

    changePassword: z
      .string()
      .refine(
        (password) => !password || password.length >= 8,
        "Precisa ter no mínimo 8 caracteres",
      )
      .refine(
        (password) => !password || password.length <= 10,
        "Só pode ter no maximo 10 caracteres",
      )
      .refine(
        (password) => !password || /(?=.*?[A-Z])/.test(password),
        "Precisa ter 1 letra maiúscula",
      )
      .refine(
        (password) => !password || /(?=.*?[a-z])/.test(password),
        "Precisa ter 1 letra minúscula",
      )
      .refine(
        (password) => !password || /(?=.*?[0-9])/.test(password),
        "Precisa ter 1 número",
      )
      .refine(
        (password) => !password || /(?=.*[#?!@$%^&)(*-])/.test(password),
        "Precisa ter 1 caractere especial",
      )
      .refine(
        (password) => !password || /^\S+$/.test(password),
        "Não pode conter espaços",
      )
      .optional(),
  })
  .superRefine((form, ctx) => {
    const current = form.currentPassword
    const next = form.changePassword

    if (current && !next) {
      ctx.addIssue({
        code: "custom",
        message: "Digite a nova senha",
        path: ["changePassword"],
      })
    }

    if (next && !current) {
      ctx.addIssue({
        code: "custom",
        message: "Digite a senha atual",
        path: ["currentPassword"],
      })
    }

    if (current && next && current === next) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas precisam ser diferentes",
        path: ["changePassword"],
      })
    }
  })
