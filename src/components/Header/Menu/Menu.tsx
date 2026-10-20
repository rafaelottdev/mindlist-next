"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { FaRegUser } from "react-icons/fa"
import { MdNotificationsNone } from "react-icons/md"
import { PiSignOutBold } from "react-icons/pi"
import ButtonLoading from "@/components/loadings/ButtonLoading/ButtonLoading"
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

  async function onSignOut() {
    setIsLoading(true)
    setShowSignOut(true)
    setShowProfile(false)
    setShowNotification(false)

    try {
      await signOut()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    async function getUserProfile() {
      try {
        setUserInfoLoading(true)

        const user = await getUser()
        const name = user?.name
        const image = user?.image

        setUserName(name)
        setUserImage(image)
      } catch (error) {
        console.log(error)
      } finally {
        setUserInfoLoading(false)
      }
    }

    getUserProfile()
  }, [])

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
