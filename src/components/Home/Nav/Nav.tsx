"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { moveLeftSlide, moveRightSlide } from "@/lib/utils/moveSlide"
import styles from "./Nav.module.sass"

const urlList = ["/", "/concluido", "/atrasado", "/favorito"]
const breakpoint = 768
const desktop = { visibleItems: 3, moveSize: 300 }
const mobile = { visibleItems: 1, moveSize: 240 }

function Nav() {
  const router = useRouter()
  const pathName: string = usePathname()

  const [moveSize, setMoveSize] = useState<number>(desktop.moveSize)
  const [visibleItems, setVisibleItems] = useState<number>(desktop.visibleItems)

  useEffect(() => {
    function updateLayout() {
      const layout = window.innerWidth > breakpoint ? desktop : mobile

      setMoveSize(layout.moveSize)
      setVisibleItems(layout.visibleItems)
    }

    updateLayout()

    window.addEventListener("resize", updateLayout)
    return () => window.removeEventListener("resize", updateLayout)
  }, [])

  const currentIndex: number = Math.max(urlList.indexOf(pathName), 0)
  const page = Math.floor(currentIndex / visibleItems)
  const move: number = page * visibleItems * moveSize

  return (
    <div className={styles["nav-container"]}>
      <button
        type="button"
        disabled={currentIndex === 0}
        className={`
          ${styles["nav-container__nav-button"]}
          ${currentIndex === 0 && styles["nav-container__nav-button--color"]}
        `}
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
        </ul>
      </nav>

      <button
        type="button"
        disabled={currentIndex === urlList.length}
        className={`
          ${styles["nav-container__nav-button"]}
          ${currentIndex === urlList.length - 1 && styles["nav-container__nav-button--color"]}
        `}
        onClick={() => moveRightSlide(urlList, currentIndex, router)}
      >
        <IoIosArrowForward />
      </button>
    </div>
  )
}

export default Nav
