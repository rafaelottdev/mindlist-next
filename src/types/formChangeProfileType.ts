import type { z } from "zod"
import type { formChangeProfileSchema } from "@/lib/schemas/formChangeProfileSchema"

export type formChangeProfileType = z.infer<typeof formChangeProfileSchema>
