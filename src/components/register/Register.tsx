import { AiFillEye } from "react-icons/ai" // AiFillEyeInvisible
import { HiLogout } from "react-icons/hi"

function Register() {
  return (
    <div>
      <h2>Cadastro</h2>

      <form action="">
        <div>
          <div>
            <label htmlFor="name">Nome</label>
            <input type="text" name="name" id="name" />
          </div>

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
            <HiLogout />

            <p>Login</p>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
