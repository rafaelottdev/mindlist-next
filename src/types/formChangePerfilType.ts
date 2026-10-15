import type { z } from "zod"
import type { formChangePerfilSchema } from "@/lib/schemas/formChangePerfilSchema"

export type formChangePerfilType = z.infer<typeof formChangePerfilSchema>
