import Image from "next/image"
import Login from "../Login/Login"

import styles from "./Authentication.module.sass"

function Authentication() {
  return (
    <section className={styles["auth-section"]}>
      <div className={styles["auth-section__border"]}>
        <div className={styles["auth-section__container"]}>
          <Login />

          <div className={styles["auth-section__wrapp-cover"]}>
            <Image
              src="/img/auth/auth-cover.png"
              alt="capa do login/cadastro"
              width={500}
              height={350}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Authentication
