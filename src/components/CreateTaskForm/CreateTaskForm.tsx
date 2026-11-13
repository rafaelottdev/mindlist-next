"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { createTask } from "@/lib/actions/createTask"
import { formCreateTaskSchema } from "@/lib/schemas/formCreateTaskSchema"
import type { formCreateTaskType } from "@/types/FormCreateTaskType"
import ButtonLoading from "../loadings/ButtonLoading/ButtonLoading"
import styles from "./CreateTaskForm.module.sass"

interface CreateTaskFormProps {
  listId: number
  setCreateTaskMode: React.Dispatch<React.SetStateAction<boolean>>
  onCreated: () => void
}

function CreateTaskForm({
  listId,
  setCreateTaskMode,
  onCreated,
}: CreateTaskFormProps) {
  const { notify } = useNotify()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formCreateTaskType>({
    resolver: zodResolver(formCreateTaskSchema),
  })

  async function onSubmit(formData: formCreateTaskType) {
    try {
      setLoading(true)
      const result = await createTask(formData, listId)

      if (result.error) {
        notify(result.message)
      } else {
        notify(result.message)
        reset()
        onCreated()
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      notify("Algo deu errado ao tentar criar a tarefa")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["create-form"]}>
      <div className={styles["create-form__input-container"]}>
        <input
          type="text"
          className={styles["create-form__input"]}
          placeholder="Digite um titulo"
          {...register("taskName")}
        />

        {errors.taskName && (
          <p className={styles["input-error"]}>{errors.taskName.message}</p>
        )}
      </div>

      <div className={styles["create-form__button-container"]}>
        <button type="submit" className={styles["create-form__send-button"]}>
          {loading ? <ButtonLoading /> : <p>Criar</p>}
        </button>

        <button
          type="button"
          className={styles["create-form__cancel-button"]}
          onClick={() => setCreateTaskMode(false)}
        >
          <FaXmark />
        </button>
      </div>
    </form>
  )
}

export default CreateTaskForm
