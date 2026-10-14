import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { HiLogout } from "react-icons/hi"
import ButtonLoading from "@/components/loadings/ButtonLoading/ButtonLoading"
import { createAccount } from "@/lib/actions/createAccount"
import { formRegisterSchema } from "@/lib/schemas/formRegisterSchema"
import type { FormRegisterType } from "@/types/FormRegisterType"
import styles from "../Access.module.sass"

interface RegisterProps {
  isLogin: boolean
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  handleAuthMessage: (isError: boolean, message: string) => void
}

function Register({ isLogin, setIsLogin, handleAuthMessage }: RegisterProps) {
  const router = useRouter()
  const [showRegisterPassword, setShowRegisterPassword] =
    useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValues,
  } = useForm<FormRegisterType>({
    resolver: zodResolver(formRegisterSchema),
  })

  async function onSubmit(authData: FormRegisterType) {
    if (isLoading) return

    setIsLoading(true)
    let shouldRedirect = false

    try {
      const result = await createAccount(authData)

      if (result.error) {
        handleAuthMessage(true, result.message)
        setIsLoading(false)
      } else {
        handleAuthMessage(false, "")
        shouldRedirect = true
      }
    } catch (_error) {
      handleAuthMessage(true, "Ocorreu um erro inesperado no cadastro")
    } finally {
      setIsLoading(false)
    }

    if (shouldRedirect) {
      router.push("/")
    }
  }

  function clearFields() {
    setValues({
      name: "",
      email: "",
      password: "",
    })
  }

  return (
    <div
      className={`
        ${styles["access-container"]}
        ${styles["access-container--register"]}
        ${isLogin ? "" : styles.hide}
      `}
    >
      <h2 className={styles["access-container__title"]}>Cadastro</h2>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className={styles["access-container__input-container"]}>
          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="register-name">Nome</label>

            <input
              type="text"
              id="register-name"
              maxLength={10}
              className={`${styles["access-container__input"]}`}
              {...register("name")}
            />

            {errors.name && (
              <p className={styles["error-form"]}>{errors.name.message}</p>
            )}
          </div>

          <div
            className={`
              ${styles["access-container__input-wrapper"]}
              ${styles["access-container__input-wrapper--register"]}
            `}
          >
            <label htmlFor="register-email">Email</label>

            <input
              type="email"
              id="register-email"
              maxLength={150}
              className={`${styles["access-container__input"]}`}
              {...register("email")}
            />

            {errors.email && (
              <p className={styles["error-form"]}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="register-password">Senha</label>

            <div className={styles["access-container__password-input-wrapper"]}>
              <input
                type={showRegisterPassword ? "text" : "password"}
                id="register-password"
                minLength={8}
                maxLength={10}
                className={`${styles["access-container__input"]}`}
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowRegisterPassword((prev) => !prev)}
              >
                {showRegisterPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
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
            className={`
              ${styles["access-container__register-button"]}
              ${styles["access-container__register-button--register"]}
            `}
            onClick={() => {
              setIsLogin(true)
              clearFields()
            }}
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
