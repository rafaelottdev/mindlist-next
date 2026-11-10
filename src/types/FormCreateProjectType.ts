import type { z } from "zod"
import type { formCreateProjectSchema } from "@/lib/schemas/formCreateProjectSchema"

export type FormCreateProjectType = z.infer<typeof formCreateProjectSchema>
