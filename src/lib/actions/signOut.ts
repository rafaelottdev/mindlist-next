"use server"

import { redirect } from "next/navigation"
import { auth } from "../auth/server"

export async function signOut() {
  const { error } = await auth.signOut()

  if (error) {
    return "Erro ao sair"
  }

  redirect("/account")
}
