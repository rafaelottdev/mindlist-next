import Image from "next/image"
import Link from "next/link"
import styles from "./Header.module.sass"
import Menu from "./Menu/Menu"

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles["header__logo-container"]}>
        <Link href="/" className={styles["header__logo-link"]}>
          <div className={styles["header__logo-wrapper"]}>
            <Image
              src="/img/header/logo.png"
              alt="logo do site"
              width={60}
              height={60}
            />
          </div>

          <h1 className={styles["header__logo-title"]}>
            <Image
              src="/img/header/name.png"
              alt="nome do site"
              width={179}
              height={39}
            />
          </h1>
        </Link>
      </div>

      <Menu />
    </header>
  )
}

export default Header
