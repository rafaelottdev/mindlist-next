import type { z } from "zod"
import type { formEditProjectSchema } from "@/lib/schemas/formEditProjectSchema"

export type FormEditProjectType = z.infer<typeof formEditProjectSchema>
