import { createHash } from "node:crypto"

export function getCoverKey(userId: string, buffer: Buffer, mimeType: string) {
  const hash = createHash("sha256").update(buffer).digest("hex")
  const ext = mimeType.split("/")[1]

  return `${userId}/${hash}.${ext}`
}
