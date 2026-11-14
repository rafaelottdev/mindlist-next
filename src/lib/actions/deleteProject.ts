"use server"

import { neon } from "@neondatabase/serverless"
import { deleteOldProjectCover } from "../storage/deleteOldProjectCover"
import { getUser } from "./getUser"

export async function deleteProject(
  projectId: number,
  projectCoverUrl: string,
) {
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
      DELETE FROM projects
  
      WHERE id = ${projectId} AND user_id = ${userId}
    `

    if (projectCoverUrl) {
      const [{ count }] = await sql`
        SELECT count(*)::int as count from projects where image_url = ${projectCoverUrl}
      `

      if (count === 0) {
        await deleteOldProjectCover(userId, projectCoverUrl)
      }
    }
  } catch (error) {
    console.error(error)

    return { error: true, message: "Erro ao tentar excluir o projeto" }
  }

  return { error: false, message: "Projeto excluido com sucesso" }
}
