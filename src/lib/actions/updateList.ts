"use server"

import { neon } from "@neondatabase/serverless"
import type { FormEditListType } from "@/types/FormEditListType"
import type { ListType } from "@/types/ListType"
import { getUser } from "./getUser"

export async function updateList(formData: FormEditListType, list: ListType) {
  const dataBaseUrl = process.env.DATABASE_URL

  try {
    if (!dataBaseUrl) {
      throw new Error("DATABASE_URL não está definida")
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: "Erro ao tentar conectar o banco de dados",
    }
  }

  const result = await getUser()

  if (result.error) {
    return result
  }

  const userId = result?.user?.id
  if (!userId) {
    return {
      error: true,
      message: "Usuario não encontrado",
    }
  }

  const sql = neon(dataBaseUrl)

  try {
    console.log(list.title)
    if (formData.editListName && formData.editListName !== list.title) {
      await sql`
        UPDATE lists
        SET title = ${formData.editListName}
        WHERE id = ${list.id} AND user_id = ${userId}
      `
    }

    if (
      formData.editListPriority &&
      formData.editListPriority !== list.priority
    ) {
      await sql`
        UPDATE lists
        SET priority = ${formData.editListPriority}
        WHERE id = ${list.id} AND user_id = ${userId}
      `
    }
  } catch (error) {
    console.log(error)

    return { error: true, message: "Erro ao tentar atualizar a lista" }
  }

  return { error: false, message: "Lista atualizada com sucesso" }
}
