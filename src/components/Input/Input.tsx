import type { FieldPath, FieldValues, UseFormRegister } from "react-hook-form"
import styles from "./Input.module.sass"

interface InputProps<T extends FieldValues> {
  inputId: string
  labelTitle: string
  inputType: string
  registerName: FieldPath<T>
  register: UseFormRegister<T>
}

function Input<T extends FieldValues>({
  inputId,
  labelTitle,
  inputType,
  registerName,
  register,
}: InputProps<T>) {
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
