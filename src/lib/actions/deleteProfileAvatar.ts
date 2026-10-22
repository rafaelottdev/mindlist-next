"use server"

import { revalidatePath } from "next/cache"
import { auth } from "../auth/server"
import { deleteAvatar } from "../storage/deleteAvatar"
import { getUser } from "./getUser"

export async function deleteProfileAvatar() {
  const result = await getUser()

  if (result.error) {
    return { error: true, message: "Erro ao buscar o usuario" }
  }

  const user = result.user
  if (!user) return

  if (user.image) {
    const { error } = await auth.updateUser({ image: "" })
    await deleteAvatar(user.id, user.image)

    if (error) {
      return {
        error: true,
        message: "Erro ao tentar apagar a imagem de perfil",
      }
    }
  }

  revalidatePath("/", "layout")
  return { error: false, message: null }
}
