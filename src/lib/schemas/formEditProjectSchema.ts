import { z } from "zod"

export const formEditProjectSchema = z.object({
  editProjectName: z
    .string()
    .refine((name) => !name || name.length >= 2, "Nome muito curto")
    .refine((name) => !name || name.length <= 30, "Nome muito grande")
    .refine((name) => !name || /\S/.test(name), "Não deve estar vazio")
    .transform((name) =>
      name
        ? name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : undefined,
    )
    .optional(),

  editProjectDate: z
    .string()
    .optional()
    .refine(
      (date) => !date || /^\d{4}-\d{2}-\d{2}$/.test(date),
      "Formato inválido",
    )
    .refine((date) => !date || !Number.isNaN(Date.parse(date)), "Data Invalida")
    .refine(
      (date) => {
        if (!date) return true

        const currentDate = new Date(`${date}T00:00:00`)
        if (Number.isNaN(currentDate.getTime())) return false

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        return currentDate > today
      },
      {
        message: "A data deve ser futura",
      },
    ),

  editProjectCover: z
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

  editProjectPriority: z.enum(["low", "medium", "high"]).nullish(),

  editProjectTags: z.array(
    z.object({
      id: z.number().min(0, "O ID não pode ser menor que zero"),
      name: z.string().regex(/\S/, "A tag não deve estar vazia"),
    }),
  ),
})
