"use server"

import { auth } from "../auth/server"

export async function getUser() {
  const { data } = await auth.getSession()

  return data?.user
}
