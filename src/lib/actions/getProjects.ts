"use server"

import { neon } from "@neondatabase/serverless"
import { getUser } from "./getUser"

export async function getProjects() {
  const dataBaseUrl = process.env.DATABASE_URL

  try {
    if (!dataBaseUrl) {
      throw new Error("DATABASE_URL não está definida")
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: "Erro ao tentar se conectar ao banco de dados",
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
      message: "Usuario não encontrado, impossivel criar projeto",
      response: null
    }

  const sql = neon(dataBaseUrl)

  try {
    const response = await sql`
      SELECT * FROM projects

      WHERE user_id = ${userId}
      ORDER BY position ASC, created_at ASC, id
    `

    return {
      error: false,
      message: "Projetos pegos com sucesso",
      response,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: "Erro ao tentar buscar projetos",
      response: null,
    }
  }
}
