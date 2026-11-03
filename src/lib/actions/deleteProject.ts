"use server"

import { neon } from "@neondatabase/serverless"

export async function deleteProject(projectId: number, userId: number) {
  const dataBaseUrl = process.env.DATABASE_URL

  if (!dataBaseUrl) {
    throw new Error("DATABASE_URL não está definida")
  }

  const sql = neon(dataBaseUrl)
  await sql`
    DELETE FROM projects

    WHERE id = ${projectId} AND user_id = ${userId}
  `
}
