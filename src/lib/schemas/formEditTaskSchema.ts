import { z } from "zod"

export const formEditTaskSchema = z.object({
  editTaskName: z
    .string()
    .refine((name) => !name || name.length >= 2, "Nome muito curto")
    .refine((name) => !name || name.length <= 30, "Nome muito grande")
    .refine((name) => !name || /\S/.test(name), "Não deve estar vazio")
    .transform((name) =>
      name
        ?.split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    )
    .optional(),
})
