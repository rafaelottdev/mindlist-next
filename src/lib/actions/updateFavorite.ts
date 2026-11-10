"use server"

import { neon } from "@neondatabase/serverless"
import { getUser } from "./getUser"

export async function updateFavorite(favorite: boolean, projectId: number) {
  const dataBaseUrl = process.env.DATABASE_URL

  try {
    if (!dataBaseUrl) {
      throw new Error("DATABASE_URL não está definida")
    }
  } catch (error) {
    console.log(error)
    return { error: true, message: "Erro ao tentar conectar o banco" }
  }

  const result = await getUser()

  if (result.error) {
    return {
      error: true,
      message: "Não autorizado",
      response: null,
    }
  }

  const userId = result?.user?.id
  if (!userId) {
    return {
      error: true,
      message: "Usuario não encontrado",
      response: null,
    }
  }

  const sql = neon(dataBaseUrl)

  try {
    if (favorite) {
      await sql`
        UPDATE projects
        SET favorite = false
  
        WHERE id = ${projectId} AND user_id = ${userId}
      `

      return { error: false, message: "Removido dos Favoritos" }
    } else {
      await sql`
        UPDATE projects
        SET favorite = true
  
        WHERE id = ${projectId} AND user_id = ${userId}
      `

      return { error: false, message: "Adicionado aos Favoritos" }
    }
  } catch (error) {
    console.log(error)
    return { error: true, message: "Erro ao tentar favoritar o projeto" }
  }
}
