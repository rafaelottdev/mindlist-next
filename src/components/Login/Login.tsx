import { AiFillEye } from "react-icons/ai" // AiFillEyeInvisible
import { HiLogout } from "react-icons/hi"

import styles from "./Login.module.sass"

function Login() {
  return (
    <div className={styles["login-container"]}>
      <h2 className={styles["login-container__title"]}>Login</h2>

      <form action="">
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>

          <div>
            <label htmlFor="password">Senha</label>

            <div>
              <input type="password" name="password" id="password" />
              <AiFillEye />
            </div>
          </div>
        </div>

        <div>
          <button type="submit">Entrar</button>

          <button type="button">
            <p>Cadastro</p>

            <HiLogout />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
