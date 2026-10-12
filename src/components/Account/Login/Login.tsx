import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { HiLogout } from "react-icons/hi"
import { loginAction } from "@/lib/actions/loginAction"
import { formLoginSchema } from "@/lib/schemas/formLoginSchema"
import type { FormLoginType } from "@/types/FormLoginType"
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginType>({
    resolver: zodResolver(formLoginSchema),
  })

  async function onSubmit(formData: FormLoginType) {
    const result = await loginAction(formData)

    console.log(result)
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              maxLength={50}
              className={`${styles["access-container__input"]}`}
              {...register("email")}
            />

            {errors.email && (
              <p className={styles["error-form-login"]}>
                {errors.email.message}
              </p>
            )}
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
              <p className={styles["error-form-login"]}>
                {errors.password.message}
              </p>
            )}
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
