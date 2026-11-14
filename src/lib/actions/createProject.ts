"use server"

import { neon } from "@neondatabase/serverless"
import { uploadProjectImage } from "../storage/uploadProjectImage"
import { getProjects } from "./getProjects"
import { getUser } from "./getUser"

export async function createProject(formData: FormData) {
  const dataBaseUrl = process.env.DATABASE_URL
  let url = ""

  if (!dataBaseUrl) {
    return {
      error: true,
      message: "Erro ao conectar no banco de dados",
      projectId: null,
    }
  }

  const result = await getUser()

  if (result.error) {
    return {
      error: true,
      message: "Não Autorizado",
      projectId: null,
    }
  }

  const userId = result?.user?.id

  if (!userId) {
    return {
      error: true,
      message: "Usuario não encontrado",
      projectId: null,
    }
  }

  const name = formData.get("name")
  const date = formData.get("date")
  const imageFile = formData.get("imageFile")
  const priority = formData.get("priority")
  const tagList = formData.getAll("tagList")

  const projectList = await getProjects()

  if (projectList.error) {
    return {
      error: true,
      message: "Não foi possivel criar o projeto",
      projectId: null,
    }
  }

  if (projectList.response && projectList.response.length >= 2) {
    return {
      error: true,
      message: "Apenas dois projetos são permitidos",
      projectId: null,
    }
  }

  if (imageFile instanceof File && imageFile.size > 0) {
    url = await uploadProjectImage(userId, imageFile)
  }

  const sql = neon(dataBaseUrl)

  try {
    const [result] = await sql`
      INSERT INTO projects (user_id, status, image_url, name, deadline, priority, tags, favorite)
      VALUES (${userId}, 'pending', ${url}, ${name}, ${date}, ${priority}, ${tagList}, false)
      RETURNING id
    `
    const projectId = result.id

    return { error: false, message: "Projeto criado com sucesso", projectId }
  } catch (error) {
    console.error(error)
    return {
      error: true,
      message: "Não foi possivel criar o projeto",
      projectId: null,
    }
  }
}
