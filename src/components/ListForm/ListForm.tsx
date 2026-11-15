"use client"

import type {
  FieldErrors,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form"
import { get } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import ButtonLoading from "../loadings/ButtonLoading/ButtonLoading"
import styles from "./ListForm.module.sass"

interface ListFormProps<T extends FieldValues> {
  handleSubmit: UseFormHandleSubmit<T>
  register: UseFormRegister<T>
  reset: UseFormReset<T>
  errors: FieldErrors<T>
  onSubmit: SubmitHandler<T>
  registerName: Path<T>
  registerPriority: Path<T>
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  nameTitle: string
  priorityTitle: string
  submitText: string
}

function ListForm<T extends FieldValues>({
  handleSubmit,
  register,
  reset,
  errors,
  onSubmit,
  registerName,
  registerPriority,
  setShow,
  loading,
  nameTitle,
  priorityTitle,
  submitText,
}: ListFormProps<T>) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["list-form"]}>
      <div className={styles["list-form__field-container"]}>
        <div className={styles["list-form__name"]}>
          <label htmlFor="list-name">{nameTitle}</label>

          <input
            type="text"
            id="list-name"
            maxLength={15}
            {...register(registerName)}
          />

          {get(errors, registerName)?.message && (
            <p className={styles["input-error"]}>
              {String(get(errors, registerName).message)}
            </p>
          )}
        </div>

        <div className={styles["list-form__priority-container"]}>
          <legend>{priorityTitle}</legend>

          <div className={styles["list-form__priority-options"]}>
            <div className={styles["list-form__priority"]}>
              <input
                type="radio"
                value="low"
                id="low-priority"
                {...register(registerPriority)}
              />

              <label htmlFor="low-priority">Baixa</label>
            </div>

            <div className={styles["list-form__priority"]}>
              <input
                type="radio"
                value="medium"
                id="medium-priority"
                {...register(registerPriority)}
              />

              <label htmlFor="medium-priority">Média</label>
            </div>

            <div className={styles["list-form__priority"]}>
              <input
                type="radio"
                value="high"
                id="high-priority"
                {...register(registerPriority)}
              />

              <label htmlFor="high-priority">Alta</label>
            </div>
          </div>

          {get(errors, registerPriority)?.message && (
            <p className={styles["input-error"]}>
              {String(get(errors, registerPriority).message)}
            </p>
          )}
        </div>
      </div>

      <div className={styles["list-form__button-container"]}>
        <button type="submit" className={styles["list-form__send-button"]}>
          {loading ? <ButtonLoading /> : <p>{submitText}</p>}
        </button>

        <button
          type="button"
          className={styles["list-form__cancel-button"]}
          onClick={() => {
            setShow(false)
            reset()
          }}
        >
          <FaXmark />
        </button>
      </div>
    </form>
  )
}

export default ListForm
