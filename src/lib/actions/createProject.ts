"use server"

import { neon } from "@neondatabase/serverless"
import { uploadProjectImage } from "../storage/uploadProjectImage"
import { getUser } from "./getUser"

export async function createProject(formData: FormData) {
  const dataBaseUrl = process.env.DATABASE_URL
  let url = "indefinida"

  if (!dataBaseUrl) {
    throw new Error("DATABASE_URL não está definida")
  }

  const result = await getUser()

  if (result.error) {
    return result
  }

  const userId = result?.user?.id
  if (!userId) return

  const name = formData.get("name")
  const date = formData.get("date")
  const imageFile = formData.get("imageFile")
  const priority = formData.get("priority")
  const tagList = formData.getAll("tagList")

  if (imageFile instanceof File && imageFile.size > 0) {
    url = await uploadProjectImage(userId, imageFile)
  }

  console.log(url)
  const sql = neon(dataBaseUrl)
  const _response = await sql`
    INSERT INTO projects (user_id, status, image_url, name, deadline, priority, tags, position)
    VALUES (${userId}, 'pendente', ${url}, ${name}, ${date}, ${priority}, ${tagList}, 1)
  `
}
