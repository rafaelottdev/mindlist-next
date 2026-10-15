"use client"

import Image from "next/image"
import { useState } from "react"
import { FaRegUser } from "react-icons/fa"
import { MdNotificationsNone } from "react-icons/md"
import { PiSignOutBold } from "react-icons/pi"
import Perfil from "../Perfil/Perfil"
import styles from "./Menu.module.sass"

function Menu() {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showPerfil, setShowPerfil] = useState<boolean>(false)

  return (
    <div className={styles.menu}>
      {showPerfil && <Perfil />}

      <button
        type="button"
        className={styles.menu__perfil}
        onClick={() => {
          setShowMenu((prev) => !prev)
          setShowPerfil(false)
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
            className={styles["menu__perfil-button"]}
            onClick={() => setShowPerfil((prev) => !prev)}
          >
            <FaRegUser />

            <p>Perfil</p>
          </button>
        </li>

        <li className={styles["menu__perfil-item"]}>
          <button type="button" className={styles["menu__perfil-button"]}>
            <MdNotificationsNone />

            <p>Notificação</p>
          </button>
        </li>

        <li className={styles["menu__perfil-item"]}>
          <button type="button" className={styles["menu__perfil-button"]}>
            <PiSignOutBold />

            <p>Sair</p>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Menu
