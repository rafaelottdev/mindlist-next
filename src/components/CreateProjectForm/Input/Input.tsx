import type { FieldPath, UseFormRegister } from "react-hook-form"
import type { formCreateProjectType } from "@/types/FormCreateProjectType"
import styles from "./Input.module.sass"

interface InputProps {
  inputId: string
  labelTitle: string
  inputType: string
  registerName: FieldPath<formCreateProjectType>
  register: UseFormRegister<formCreateProjectType>
}

function Input({
  inputId,
  labelTitle,
  inputType,
  registerName,
  register,
}: InputProps) {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={inputId} className={styles["input-container__label"]}>
        {labelTitle}
      </label>

      <input
        type={inputType}
        id={inputId}
        className={styles["input-container__input"]}
        {...register(registerName)}
      />
    </div>
  )
}

export default Input
