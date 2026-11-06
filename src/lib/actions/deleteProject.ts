"use server"

import { neon } from "@neondatabase/serverless"
import { deleteOldProjectCover } from "../storage/deleteOldProjectCover"
import { getUser } from "./getUser"

export async function deleteProject(
  projectId: number,
  projectCoverUrl: string,
) {
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
  if (!userId)
    return {
      error: true,
      message: "Não autorizado",
    }

  try {
    const sql = neon(dataBaseUrl)
    await sql`
      DELETE FROM projects
  
      WHERE id = ${projectId} AND user_id = ${userId}
    `

    if (projectCoverUrl) {
      const [{ count }] = await sql`
        SELECT count(*)::int as count from projects where image_url = ${projectCoverUrl}
      `

      if (count === 0) await deleteOldProjectCover(userId, projectCoverUrl)
    }
  } catch (error) {
    console.log(error)
    return { error: true, message: "Erro ao tentar excluir o projeto" }
  }

  return { error: false, message: "Projeto excluido com sucesso" }
}
