import { S3Client } from "@aws-sdk/client-s3"

export const s3 = new S3Client({
  region: "us-east-2",
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  forcePathStyle: true,
})
