import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { FormChangeProfileType } from "@/types/FormChangeProfileType"
import styles from "../Profile.module.sass"

interface ProfileNameInputProps {
  register: UseFormRegister<FormChangeProfileType>
  errors: FieldErrors<FormChangeProfileType>
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
