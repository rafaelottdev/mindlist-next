"use client"

import { createContext, useContext, useState } from "react"
import { FaExclamation } from "react-icons/fa6"
import styles from "./NotificationAlert.module.sass"

type NotificationAlertValue = {
  notify: (msg: string) => void
}

const NotificationAlertContext = createContext<NotificationAlertValue | null>(
  null,
)

export function NotificationAlertProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [message, setMessage] = useState<string | null>(null)

  function notify(msg: string) {
    setMessage(msg)

    setTimeout(() => setMessage(null), 1500)
  }

  return (
    <NotificationAlertContext.Provider value={{ notify }}>
      {message && (
        <div className={styles["notification-alert"]}>
          <div>
            <FaExclamation className={styles["notification-alert__icon"]} />
          </div>

          <p className={styles["notification-alert__message"]}>{message}</p>
        </div>
      )}
      {children}
    </NotificationAlertContext.Provider>
  )
}

export function useNotify() {
  const ctx = useContext(NotificationAlertContext)

  if (!ctx) {
    throw new Error(
      "useNotify deve ser usado dentro de NotificationAlertProvider",
    )
  }

  return ctx
}
