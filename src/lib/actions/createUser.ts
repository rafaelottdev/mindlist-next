"use server"

import type { FormRegisterType } from "@/types/FormRegisterType"
import { auth } from "../auth/server"

export async function createUser(authData: FormRegisterType) {
  const { error } = await auth.signUp.email({
    name: authData.name,
    email: authData.email,
    password: authData.password,
  })

  if (error) {
    return { error: error.message }
  }

  return "Conta criada com sucesso!"
}
