"use server"

import { redirect } from "next/navigation"
import { auth } from "../auth/server"

export async function signOut() {
  const { error } = await auth.signOut()

  if (error) {
    return { error: true, message: "Erro ao sair da conta" }
  }

  redirect("/account")
}
