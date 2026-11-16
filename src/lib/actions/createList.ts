"use server"

import { neon } from "@neondatabase/serverless"
import type { FormCreateListType } from "@/types/FormCreateListType"
import type { ListType } from "@/types/ListType"
import type { ProjectListType } from "@/types/ProjectListType"
import { getLists } from "./getLists"
import { getUser } from "./getUser"

export async function createList(
  formData: FormCreateListType,
  projectData: ProjectListType,
) {
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

  const lists = await getLists(projectData.id)

  if (lists.error) {
    return {
      error: true,
      message: "Não foi possivel criar a lista",
      response: null,
    }
  }

  if (lists.response && lists.response.length >= 5) {
    return {
      error: true,
      message: "Apenas 5 listas são permitidas",
      response: null,
    }
  }

  const sql = neon(dataBaseUrl)

  try {
    const response = (await sql`
      INSERT INTO lists (project_id, user_id, title, status, priority)
      VALUES (${projectData.id}, ${userId}, ${formData.listName}, 'pending', ${formData.listPriority})

      RETURNING *
    `) as ListType[]

    return { error: false, message: "Lista criada com sucesso", response }
  } catch (error) {
    console.error(error)

    return {
      error: true,
      message: "Não foi possivel criar a lista",
      response: null,
    }
  }
}
