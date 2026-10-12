import type { z } from "zod"
import type { formLoginSchema } from "@/lib/schemas/formLoginSchema"

export type FormLoginType = z.infer<typeof formLoginSchema>
