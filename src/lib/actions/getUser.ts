"use server"

import { auth } from "../auth/server"

export async function getUser() {
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
