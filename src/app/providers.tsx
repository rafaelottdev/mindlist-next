"use client"

import { ConfirmAlertProvider } from "@/contexts/ConfirmAlert/ConfirmAlert"
import { NotificationAlertProvider } from "@/contexts/NotificationAlert/NotificationAlert"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NotificationAlertProvider>
      <ConfirmAlertProvider>{children}</ConfirmAlertProvider>
    </NotificationAlertProvider>
  )
}
