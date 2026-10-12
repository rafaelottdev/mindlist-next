import { createNeonAuth } from "@neondatabase/auth/next/server"

const baseUrl = process.env.NEON_AUTH_BASE_URL
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET

if (!baseUrl) {
  throw new Error("NEON_AUTH_BASE_URL não está definida")
}

if (!cookieSecret) {
  throw new Error("NEON_AUTH_COOKIE_SECRET não está definida")
}

export const auth = createNeonAuth({
  baseUrl,
  cookies: {
    secret: cookieSecret,
  },
})
