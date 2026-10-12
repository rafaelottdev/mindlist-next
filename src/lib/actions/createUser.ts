"use server"

import type { FormAuthType } from "@/types/FormAuthType"
import { auth } from "../auth/server"

export async function createUser(authData: FormAuthType) {
  const { error } = await auth.signUp.email({
    name: authData.name,
    email: authData.email,
    password: authData.password,
  })

  if (error) {
    return { error: error.message }
  }

  return "Conta criada com sucesso"
}
