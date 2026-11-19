"use server"

import { neon } from "@neondatabase/serverless"
import type { ProjectListType } from "@/types/ProjectListType"
import { getUser } from "./getUser"

export async function getPendingProjects() {
  const dataBaseUrl = process.env.DATABASE_URL

  if (!dataBaseUrl) {
    return {
      error: true,
      message: "Erro ao conectar no banco de dados",
      response: null,
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
    const response = (await sql`
      SELECT * FROM projects

      WHERE user_id = ${userId} AND status = 'pending'
      ORDER BY position ASC, created_at ASC, id
    `) as ProjectListType[]

    return {
      error: false,
      message: "Sucesso ao buscar os projetos",
      response,
    }
  } catch (error) {
    console.error(error)

    return {
      error: true,
      message: "Erro ao buscar os projetos",
      response: null,
    }
  }
}
