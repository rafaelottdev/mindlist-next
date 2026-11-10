import { neon } from "@neondatabase/serverless"
import type { ListType } from "@/types/ListType"
import { getUser } from "./getUser"

export async function getLists(projectId: number): Promise<{
  error: boolean
  message: string
  response: ListType[] | null
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
      SELECT * FROM lists

      WHERE user_id = ${userId} AND project_id = ${projectId}
      ORDER BY position ASC, created_at ASC, id
    `) as ListType[]

    return {
      error: false,
      message: "Sucesso ao pegar as listas do projeto",
      response,
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: "Erro ao tentar buscar listas do projeto",
      response: null,
    }
  }
}
