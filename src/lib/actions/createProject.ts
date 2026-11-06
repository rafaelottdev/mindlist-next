"use server"

import { neon } from "@neondatabase/serverless"
import { uploadProjectImage } from "../storage/uploadProjectImage"
import { getProjects } from "./getProjects"
import { getUser } from "./getUser"

export async function createProject(formData: FormData) {
  const dataBaseUrl = process.env.DATABASE_URL
  let url = ""

  try {
    if (!dataBaseUrl) {
      throw new Error("DATABASE_URL não está definida")
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: "Erro ao tentar se conectar ao banco de dados",
    }
  }

  const result = await getUser()

  if (result.error) {
    return result
  }

  const userId = result?.user?.id
  if (!userId)
    return {
      error: true,
      message: "Usuario não encontrado, impossivel criar projeto",
    }

  const name = formData.get("name")
  const date = formData.get("date")
  const imageFile = formData.get("imageFile")
  const priority = formData.get("priority")
  const tagList = formData.getAll("tagList")

  if (imageFile instanceof File && imageFile.size > 0) {
    url = await uploadProjectImage(userId, imageFile)
  }

  const projectList = await getProjects()

  if (projectList.error) {
    return { error: true, message: "Não foi possivel criar o projeto" }
  } else {
    if (projectList.response && projectList.response.length >= 2) {
      return { error: true, message: "Apenas dois projetos são permitidos" }
    }
  }

  const sql = neon(dataBaseUrl)
  try {
    await sql`
      INSERT INTO projects (user_id, status, image_url, name, deadline, priority, tags, favorite)
      VALUES (${userId}, 'pending', ${url}, ${name}, ${date}, ${priority}, ${tagList}, false)
    `
  } catch (error) {
    console.log(error)
    return { error: true, message: "Não foi possivel criar o projeto" }
  }

  return { error: false, message: "Projeto criado com sucesso" }
}
