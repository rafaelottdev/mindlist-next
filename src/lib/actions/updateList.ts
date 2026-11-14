"use server"

import { neon } from "@neondatabase/serverless"
import type { FormEditListType } from "@/types/FormEditListType"
import type { ListType } from "@/types/ListType"
import { getUser } from "./getUser"

export async function updateList(formData: FormEditListType, list: ListType) {
  const dataBaseUrl = process.env.DATABASE_URL

  if (!dataBaseUrl) {
    return {
      error: true,
      message: "Erro ao conectar no banco de dados",
    }
  }

  const result = await getUser()

  if (result.error) {
    return {
      error: true,
      message: "Não Autorizado",
    }
  }

  const userId = result?.user?.id

  if (!userId) {
    return {
      error: true,
      message: "Usuario não encontrado",
    }
  }

  const name = formData.editListName
  const priority = formData.editListPriority
  const sql = neon(dataBaseUrl)

  try {
    if (
      (name && name !== list.title) ||
      (priority && priority !== list.priority)
    ) {
      await sql`
        UPDATE lists

        SET
          title = ${name || list.title},
          priority = ${priority || list.priority}

        WHERE id = ${list.id} AND user_id = ${userId}
      `
    }
  } catch (error) {
    console.error(error)

    return { error: true, message: "Erro ao atualizar a lista" }
  }

  return { error: false, message: "Lista atualizada com sucesso" }
}
