import { z } from "zod"

export const formChangePerfilSchema = z.object({
  perfilImage: z
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

  perfilName: z
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
})
