import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { HiLogout } from "react-icons/hi"
import { createUser } from "@/lib/actions/createUser"
import { formRegisterSchema } from "@/lib/schemas/formRegisterSchema"
import type { FormRegisterType } from "@/types/FormRegisterType"
import styles from "../Access.module.sass"

interface RegisterProps {
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
}: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterType>({
    resolver: zodResolver(formRegisterSchema),
  })

  async function onSubmit(authData: FormRegisterType) {
    const result = await createUser(authData)

    console.log(result)
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
            <label htmlFor="name">Nome</label>

            <input
              type="text"
              id="name"
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
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              maxLength={150}
              className={`${styles["access-container__input"]}`}
              {...register("email")}
            />

            {errors.email && (
              <p className={styles["error-form"]}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles["access-container__input-wrapper"]}>
            <label htmlFor="password">Senha</label>

            <div className={styles["access-container__password-input-wrapper"]}>
              <input
                type={showRegisterPassword ? "text" : "password"}
                id="password"
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
