import type { z } from "zod"
import type { formCreateProjectSchema } from "@/lib/schemas/formCreateProjectSchema"

export type formCreateProjectType = z.infer<typeof formCreateProjectSchema>
