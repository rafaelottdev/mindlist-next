"use server"

import { revalidatePath } from "next/cache"
import { auth } from "../auth/server"
import { uploadAvatar } from "../storage/uploadAvatar"
import { getUser } from "./getUser"

export async function updateUser(formData: FormData) {
  const user = await getUser()
  if (!user) return

  const newUser = {
    newImage: user.image,
    newName: user.name,
    error: null as string | null,
  }

  const file = formData.get("profileImage")
  const rawName = formData.get("profileName")
  const name = typeof rawName === "string" ? rawName.trim() : ""
  const currentPassword = String(formData.get("currentPassword") ?? "")
  const newPassword = String(formData.get("newPassword") ?? "")

  if (file instanceof File && file.size > 0) {
    const url = await uploadAvatar(user.id, file)
    const { error } = await auth.updateUser({ image: url })

    if (error) {
      // fazer uma notificação avisando que deu erro ao tentar atualizar o usuario
      console.log(error)
    } else {
      newUser.newImage = url
    }
  }

  if (name && name !== user.name) {
    const { error } = await auth.updateUser({ name })

    if (error) {
      // fazer uma notificação avisando que deu erro ao tentar atualizar o usuario
      console.log(error)
    } else {
      newUser.newName = name
    }
  }

  if (currentPassword && newPassword) {
    if (currentPassword === newPassword) {
      newUser.error = "A nova senha precisa ser diferente da atual"
    } else {
      const { error } = await auth.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      })

      if (error) {
        newUser.error = "Senha atual incorreta ou erro ao alterar a senha"
      }
    }
  }

  revalidatePath("/", "layout")

  return newUser
}
