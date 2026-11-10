"use server"

import { neon } from "@neondatabase/serverless"
import type { FormCreateListType } from "@/types/FormCreateListType"
import type { ProjectListType } from "@/types/ProjectListType"
import { getLists } from "./getLists"
import { getUser } from "./getUser"

export async function createList(
  formData: FormCreateListType,
  projectData: ProjectListType,
) {
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
    }
  }

  const result = await getUser()

  if (result.error) {
    return result
  }

  const userId = result?.user?.id
  if (!userId) {
    return {
      error: true,
      message: "Usuario não encontrado",
    }
  }

  const lists = await getLists(projectData.id)

  if (lists.error) {
    return { error: true, message: "Não foi possivel criar a lista" }
  } else {
    if (lists.response && lists.response.length >= 5) {
      return { error: true, message: "Apenas 5 listas são permitidas" }
    }
  }

  const sql = neon(dataBaseUrl)

  try {
    await sql`
      INSERT INTO lists (project_id, user_id, title, status, priority)
      VALUES (${projectData.id}, ${userId}, ${formData.listName}, 'pending', ${formData.listPriority})
    `
  } catch (error) {
    console.log(error)
    return { error: true, message: "Não foi possivel criar a lista" }
  }

  return { error: false, message: "Lista criada com sucesso" }
}
