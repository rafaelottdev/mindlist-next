"use server"

import { revalidatePath } from "next/cache"
import { auth } from "../auth/server"
import { uploadAvatar } from "../storage/uploadAvatar"
import { getUser } from "./getUser"

export async function updateUser(formData: FormData) {
  const result = await getUser()

  if (result.error) {
    return {
      error: true,
      message: "Erro ao buscar o usuario",
      newUserInfo: null,
    }
  }

  const user = result.user
  if (!user) return

  const newUserInfo = {
    newImage: user.image,
    newName: user.name,
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
      return {
        error: true,
        message: "Erro ao tentar atualizar a imagem de perfil",
        newUserInfo: null,
      }
    }

    newUserInfo.newImage = url
  }

  if (name && name !== user.name) {
    const { error } = await auth.updateUser({ name })

    if (error) {
      return {
        error: true,
        message: "Erro ao tentar atualizar o nome",
        newUserInfo: null,
      }
    }

    newUserInfo.newName = name
  }

  if (currentPassword && newPassword) {
    if (currentPassword === newPassword) {
      return {
        error: true,
        message: "A nova senha precisa ser diferente da atual",
        newUserInfo: null,
      }
    } else {
      const { error } = await auth.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      })

      if (error) {
        return {
          error: true,
          message: "Erro ao tentar alterar a senha",
          newUserInfo: null,
        }
      }

      return {
        error: false,
        message: "Senha alterada com sucesso",
        newUserInfo: newUserInfo,
        changePassword: true,
      }
    }
  }

  revalidatePath("/", "layout")

  return { error: false, message: null, newUserInfo: newUserInfo }
}
