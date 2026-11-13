"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import ButtonLoading from "@/components/loadings/ButtonLoading/ButtonLoading"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { updateTaskName } from "@/lib/actions/updateTaskName"
import { formEditTaskSchema } from "@/lib/schemas/formEditTaskSchema"
import type { FormEditTaskType } from "@/types/FormEditTaskType"
import type { taskType } from "@/types/taskType"
import styles from "./TaskEditForm.module.sass"

interface TaskEditFormProps {
  task: taskType
  listId: number
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  onUpdate: () => void
}

function TaskEditForm({
  task,
  listId,
  setShowEditForm,
  setShowMenu,
  onUpdate,
}: TaskEditFormProps) {
  const { notify } = useNotify()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<FormEditTaskType>({
    resolver: zodResolver(formEditTaskSchema),
  })

  async function onSubmit(formData: FormEditTaskType) {
    try {
      if (formData.editTaskName) {
        setLoading(true)

        const result = await updateTaskName(task, listId, formData.editTaskName)

        if (result.error) {
          notify(result.message)
        } else {
          onUpdate()
          reset()
          setShowEditForm(false)
          setShowMenu(false)
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setFocus("editTaskName")
  }, [setFocus])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["edit-form"]}>
      <div className={styles["edit-form__input_container"]}>
        <input
          type="text"
          id=""
          className={styles["edit-form__input"]}
          {...register("editTaskName")}
        />
        {errors.editTaskName && (
          <p className={styles["input-error"]}>{errors.editTaskName.message}</p>
        )}
      </div>

      <div className={styles["edit-form__button-container"]}>
        <button type="submit" className={styles["edit-form__edit-button"]}>
          {loading ? <ButtonLoading /> : <p>Editar</p>}
        </button>

        <button
          type="button"
          className={styles["edit-form__close-button"]}
          onClick={() => {
            setShowEditForm(false)
            setShowMenu(false)
          }}
        >
          <FaXmark />
        </button>
      </div>
    </form>
  )
}

export default TaskEditForm
