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

  const rawName = formData.get("perfilName")
  const name = typeof rawName === "string" ? rawName.trim() : ""
  const file = formData.get("perfilImage")

  if (name && name !== user.name) {
    await auth.updateUser({ name })
    newUser.newName = name
  }

  if (file instanceof File && file.size > 0) {
    const url = await uploadAvatar(user.id, file)
    await auth.updateUser({ image: url })
    newUser.newImage = url
  }

  revalidatePath("/", "layout")

  return newUser
}
