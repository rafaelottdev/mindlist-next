"use server"

import { auth } from "../auth/server"

export async function getUser() {
  const { data, error } = await auth.getSession()

  if (error) {
    // Fazer uma notificação para esse erro e tratar o erro
    return null
  }

  return data?.user
}
