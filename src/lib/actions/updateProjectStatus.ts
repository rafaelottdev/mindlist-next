"use server"

import { neon } from "@neondatabase/serverless"
import { getUser } from "./getUser"

export async function updateProjectStatus(
  completed: boolean,
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
      UPDATE projects
      SET status = ${completed ? "completed" : "pending"}

      WHERE id = ${projectId} AND user_id = ${userId}
    `

    return {
      error: false,
      message: completed ? "Projeto Pendente" : "Projeto Concluido",
    }
  } catch (error) {
    console.error(error)

    return { error: true, message: "Erro ao alterar o projeto" }
  }
}
