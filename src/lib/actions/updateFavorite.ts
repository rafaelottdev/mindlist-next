"use server"

import { neon } from "@neondatabase/serverless"

export async function updateFavorite(
  favorite: boolean,
  projectId: number,
  userId: string,
) {
  const dataBaseUrl = process.env.DATABASE_URL

  if (!dataBaseUrl) {
    throw new Error("DATABASE_URL não está definida")
  }

  const sql = neon(dataBaseUrl)

  if (favorite) {
    await sql`
      UPDATE projects
      SET favorite = false

      WHERE id = ${projectId} AND user_id = ${userId}
    `
  } else {
    await sql`
      UPDATE projects
      SET favorite = true

      WHERE id = ${projectId} AND user_id = ${userId}
    `
  }
}
