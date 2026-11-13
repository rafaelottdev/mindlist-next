import type { z } from "zod"
import type { formEditTaskSchema } from "@/lib/schemas/formEditTaskSchema"

export type FormEditTaskType = z.infer<typeof formEditTaskSchema>
