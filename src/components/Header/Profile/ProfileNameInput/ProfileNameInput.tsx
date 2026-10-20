import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { formChangeProfileType } from "@/types/formChangeProfileType"
import styles from "../Profile.module.sass"

interface ProfileNameInputProps {
  register: UseFormRegister<formChangeProfileType>
  errors: FieldErrors<formChangeProfileType>
}

function ProfileNameInput({ register, errors }: ProfileNameInputProps) {
  return (
    <div>
      <label htmlFor="profileName">Alterar Nome</label>

      <input
        type="text"
        id="profileName"
        maxLength={10}
        {...register("profileName")}
      />

      {errors.profileName && (
        <p className={styles["error-form"]}>{errors.profileName.message}</p>
      )}
    </div>
  )
}

export default ProfileNameInput
