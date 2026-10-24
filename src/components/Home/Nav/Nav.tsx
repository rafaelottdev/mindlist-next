"use client"

import Link from "next/link"
// import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { moveLeftSlide, moveRightSlide } from "@/lib/utils/moveSlide"
import styles from "./Nav.module.sass"

function Nav() {
  // const router = useRouter()
  // const urls = [
  //   "/",
  //   "/concluido",
  //   "/cancelado",
  //   "/atrasado",
  //   "/favorito",
  //   "pomodoro",
  // ]
  const [moveSize, _setMoveSize] = useState<number>(300)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const total: number = currentIndex * moveSize

  // useEffect(() => {
  //   router.push(urls[currentIndex])
  // }, [currentIndex, router.push])

  return (
    <div className={styles["home__nav-container"]}>
      <button
        type="button"
        className={styles["home__nav-button"]}
        onClick={() => moveLeftSlide(currentIndex, setCurrentIndex)}
      >
        <IoIosArrowBack />
      </button>

      <nav className={styles.home__nav}>
        <ul
          className={styles.home__list}
          style={{ transform: `translateX(-${total}px)` }}
        >
          <li className={styles.home__item}>
            <Link href="/" className={styles.home__link}>
              Pendente
            </Link>
          </li>

          <li className={styles.home__item}>
            <Link href="/concluido" className={styles.home__link}>
              Concluido
            </Link>
          </li>

          <li className={styles.home__item}>
            <Link href="/cancelado" className={styles.home__link}>
              Cancelado
            </Link>
          </li>

          <li className={styles.home__item}>
            <Link href="/atrasado" className={styles.home__link}>
              Atrasado
            </Link>
          </li>

          <li className={styles.home__item}>
            <Link href="/favorito" className={styles.home__link}>
              Favorito
            </Link>
          </li>

          <li className={styles.home__item}>
            <Link href="/pomodoro" className={styles.home__link}>
              Pomodoro
            </Link>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        className={styles["home__nav-button"]}
        onClick={() => moveRightSlide(currentIndex, setCurrentIndex)}
      >
        <IoIosArrowForward />
      </button>
    </div>
  )
}

export default Nav
