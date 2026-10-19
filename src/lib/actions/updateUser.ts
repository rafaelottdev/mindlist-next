"use server"

import { revalidatePath } from "next/cache"
import { auth } from "../auth/server"
import { uploadAvatar } from "../storage/uploadAvatar"
import { getUser } from "./getUser"

export async function updateUser(formData: FormData) {
  const user = await getUser()

  if (!user) return

  const newUser = {
    newName: user.name,
    newImage: user.image,
  }

  const rawName = formData.get("profileName")
  const name = typeof rawName === "string" ? rawName.trim() : ""
  const file = formData.get("profileImage")

  if (name && name !== user.name) {
    const { error } = await auth.updateUser({ name })

    if (error) {
      // fazer uma notificação avisando que deu erro ao tentar atualizar o usuario
      newUser.newName = user.name
    }

    newUser.newName = name
  }

  if (file instanceof File && file.size > 0) {
    const url = await uploadAvatar(user.id, file)
    const { error } = await auth.updateUser({ image: url })

    if (error) {
      // fazer uma notificação avisando que deu erro ao tentar atualizar o usuario
      newUser.newImage = user.image
    }

    newUser.newImage = url
  }

  revalidatePath("/", "layout")

  return newUser
}
