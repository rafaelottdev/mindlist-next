"use server"

import { neon } from "@neondatabase/serverless"
import { getUser } from "./getUser"

export async function updateListStatus(
  completed: boolean,
  listId: number,
  projectId: number,
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
    await sql`
      UPDATE lists
      SET status = ${completed ? "completed" : "pending"}

      WHERE id = ${listId} AND project_id = ${projectId} AND user_id = ${userId}
    `

    return {
      error: false,
      message: completed ? "Tarefa Pendente" : "Tarefa Concluida",
    }
  } catch (error) {
    console.log(error)

    return { error: true, message: "Erro ao alterar a lista" }
  }
}
