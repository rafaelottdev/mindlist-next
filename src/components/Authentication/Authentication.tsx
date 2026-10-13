"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { FaExclamation } from "react-icons/fa6"
import styles from "./Authentication.module.sass"
import Login from "./Login/Login"
import Register from "./Register/Register"

function Authentication() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false)
  const [showRegisterPassword, setShowRegisterPassword] =
    useState<boolean>(false)
  const [createMessage, setCreateMessage] = useState<
    { error: boolean; message: string } | undefined
  >()
  const [hasError, setHasError] = useState<boolean>(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showErrorNotification() {
    setHasError(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setHasError(false)
      timeoutRef.current = null
    }, 2000)
  }

  return (
    <section className={styles["auth-section"]}>
      <div
        className={`
          ${styles["auth-section__notification"]}
          ${hasError ? styles["auth-section__notification--error"] : ""}
        `}
      >
        <FaExclamation />

        <p>{createMessage?.error ? createMessage?.message : ""}</p>
      </div>

      <div className={styles["auth-section__border"]}>
        <div className={styles["auth-section__container"]}>
          <Login
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            showLoginPassword={showLoginPassword}
            setShowLoginPassword={setShowLoginPassword}
          />

          <Register
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            showRegisterPassword={showRegisterPassword}
            setShowRegisterPassword={setShowRegisterPassword}
            setCreateMessage={setCreateMessage}
            showErrorNotification={showErrorNotification}
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
