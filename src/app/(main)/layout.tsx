import Header from "@/components/Header/Header"

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />

      <main>{children}</main>
    </>
  )
}
