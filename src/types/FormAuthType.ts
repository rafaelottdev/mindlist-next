import type { z } from "zod"
import type { formAuthSchema } from "@/lib/schemas/formAuthSchema"

export type FormAuthType = z.infer<typeof formAuthSchema>
