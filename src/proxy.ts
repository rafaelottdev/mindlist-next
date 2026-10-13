import { auth } from "@/lib/auth/server"

export default auth.middleware({
  loginUrl: "/account",
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|[^?]*\\.[^?]+$).*)"],
}
