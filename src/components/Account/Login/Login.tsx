import { useRef } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { HiLogout } from "react-icons/hi"
import { validateEmail } from "@/lib/validateEmail"
import styles from "../Access.module.sass"

interface Login {
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
}: Login) {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  function validateFields(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    const emailValue = emailRef.current?.value
    // const passwordValue = passwordRef.current?.value

    validateEmail(emailValue)
  }

  return (
    <div
      className={`
        ${styles["access-container"]}
        ${isLogin ? "" : styles.hide}
      `}
    >
      <h2 className={styles["access-container__title"]}>Login</h2>

      <form action="" autoComplete="off">
        <div className={styles["access-container__input-container"]}>
          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              maxLength={50}
              ref={emailRef}
            />
          </div>

          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="password">Senha</label>

            <div className={styles["access-container__password-input-wrapper"]}>
              <input
                type={showLoginPassword ? "text" : "password"}
                name="password"
                id="password"
                minLength={8}
                maxLength={10}
                ref={passwordRef}
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
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              validateFields(e)
            }}
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
