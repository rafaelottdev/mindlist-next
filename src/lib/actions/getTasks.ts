"use server"

import { neon } from "@neondatabase/serverless"
import type { taskType } from "@/types/taskType"
import { getUser } from "./getUser"

export async function getTasks(listId: number): Promise<{
  error: boolean
  message: string
  response: taskType[] | null
}> {
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
      response: null,
    }
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
    const response = (await sql`
      SELECT * FROM tasks

      WHERE user_id = ${userId} AND list_id = ${listId}
      ORDER BY position ASC, created_at ASC, id
    `) as taskType[]

    return {
      error: false,
      message: "Sucesso ao pegar as tarefas da lista",
      response,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: "Erro ao tentar buscar tarefas da lista",
      response: null,
    }
  }
}
