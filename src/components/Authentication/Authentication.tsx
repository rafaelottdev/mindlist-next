"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { FaExclamation } from "react-icons/fa6"
import styles from "./Authentication.module.sass"
import Login from "./Login/Login"
import Register from "./Register/Register"

function Authentication() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [notification, setNotification] = useState<{
    isError: boolean
    message: string
  } | null>()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleAuthMessage(isError: boolean, message: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (message === "") {
      setNotification(null)
      return
    }

    setNotification({ isError, message })

    timeoutRef.current = setTimeout(() => {
      setNotification(null)
    }, 2000)
  }

  return (
    <section className={styles["auth-section"]}>
      {notification && (
        <div
          className={`
            ${styles["auth-section__notification"]}
          `}
        >
          <FaExclamation />

          <p>{notification.message}</p>
        </div>
      )}

      <div className={styles["auth-section__border"]}>
        <div className={styles["auth-section__container"]}>
          <Login
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthMessage={handleAuthMessage}
          />

          <Register
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthMessage={handleAuthMessage}
          />

          <div
            className={`
              ${styles["auth-section__wrapp-cover"]}
              ${isLogin ? "" : styles.move}
            `}
          >
            <Image
              src="/img/auth/auth-cover.png"
              alt="capa do login/cadastro"
              width={650}
              height={450}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Authentication
