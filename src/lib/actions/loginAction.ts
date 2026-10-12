"use server"

import type { FormLoginType } from "@/types/FormLoginType"

export async function loginAction(formData: FormLoginType) {
  return formData
}
