import type { z } from "zod"
import type { formRegisterSchema } from "@/lib/schemas/formRegisterSchema"

export type FormRegisterType = z.infer<typeof formRegisterSchema>
