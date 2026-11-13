"use server"

import { neon } from "@neondatabase/serverless"
import { getUser } from "./getUser"

export async function updateTaskStatus(
  completed: boolean,
  taskId: number,
  listId: number,
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
    if (completed) {
      console.log(userId)
      await sql`
        UPDATE tasks
        SET status = 'pending'
  
        WHERE id = ${taskId} AND list_id = ${listId} AND user_id = ${userId}
      `
    } else {
      await sql`
        UPDATE tasks
        SET status = 'completed'
  
        WHERE id = ${taskId} AND list_id = ${listId} AND user_id = ${userId}
      `
    }
  } catch (error) {
    console.log(error)
    return { error: true, message: "Erro ao tentar alterar o projeto" }
  }

  return { error: false, message: "" }
}
