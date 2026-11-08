"use server"

import { neon } from "@neondatabase/serverless"
import { getUser } from "./getUser"

export async function getProject(projectId: string) {
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
  if (!userId)
    return {
      error: true,
      message: "Usuario não encontrado",
      response: null,
    }

  const sql = neon(dataBaseUrl)

  try {
    const response = await sql`
      SELECT * FROM projects

      WHERE user_id = ${userId} AND id = ${projectId}
    `

    return {
      error: false,
      message: "Projeto pego com sucesso",
      response,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: "Erro ao tentar buscar projeto",
      response: null,
    }
  }
}
