import { createContext, useCallback, useContext, useRef, useState } from "react"
import { BsQuestionLg } from "react-icons/bs"
import styles from "./ConfirmAlert.module.sass"

type ConfirmAlertValue = {
  confirm: (msg: string | null) => Promise<boolean>
}

const ConfirmAlertContext = createContext<ConfirmAlertValue | null>(null)

export function ConfirmAlertProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [message, setMessage] = useState<string | null>(null)
  const resolveRef = useRef<((value: boolean) => void) | null>(null)

  const confirm = useCallback((msg: string | null) => {
    setMessage(msg)

    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve
    })
  }, [])

  const handleChoice = (choice: boolean) => {
    if (resolveRef.current) resolveRef.current(choice)
    setMessage(null)
    resolveRef.current = null
  }

  return (
    <ConfirmAlertContext.Provider value={{ confirm }}>
      {message && (
        <div className={styles["confirm-alert"]}>
          <div className={styles["confirm-alert__message-container"]}>
            <div>
              <BsQuestionLg className={styles["confirm-alert__icon"]} />
            </div>

            <p className={styles["confirm-alert__message"]}>{message}</p>
          </div>

          <div className={styles["confirm-alert__button-container"]}>
            <button type="button" onClick={() => handleChoice(true)}>
              Sim
            </button>

            <button type="button" onClick={() => handleChoice(false)}>
              Não
            </button>
          </div>
        </div>
      )}

      {children}
    </ConfirmAlertContext.Provider>
  )
}

export function useConfirm() {
  const ctx = useContext(ConfirmAlertContext)

  if (!ctx) {
    throw new Error("useConfirm deve ser usado dentro de ConfirmAlertProvider")
  }

  return ctx
}
