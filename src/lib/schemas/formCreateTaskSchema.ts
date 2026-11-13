import { z } from "zod"

export const formCreateTaskSchema = z.object({
  taskName: z
    .string()
    .min(2, "Nome muito curto")
    .max(30, "Nome muito grande")
    .regex(/\S/, "Não deve estar vazio")
    .transform((name) =>
      name
        ?.split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    ),
})
