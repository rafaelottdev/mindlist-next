import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MindList",
  description: "To Do List",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
