import type { z } from "zod"
import type { formEditListSchema } from "@/lib/schemas/formEditListSchema"

export type FormEditListType = z.infer<typeof formEditListSchema>
