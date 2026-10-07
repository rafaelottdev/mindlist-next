import type { Metadata } from "next"

import "../styles/globals.sass"

export const metadata: Metadata = {
  title: "MindList",
  description: "To Do List",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
