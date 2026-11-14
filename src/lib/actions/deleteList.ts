"use server"

import { neon } from "@neondatabase/serverless"
import { getUser } from "./getUser"

export async function deleteList(listId: number) {
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

  const sql = neon(dataBaseUrl)

  try {
    await sql`
      DELETE FROM lists
  
      WHERE id = ${listId} AND user_id = ${userId}
    `
  } catch (error) {
    console.error(error)

    return { error: true, message: "Erro ao tentar excluir a lista" }
  }

  return { error: false, message: "Lista excluida com sucesso" }
}
