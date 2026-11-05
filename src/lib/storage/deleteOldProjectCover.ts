import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { s3 } from "./s3Client"

export async function deleteOldProjectCover(userId: string, oldUrl: string) {
  const key = new URL(oldUrl).pathname.replace(/^\/project-background\//, "")

  if (!key.startsWith(`${userId}/`)) return

  await s3.send(
    new DeleteObjectCommand({ Bucket: "project-background", Key: key }),
  )
}
