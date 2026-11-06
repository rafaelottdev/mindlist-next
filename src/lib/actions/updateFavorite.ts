"use server"

import { neon } from "@neondatabase/serverless"

export async function updateFavorite(
  favorite: boolean,
  projectId: number,
  userId: string,
) {
  const dataBaseUrl = process.env.DATABASE_URL

  try {
    if (!dataBaseUrl) {
      throw new Error("DATABASE_URL não está definida")
    }
  } catch (error) {
    console.log(error)
    return { error: true, message: "Erro ao tentar conectar o banco" }
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
