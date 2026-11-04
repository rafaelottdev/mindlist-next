import type {
  FieldError,
  FieldPath,
  FieldValues,
  UseFormRegister,
} from "react-hook-form"
import styles from "./PriorityInput.module.sass"

interface PriorityInputProps<T extends FieldValues> {
  registerName: FieldPath<T>
  title: string
  register: UseFormRegister<T>
  errors: FieldError | undefined
}

function PriorityInput<T extends FieldValues>({
  registerName,
  title,
  register,
  errors,
}: PriorityInputProps<T>) {
  return (
    <fieldset
      className={`
        ${styles["form-container__input-container"]}
        ${styles["priority-container"]}
      `}
    >
      <legend>{title}</legend>

      <div className={styles["priority-container__input-list-option"]}>
        <div className={styles["priority-container__option"]}>
          <input
            type="radio"
            id={`${registerName}-lowPriority`}
            value="low"
            {...register(registerName)}
          />

          <label htmlFor={`${registerName}-lowPriority`}>Baixa</label>
        </div>

        <div className={styles["priority-container__option"]}>
          <input
            type="radio"
            id={`${registerName}-mediumPriority`}
            value="medium"
            {...register(registerName)}
          />

          <label htmlFor={`${registerName}-mediumPriority`}>Média</label>
        </div>

        <div className={styles["priority-container__option"]}>
          <input
            type="radio"
            id={`${registerName}-highPriority`}
            value="high"
            {...register(registerName)}
          />

          <label htmlFor={`${registerName}-highPriority`}>Alta</label>
        </div>
      </div>

      {errors && <p className={styles["input-error"]}>{errors.message}</p>}
    </fieldset>
  )
}

export default PriorityInput
