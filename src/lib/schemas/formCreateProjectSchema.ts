import { z } from "zod"

const getImageDimensions = (
  file: File,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
      URL.revokeObjectURL(img.src)
    }
    img.onerror = () => {
      resolve({ width: 0, height: 0 })
      URL.revokeObjectURL(img.src)
    }
  })
}

export const formCreateProjectSchema = z.object({
  projectName: z
    .string()
    .min(2, "Nome muito curto")
    .max(30, "Nome muito grande")
    .regex(/\S/, "Não deve estar vazio"),

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
    }, "Formato da imagem invalido")
    .refine(
      async (files) => {
        const file = files?.item(0)
        if (file) {
          const { width, height } = await getImageDimensions(file)
          return width >= 1200 && height >= 600
        }

        return true
      },
      {
        message: "A imagem deve ser maior",
      },
    ),

  projectPriority: z
    .string("Escolha uma prioridade")
    .regex(/\S/, "Escolha uma prioridade"),

  projectTags: z
    .array(
      z.object({
        id: z.number().min(1, "O ID não pode ser 0 ou menor"),
        name: z.string().regex(/\S/, "A tag não deve estar vazia"),
      }),
    )
    .min(1, "Deve ter Pelo menos uma tag")
    .max(3, "Apenas 3 tags por projeto"),
})
