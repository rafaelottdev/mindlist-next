import type { z } from "zod"
import type { formCreateTaskSchema } from "@/lib/schemas/formCreateTaskSchema"

export type formCreateTaskType = z.infer<typeof formCreateTaskSchema>
