import type { Metadata } from "next"

import "../styles/globals.sass"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "MindList",
  description: "To Do List",
  icons: {
    icon: "/img/logo.ico",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
