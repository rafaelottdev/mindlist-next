import { z } from "zod"

export const formChangeProfileSchema = z.object({
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
      "O nome precisa ter no mínimo 2 caracteres",
    )
    .refine(
      (name) => !name || name.length <= 10,
      "O nome só pode ter no maximo 10 caracteres",
    )
    .refine(
      (name) => !name || /^\S+(?: \S+)?$/.test(name),
      "O nome não pode conter mais de 1 espaço",
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
})
