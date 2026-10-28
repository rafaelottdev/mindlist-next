import type { z } from "zod"
import type { formChangeProfileSchema } from "@/lib/schemas/formChangeProfileSchema"

export type FormChangeProfileType = z.infer<typeof formChangeProfileSchema>
