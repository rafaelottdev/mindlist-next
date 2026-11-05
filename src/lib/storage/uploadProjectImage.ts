import { PutObjectCommand } from "@aws-sdk/client-s3"
import { s3 } from "@/lib/storage/s3Client"
import { getCoverKey } from "./getCoverKey"

const maxSize = 5 * 1024 * 1024
const allowed = ["image/jpeg", "image/png", "image/webp"]

export async function uploadProjectImage(userId: string, file: File) {
  if (!allowed.includes(file.type)) throw new Error("Tipo Invalido")
  if (file.size > maxSize) throw new Error("Arquivo Muito Grande")

  const buffer = Buffer.from(await file.arrayBuffer())
  const key = getCoverKey(userId, buffer, file.type)

  await s3.send(
    new PutObjectCommand({
      Bucket: "project-background",
      Key: key,
      Body: buffer,
      ContentType: file.type,
    }),
  )

  return `${process.env.AWS_ENDPOINT_URL_S3}/project-background/${key}`
}
