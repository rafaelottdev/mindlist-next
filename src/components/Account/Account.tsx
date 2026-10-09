"use client"

import Image from "next/image"
import { useState } from "react"
import styles from "./Account.module.sass"

import Login from "./Login/Login"
import Register from "./Register/Register"

function Authentication() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false)
  const [showRegisterPassword, setShowRegisterPassword] =
    useState<boolean>(false)

  return (
    <section className={styles["auth-section"]}>
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
