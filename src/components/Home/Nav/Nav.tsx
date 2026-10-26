"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { moveLeftSlide, moveRightSlide } from "@/lib/utils/moveSlide"
import styles from "./Nav.module.sass"

const urlList = [
  "/",
  "/concluido",
  "/cancelado",
  "/atrasado",
  "/favorito",
  "/pomodoro",
]
const moveSize: number = 300
const visibleItems = 3

function Nav() {
  const router = useRouter()
  const pathName: string = usePathname()

  const currentIndex: number = Math.max(urlList.indexOf(pathName), 0)
  const page = Math.floor(currentIndex / visibleItems)
  const move: number = page * visibleItems * moveSize

  return (
    <div className={styles["nav-container"]}>
      <button
        type="button"
        className={styles["nav-container__nav-button"]}
        onClick={() => moveLeftSlide(urlList, currentIndex, router)}
      >
        <IoIosArrowBack />
      </button>

      <nav className={styles["nav-container__nav"]}>
        <ul
          className={styles["nav-container__list"]}
          style={{ transform: `translateX(-${move}px)` }}
        >
          <li className={styles["nav-container__item"]}>
            <Link
              href="/"
              className={`
                ${styles["nav-container__link"]}
                ${pathName === "/" ? styles["nav-container__link--selected"] : styles["nav-container__link--deselected"]}
              `}
            >
              Pendente
            </Link>
          </li>

          <li className={styles["nav-container__item"]}>
            <Link
              href="/concluido"
              className={`
                ${styles["nav-container__link"]}
                ${pathName === "/concluido" ? styles["nav-container__link--selected"] : styles["nav-container__link--deselected"]}
              `}
            >
              Concluido
            </Link>
          </li>

          <li className={styles["nav-container__item"]}>
            <Link
              href="/cancelado"
              className={`
                ${styles["nav-container__link"]}
                ${pathName === "/cancelado" ? styles["nav-container__link--selected"] : styles["nav-container__link--deselected"]}
              `}
            >
              Cancelado
            </Link>
          </li>

          <li className={styles["nav-container__item"]}>
            <Link
              href="/atrasado"
              className={`
                ${styles["nav-container__link"]}
                ${pathName === "/atrasado" ? styles["nav-container__link--selected"] : styles["nav-container__link--deselected"]}
              `}
            >
              Atrasado
            </Link>
          </li>

          <li className={styles["nav-container__item"]}>
            <Link
              href="/favorito"
              className={`
                ${styles["nav-container__link"]}
                ${pathName === "/favorito" ? styles["nav-container__link--selected"] : styles["nav-container__link--deselected"]}
              `}
            >
              Favorito
            </Link>
          </li>

          <li className={styles["nav-container__item"]}>
            <Link
              href="/pomodoro"
              className={`
                ${styles["nav-container__link"]}
                ${pathName === "/pomodoro" ? styles["nav-container__link--selected"] : styles["nav-container__link--deselected"]}
              `}
            >
              Pomodoro
            </Link>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        className={styles["nav-container__nav-button"]}
        onClick={() => moveRightSlide(urlList, currentIndex, router)}
      >
        <IoIosArrowForward />
      </button>
    </div>
  )
}

export default Nav
