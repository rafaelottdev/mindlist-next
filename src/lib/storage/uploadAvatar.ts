import { randomUUID } from "node:crypto"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

const s3 = new S3Client({
  region: "us-east-2",
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  forcePathStyle: true,
})

const maxSize = 5 * 1024 * 1024
const allowed = ["image/jpeg", "image/png", "image/webp"]

export async function uploadAvatar(userId: string, file: File) {
  if (!allowed.includes(file.type)) throw new Error("Tipo Invalido")
  if (file.size > maxSize) throw new Error("Arquivo Muito Grande")

  const key = `${userId}/${randomUUID()}.${file.type.split("/")[1]}`

  await s3.send(
    new PutObjectCommand({
      Bucket: "avatars",
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    }),
  )

  return `${process.env.AWS_ENDPOINT_URL_S3}/avatars/${key}`
}
