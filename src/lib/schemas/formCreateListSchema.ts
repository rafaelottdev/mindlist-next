import { z } from "zod"

export const formCreateListSchema = z.object({
  listName: z
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

  listPriority: z.enum(["low", "medium", "high"], "Valor Invalido"),
})
