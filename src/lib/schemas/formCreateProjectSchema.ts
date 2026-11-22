import { z } from "zod"

export const formCreateProjectSchema = z.object({
  projectName: z
    .string()
    .min(2, "Nome muito curto")
    .max(15, "Nome muito grande")
    .regex(/\S/, "Não deve estar vazio")
    .transform((name) =>
      name
        ?.split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    ),

  projectDate: z
    .string()
    .regex(/\S/, "A data é obrigatoria")
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Formato inválido",
    })
    .refine((date) => !Number.isNaN(Date.parse(date)), {
      message: "Data Invalida",
    })
    .refine(
      (date) => {
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
  projectCover: z
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

  projectPriority: z.enum(["low", "medium", "high"], "Valor Invalido"),

  projectTags: z
    .array(
      z.object({
        id: z.number().min(0, "O ID não pode ser menor que zero"),
        name: z.string().regex(/\S/, "A tag não deve estar vazia"),
      }),
    )
    .min(1, "Deve ter Pelo menos uma tag")
    .max(3, "Apenas 3 tags por projeto"),
})
