"use server"

import type { FormLoginType } from "@/types/FormLoginType"
import { auth } from "../auth/server"

export async function validateAccount(authData: FormLoginType) {
  const { error } = await auth.signIn.email({
    email: authData.email,
    password: authData.password,
  })

  if (error) {
    return { error: true, message: "Email ou senha invalidos" }
  }

  return { error: false, message: "Login feito com sucesso" }
}
