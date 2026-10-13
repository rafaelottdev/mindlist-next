"use server"

import type { FormRegisterType } from "@/types/FormRegisterType"
import { auth } from "../auth/server"

export async function createAccount(authData: FormRegisterType) {
  const { error } = await auth.signUp.email({
    name: authData.name,
    email: authData.email,
    password: authData.password,
  })

  if (error) {
    return { error: true, message: "Algo deu errado na criação da conta" }
  }

  return { error: false, message: "Conta criada com sucesso" }
}
