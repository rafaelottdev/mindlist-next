import styles from "./Input.module.sass"

interface InputProps {
  inputId: string
  labelTitle: string
  inputType: string
}

function Input({ inputId, labelTitle, inputType }: InputProps) {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={inputId} className={styles["input-container__label"]}>
        {labelTitle}
      </label>

      <input
        type={inputType}
        id={inputId}
        className={styles["input-container__input"]}
      />
    </div>
  )
}

export default Input
