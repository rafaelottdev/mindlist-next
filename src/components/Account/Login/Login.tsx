import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { HiLogout } from "react-icons/hi"

import styles from "../Access.module.sass"

interface LoginProps {
  isLogin: boolean
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  showLoginPassword: boolean
  setShowLoginPassword: React.Dispatch<React.SetStateAction<boolean>>
}

function Login({
  isLogin,
  setIsLogin,
  showLoginPassword,
  setShowLoginPassword,
}: LoginProps) {
  return (
    <div
      className={`
        ${styles["access-container"]}
        ${isLogin ? "" : styles.hide}
      `}
    >
      <h2 className={styles["access-container__title"]}>Login</h2>

      <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <div className={styles["access-container__input-container"]}>
          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              maxLength={50}
              className={`${styles["access-container__input"]}`}
            />
          </div>

          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="password">Senha</label>

            <div className={styles["access-container__password-input-wrapper"]}>
              <input
                type={showLoginPassword ? "text" : "password"}
                id="password"
                minLength={8}
                maxLength={10}
                className={`${styles["access-container__input"]}`}
              />

              <button
                type="button"
                onClick={() => setShowLoginPassword((prev) => !prev)}
              >
                {showLoginPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
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
