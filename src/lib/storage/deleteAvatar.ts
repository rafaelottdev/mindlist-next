import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { s3 } from "./s3Client"

export async function deleteAvatar(userId: string, imageUrl: string) {
  const key = new URL(imageUrl).pathname.replace(/^\/avatars\//, "")

  if (!key.startsWith(`${userId}/`)) return

  await s3.send(new DeleteObjectCommand({ Bucket: "avatars", Key: key }))
}
