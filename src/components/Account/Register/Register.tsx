import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { HiLogout } from "react-icons/hi"

import styles from "../Access.module.sass"

interface Login {
  isLogin: boolean
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  showRegisterPassword: boolean
  setShowRegisterPassword: React.Dispatch<React.SetStateAction<boolean>>
}

function Register({
  isLogin,
  setIsLogin,
  showRegisterPassword,
  setShowRegisterPassword,
}: Login) {
  return (
    <div
      className={`
        ${styles["access-container"]}
        ${styles["access-container--register"]}
        ${isLogin ? "" : styles.hide}
      `}
    >
      <h2 className={styles["access-container__title"]}>Cadastro</h2>

      <form action="" autoComplete="off">
        <div className={styles["access-container__input-container"]}>
          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              minLength={5}
              maxLength={30}
            />
          </div>

          <div
            className={`
              ${styles["access-container__input-wrapper"]}
              ${styles["access-container__input-wrapper--register"]}
            `}
          >
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" maxLength={50} />
          </div>

          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="password">Senha</label>

            <div className={styles["access-container__password-input-wrapper"]}>
              <input
                type={showRegisterPassword ? "text" : "password"}
                name="password"
                id="password"
                minLength={8}
                maxLength={10}
              />

              <button
                type="button"
                onClick={() => setShowRegisterPassword((prev) => !prev)}
              >
                {showRegisterPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
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
            className={`
              ${styles["access-container__register-button"]}
              ${styles["access-container__register-button--register"]}
            `}
            onClick={() => setIsLogin(true)}
          >
            <HiLogout />

            <p>Login</p>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
