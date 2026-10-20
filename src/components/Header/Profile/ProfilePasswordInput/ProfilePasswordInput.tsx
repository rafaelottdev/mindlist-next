import { useState } from "react"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import type { formChangeProfileType } from "@/types/formChangeProfileType"
import styles from "./ProfilePasswordInput.module.sass"

interface ProfilePasswordInputProps {
  register: UseFormRegister<formChangeProfileType>
  errors: FieldErrors<formChangeProfileType>
  inputName: keyof formChangeProfileType
}

function ProfilePasswordInput({
  register,
  errors,
  inputName,
}: ProfilePasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div>
      <label htmlFor={inputName}>
        {inputName === "currentPassword" ? "Senha Atual" : "Alterar Senha"}
      </label>

      <div className={styles["input-container"]}>
        <input
          type={showPassword ? "text" : "password"}
          id={inputName}
          maxLength={10}
          {...register(inputName)}
        />

        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
        </button>
      </div>

      {errors[inputName] && (
        <p className={styles["error-form"]}>{errors[inputName].message}</p>
      )}
    </div>
  )
}

export default ProfilePasswordInput
