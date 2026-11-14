"use server"

import { neon } from "@neondatabase/serverless"
import { getUser } from "./getUser"

export async function deleteTask(taskId: number, listId: number) {
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

  try {
    const sql = neon(dataBaseUrl)

    await sql`
      DELETE FROM tasks
  
      WHERE id = ${taskId} AND list_id = ${listId} AND user_id = ${userId}
    `
  } catch (error) {
    console.error(error)

    return { error: true, message: "Erro ao tentar excluir a tarefa" }
  }

  return { error: false, message: "Tarefa excluida com sucesso" }
}
