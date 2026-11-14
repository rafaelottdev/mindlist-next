"use server"

import { revalidatePath } from "next/cache"
import { auth } from "../auth/server"
import { deleteAvatar } from "../storage/deleteAvatar"
import { getUser } from "./getUser"

export async function deleteProfileAvatar() {
  const result = await getUser()

  if (result.error) {
    return { error: true, message: "Não Autorizado" }
  }

  const user = result.user

  if (!user) {
    return { error: true, message: "Usuario não encontrado" }
  }

  if (user.image) {
    const { error } = await auth.updateUser({ image: "" })

    if (error) {
      return {
        error: true,
        message: "Erro ao tentar apagar a imagem de perfil",
      }
    }

    await deleteAvatar(user.id, user.image)
  }

  revalidatePath("/", "layout")
  return { error: false, message: null }
}
