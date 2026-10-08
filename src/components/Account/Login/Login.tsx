import { AiFillEyeInvisible } from "react-icons/ai" // AiFillEye
import { HiLogout } from "react-icons/hi"

import styles from "../Access.module.sass"

interface Login {
  isLogin: boolean
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function Login({ isLogin, setIsLogin }: Login) {
  return (
    <div
      className={`
        ${styles["access-container"]}
        ${isLogin ? "" : styles.hide}
      `}
    >
      <h2 className={styles["access-container__title"]}>Login</h2>

      <form action="">
        <div className={styles["access-container__input-container"]}>
          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>

          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="password">Senha</label>

            <div className={styles["access-container__password-input-wrapper"]}>
              <input type="password" name="password" id="password" />

              <button type="button">
                <AiFillEyeInvisible />
              </button>
            </div>
          </div>
        </div>

        <div className={styles["access-container__button-container"]}>
          <button
            type="submit"
            className={styles["access-container__submit-button"]}
          >
            Entrar
          </button>

          <button
            type="button"
            className={styles["access-container__register-button"]}
            onClick={() => setIsLogin(false)}
          >
            <p>Cadastro</p>

            <HiLogout />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
