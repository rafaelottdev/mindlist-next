"use client"

import Image from "next/image"
import { useState } from "react"
import { FaRegUser } from "react-icons/fa"
import { MdNotificationsNone } from "react-icons/md"
import { PiSignOutBold } from "react-icons/pi"
import ButtonLoading from "@/components/loadings/ButtonLoading/ButtonLoading"
import { signOut } from "@/lib/actions/signOut"
import Notification from "../Notification/Notification"
import Perfil from "../Perfil/Perfil"
import styles from "./Menu.module.sass"

function Menu() {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showPerfil, setShowPerfil] = useState<boolean>(false)
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [showSignOut, setShowSignOut] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSignOut() {
    setIsLoading(true)
    setShowSignOut(true)
    setShowPerfil(false)
    setShowNotification(false)

    try {
      await signOut()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.menu}>
      {showPerfil && <Perfil />}
      {showNotification && <Notification />}

      <button
        type="button"
        className={styles.menu__perfil}
        onClick={() => {
          setShowMenu((prev) => !prev)
          setShowPerfil(false)
          setShowNotification(false)
        }}
      >
        <div className={styles["menu__perfil-image"]}>
          <Image
            src={`/img/header/perfil-default.png`}
            alt="foto de perfil"
            width={50}
            height={45}
          />
        </div>

        <div className={styles["menu__perfil-name"]}>
          <p>Rafaelott1</p>
        </div>
      </button>

      <ul
        className={styles["menu__perfil-options"]}
        style={{ height: `${showMenu ? "127px" : "0px"}` }}
      >
        <li className={styles["menu__perfil-item"]}>
          <button
            type="button"
            className={`
              ${styles["menu__perfil-button"]}
              ${showPerfil ? `${styles["menu__perfil-button--click"]}` : ""}
            `}
            onClick={() => {
              setShowPerfil((prev) => !prev)
              setShowNotification(false)
            }}
          >
            <span className={styles.menu__background}></span>

            <FaRegUser />

            <p>Perfil</p>
          </button>
        </li>

        <li className={styles["menu__perfil-item"]}>
          <button
            type="button"
            className={`
              ${styles["menu__perfil-button"]}
              ${showNotification ? `${styles["menu__perfil-button--click"]}` : ""}
            `}
            onClick={() => {
              setShowNotification((prev) => !prev)
              setShowPerfil(false)
            }}
          >
            <span className={styles.menu__background}></span>

            <MdNotificationsNone
              className={styles["menu__notification-icon"]}
            />

            <p>Notificação</p>
          </button>
        </li>

        <li className={styles["menu__perfil-item"]}>
          <button
            type="button"
            className={`
              ${styles["menu__perfil-button"]}
              ${showSignOut ? `${styles["menu__perfil-button--click"]}` : ""}
            `}
            onClick={onSignOut}
          >
            <span className={styles.menu__background}></span>

            {isLoading ? (
              <div className={styles["menu__spinner-container"]}>
                <ButtonLoading />
              </div>
            ) : (
              <>
                <PiSignOutBold />

                <p>Sair</p>
              </>
            )}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Menu
