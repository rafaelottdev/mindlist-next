import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { HiLogout } from "react-icons/hi"
import ButtonLoading from "@/components/loadings/ButtonLoading/ButtonLoading"
import { validateAccount } from "@/lib/actions/validateAccount"
import { formLoginSchema } from "@/lib/schemas/formLoginSchema"
import type { FormLoginType } from "@/types/FormLoginType"
import styles from "../Access.module.sass"

interface LoginProps {
  isLogin: boolean
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  handleAuthMessage: (isError: boolean, message: string) => void
}

function Login({ isLogin, setIsLogin, handleAuthMessage }: LoginProps) {
  const router = useRouter()
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValues,
  } = useForm<FormLoginType>({
    resolver: zodResolver(formLoginSchema),
  })

  async function onSubmit(authData: FormLoginType) {
    if (isLoading) return

    setIsLoading(true)
    let shouldRedirect = false

    try {
      const result = await validateAccount(authData)

      if (result.error) {
        handleAuthMessage(true, result.message)
        setIsLoading(false)
      } else {
        handleAuthMessage(false, "")
        shouldRedirect = true
      }
    } catch (_error) {
      handleAuthMessage(true, "Ocorreu um erro inesperado no login")
    } finally {
      setIsLoading(false)
    }

    if (shouldRedirect) {
      router.push("/")
    }
  }

  function clearFields() {
    setValues({
      email: "",
      password: "",
    })
  }

  return (
    <div
      className={`
        ${styles["access-container"]}
        ${isLogin ? "" : styles.hide}
      `}
    >
      <h2 className={styles["access-container__title"]}>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className={styles["access-container__input-container"]}>
          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="login-email">Email</label>

            <input
              type="email"
              id="login-email"
              maxLength={150}
              className={`${styles["access-container__input"]}`}
              {...register("email")}
            />

            {errors.email && (
              <p className={styles["error-form"]}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="login-password">Senha</label>

            <div className={styles["access-container__password-input-wrapper"]}>
              <input
                type={showLoginPassword ? "text" : "password"}
                id="login-password"
                minLength={8}
                maxLength={10}
                className={`${styles["access-container__input"]}`}
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowLoginPassword((prev) => !prev)}
              >
                {showLoginPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </div>

            {errors.password && (
              <p className={styles["error-form"]}>{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className={styles["access-container__button-container"]}>
          <button
            type="submit"
            className={styles["access-container__submit-button"]}
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoading /> : "Entrar"}
          </button>

          <button
            type="button"
            className={styles["access-container__register-button"]}
            onClick={() => {
              setIsLogin(false)
              clearFields()
            }}
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
