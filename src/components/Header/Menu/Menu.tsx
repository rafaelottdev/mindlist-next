"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { FaRegUser } from "react-icons/fa"
import { MdNotificationsNone } from "react-icons/md"
import { PiSignOutBold } from "react-icons/pi"
import ButtonLoading from "@/components/loadings/ButtonLoading/ButtonLoading"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { getUser } from "@/lib/actions/getUser"
import { signOut } from "@/lib/actions/signOut"
import Notification from "../Notification/Notification"
import Profile from "../Profile/Profile"
import styles from "./Menu.module.sass"

function Menu() {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showProfile, setShowProfile] = useState<boolean>(false)
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [showSignOut, setShowSignOut] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userName, setUserName] = useState<string | undefined>("")
  const [userImage, setUserImage] = useState<string | null | undefined>("")
  const [userInfoLoading, setUserInfoLoading] = useState<boolean>(false)
  const { notify } = useNotify()

  async function onSignOut() {
    setIsLoading(true)
    setShowSignOut(true)
    setShowProfile(false)
    setShowNotification(false)

    try {
      const result = await signOut()

      if (result?.error) {
        notify(result.message)
      }
    } catch (error) {
      if (error instanceof Error && error.message === "NEXT_REDIRECT") return

      console.log(error)
      notify("Algo deu errado ao tentar sair")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    async function getUserProfile() {
      try {
        setUserInfoLoading(true)

        const result = await getUser()

        if (!result.error) {
          const name = result.user?.name
          const image = result.user?.image

          setUserName(name)
          setUserImage(image)
        } else {
          notify(result.message)
        }
      } catch (error) {
        console.log(error)
        notify("Algo deu errado ao tentar buscar informações do usuario")
      } finally {
        setUserInfoLoading(false)
      }
    }

    getUserProfile()
  }, [notify])

  return (
    <div className={styles.menu}>
      {showProfile && (
        <Profile
          setUserName={setUserName}
          userImage={userImage}
          setUserImage={setUserImage}
        />
      )}

      {showNotification && <Notification />}

      <button
        type="button"
        className={styles.menu__profile}
        onClick={() => {
          setShowMenu((prev) => !prev)
          setShowProfile(false)
          setShowNotification(false)
        }}
      >
        <div className={styles["menu__profile-image"]}>
          {userInfoLoading ? (
            <ButtonLoading />
          ) : (
            <Image
              src={
                userImage ? `${userImage}` : `/img/header/profile-default.png`
              }
              alt="foto de perfil"
              width={50}
              height={45}
            />
          )}
        </div>

        <div className={styles["menu__profile-name"]}>
          {userInfoLoading ? <ButtonLoading /> : <p>{userName}</p>}
        </div>
      </button>

      <ul
        className={styles["menu__profile-options"]}
        style={{ height: `${showMenu ? "115px" : "0px"}` }}
      >
        <li className={styles["menu__profile-item"]}>
          <button
            type="button"
            className={`
              ${styles["menu__profile-button"]}
              ${showProfile ? `${styles["menu__profile-button--click"]}` : ""}
            `}
            onClick={() => {
              setShowProfile((prev) => !prev)
              setShowNotification(false)
            }}
          >
            <span className={styles.menu__background}></span>

            <FaRegUser />

            <p>Perfil</p>
          </button>
        </li>

        <li className={styles["menu__profile-item"]}>
          <button
            type="button"
            className={`
              ${styles["menu__profile-button"]}
              ${showNotification ? `${styles["menu__profile-button--click"]}` : ""}
            `}
            onClick={() => {
              setShowNotification((prev) => !prev)
              setShowProfile(false)
            }}
          >
            <span className={styles.menu__background}></span>

            <MdNotificationsNone
              className={styles["menu__notification-icon"]}
            />

            <p>Notificação</p>
          </button>
        </li>

        <li className={styles["menu__profile-item"]}>
          <button
            type="button"
            className={`
              ${styles["menu__profile-button"]}
              ${showSignOut ? `${styles["menu__profile-button--click"]}` : ""}
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
