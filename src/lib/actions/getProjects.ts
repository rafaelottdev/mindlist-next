"use server"

import { neon } from "@neondatabase/serverless"

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

  const sql = neon(dataBaseUrl)

  try {
    const response = await sql`SELECT * FROM projects`

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
