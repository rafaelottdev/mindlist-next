import type { z } from "zod"
import type { formCreateListSchema } from "@/lib/schemas/formCreateListSchema"

export type FormCreateListType = z.infer<typeof formCreateListSchema>
