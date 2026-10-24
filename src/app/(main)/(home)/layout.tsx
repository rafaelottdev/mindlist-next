import Home from "@/components/Home/Home"

export default function HomeLayout({ children }: LayoutProps<"/">) {
  return <Home>{children}</Home>
}
