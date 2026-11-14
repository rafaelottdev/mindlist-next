"use server"

import { neon } from "@neondatabase/serverless"
import type { ProjectListType } from "@/types/ProjectListType"
import { deleteOldProjectCover } from "../storage/deleteOldProjectCover"
import { uploadProjectImage } from "../storage/uploadProjectImage"
import { getUser } from "./getUser"

export async function updateProject(
  formData: FormData,
  project: ProjectListType,
) {
  const dataBaseUrl = process.env.DATABASE_URL
  const formattedDeadline = new Intl.DateTimeFormat("fr-CA").format(
    new Date(project.deadline),
  )
  let newUrl = ""
  const oldUrl = project.image_url

  if (!dataBaseUrl) {
    return {
      error: true,
      message: "Erro ao conectar no banco de dados",
    }
  }

  const result = await getUser()

  if (result.error) {
    return {
      error: true,
      message: "Não Autorizado",
    }
  }

  const userId = result?.user?.id

  if (!userId) {
    return {
      error: true,
      message: "Usuario não encontrado",
    }
  }

  const newName = formData.get("newName")
  const newDeadline = formData.get("newDeadline")
  const newImageFile = formData.get("newImageFile")
  const newPriority = formData.get("newPriority")
  const newTagList = formData
    .getAll("newTagList")
    .filter((item): item is string => typeof item === "string")

  const name = typeof newName === "string" && newName ? newName : project.name
  const deadline =
    typeof newDeadline === "string" && newDeadline
      ? newDeadline
      : formattedDeadline
  const priority =
    typeof newPriority === "string" && newPriority
      ? newPriority
      : project.priority

  const tagsChanged =
    newTagList.length > 0 &&
    (newTagList.length !== project.tags.length ||
      newTagList.some((tag) => !project.tags.includes(tag)))

  const tags = tagsChanged ? newTagList : project.tags

  const sql = neon(dataBaseUrl)

  try {
    if (
      name !== project.name ||
      deadline !== formattedDeadline ||
      priority !== project.priority ||
      tagsChanged
    ) {
      await sql`
        UPDATE projects

        SET
          name = ${name},
          deadline = ${deadline},
          priority = ${priority},
          tags = ${tags}

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

          if (count === 0) {
            await deleteOldProjectCover(userId, oldUrl)
          }
        }
      }
    }
  } catch (error) {
    console.error(error)

    return { error: true, message: "Erro ao atualizar o projeto" }
  }

  return { error: false, message: "Projeto atualizado com sucesso" }
}
