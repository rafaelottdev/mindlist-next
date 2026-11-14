"use server"

import { neon } from "@neondatabase/serverless"
import type { formCreateTaskType } from "@/types/FormCreateTaskType"
import { getUser } from "./getUser"

export async function createTask(formData: formCreateTaskType, listId: number) {
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
      INSERT INTO tasks (list_id, user_id, title, status)
      VALUES  (${listId}, ${userId}, ${formData.taskName}, 'pending') 
    `
  } catch (error) {
    console.error(error)
    return { error: true, message: "Não foi possivel criar a tarefa" }
  }

  return { error: false, message: "Tarefa criada com sucesso" }
}
