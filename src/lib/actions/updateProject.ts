"use server"

import { neon } from "@neondatabase/serverless"
import type { ProjectListType } from "@/types/ProjectListType"
import { deleteOldProjectCover } from "../storage/deleteOldProjectCover"
import { uploadProjectImage } from "../storage/uploadProjectImage"
import { getUser } from "./getUser"

export async function updateProject(
  formData: FormData,
  project: ProjectListType | Record<string, any>,
) {
  const dataBaseUrl = process.env.DATABASE_URL
  const formattedDeadline = new Intl.DateTimeFormat("fr-CA").format(
    project.deadline,
  )
  let newUrl = ""
  const oldUrl = project.image_url

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

  const userId = result?.user?.id
  if (!userId)
    return {
      error: true,
      message: "Usuario não encontrado, impossivel criar projeto",
    }

  const newName = formData.get("newName")
  const newDeadline = formData.get("newDeadline")
  const newImageFile = formData.get("newImageFile")
  const newPriority = formData.get("newPriority")
  const newTagList = formData.getAll("newTagList")

  const sql = neon(dataBaseUrl)

  try {
    if (newName && newName !== project.name) {
      await sql`
        UPDATE projects
        SET name = ${newName}
  
        WHERE id = ${project.id} AND user_id = ${userId}
      `
    }

    if (newDeadline && newDeadline !== formattedDeadline) {
      await sql`
        UPDATE projects
        SET deadline = ${newDeadline}
  
        WHERE id = ${project.id} AND user_id = ${userId}
      `
    }

    if (newImageFile instanceof File && newImageFile.size > 0) {
      newUrl = await uploadProjectImage(userId, newImageFile)

      if (newUrl && newUrl !== project.image_url) {
        await sql`
          UPDATE projects
          SET image_url = ${newUrl}
  
          WHERE id = ${project.id} AND user_id = ${userId}
        `

        if (oldUrl) {
          const [{ count }] = await sql`
            SELECT count(*)::int as count from projects where image_url = ${oldUrl}
          `

          if (count === 0) await deleteOldProjectCover(userId, oldUrl)
        }
      }
    }

    if (newPriority && newPriority !== project.priority) {
      await sql`
        UPDATE projects
        SET priority = ${newPriority}
  
        WHERE id = ${project.id} AND user_id = ${userId}
      `
    }

    if (newTagList) {
      const verifyList: boolean[] = []

      newTagList.map((item) => {
        if (project.tags.includes(item)) {
          verifyList.push(true)
        } else {
          verifyList.push(false)
        }

        return null
      })

      if (
        verifyList.includes(false) ||
        verifyList.length < project.tags.length
      ) {
        await sql`
          UPDATE projects
          SET tags = ${newTagList}
  
          WHERE id = ${project.id} AND user_id = ${userId}
        `
      }
    }
  } catch (error) {
    console.log(error)
    return { error: true, message: "Erro ao tentar atualizar o projeto" }
  }

  return { error: false, message: "Projeto atualizado com sucesso" }
}
