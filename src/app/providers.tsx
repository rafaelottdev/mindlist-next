"use client"

import { NotificationAlertProvider } from "@/contexts/NotificationAlert/NotificationAlert"

export function Providers({ children }: { children: React.ReactNode }) {
  return <NotificationAlertProvider>{children}</NotificationAlertProvider>
}
