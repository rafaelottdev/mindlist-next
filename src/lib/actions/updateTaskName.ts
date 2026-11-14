"use server"

import { neon } from "@neondatabase/serverless"
import type { taskType } from "@/types/taskType"
import { getUser } from "./getUser"

export async function updateTaskName(
  task: taskType,
  listId: number,
  newTaskName: string,
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
    if (newTaskName && newTaskName !== task.title) {
      await sql`
        UPDATE tasks
        SET title = ${newTaskName}

        WHERE id = ${task.id} AND list_id = ${listId} AND user_id = ${userId}
      `
    }
  } catch (error) {
    console.error(error)

    return { error: true, message: "Erro ao tentar atualizar o nome da tarefa" }
  }

  return { error: false, message: "Nome da tarefa atualizado com sucesso" }
}
