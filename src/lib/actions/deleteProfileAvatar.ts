"use server"

import { revalidatePath } from "next/cache"
import { auth } from "../auth/server"
import { deleteAvatar } from "../storage/deleteAvatar"
import { getUser } from "./getUser"

export async function deleteProfileAvatar() {
  const user = await getUser()

  if (!user) return

  // tratar erro
  await auth.updateUser({ image: "" })

  if (user.image) {
    await deleteAvatar(user.id, user.image)
  }

  revalidatePath("/", "layout")
}
