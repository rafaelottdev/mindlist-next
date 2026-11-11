import { z } from "zod"

export const formEditListSchema = z.object({
  editListName: z
    .string()
    .refine((name) => !name || name.length >= 2, "Nome muito curto")
    .refine((name) => !name || name.length <= 15, "Nome muito grande")
    .refine((name) => !name || /\S/.test(name), "Não deve estar vazio")
    .transform((name) =>
      name
        ?.split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    )
    .optional(),

  editListPriority: z
    .enum(["low", "medium", "high"], "Valor Invalido")
    .nullish(),
})
