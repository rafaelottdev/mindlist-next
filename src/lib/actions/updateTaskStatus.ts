"use server"

import { neon } from "@neondatabase/serverless"
import { getUser } from "./getUser"

export async function updateTaskStatus(
  completed: boolean,
  taskId: number,
  listId: number,
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
      UPDATE tasks
      SET status = ${completed ? "pending" : "completed"}

      WHERE id = ${taskId} AND list_id = ${listId} AND user_id = ${userId}
    `

    return {
      error: false,
      message: completed ? "Tarefa Pendente" : "Tarefa Concluida",
    }
  } catch (error) {
    console.log(error)

    return { error: true, message: "Erro ao alterar a tarefa" }
  }
}
