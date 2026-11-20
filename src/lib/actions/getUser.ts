"use server"

import { connection } from "next/server"
import { auth } from "../auth/server"

export async function getUser() {
  await connection()
  const { data, error } = await auth.getSession()

  if (error) {
    return {
      error: true,
      message: "Erro ao buscar o usuario",
      user: null,
    }
  }

  return { error: false, message: null, user: data?.user }
}
