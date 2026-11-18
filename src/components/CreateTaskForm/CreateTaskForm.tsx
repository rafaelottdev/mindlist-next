"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { createTask } from "@/lib/actions/createTask"
import { formCreateTaskSchema } from "@/lib/schemas/formCreateTaskSchema"
import { handleCompletedTask } from "@/lib/utils/handleCompletedTask"
import type { formCreateTaskType } from "@/types/FormCreateTaskType"
import type { ListType } from "@/types/ListType"
import ButtonLoading from "../loadings/ButtonLoading/ButtonLoading"
import styles from "./CreateTaskForm.module.sass"

interface CreateTaskFormProps {
  listId: number
  projectId: number
  setCreateTaskMode: React.Dispatch<React.SetStateAction<boolean>>
  onCreated: () => void
  setTaskListQty: React.Dispatch<React.SetStateAction<number>>
  setCompletedTaskQty: React.Dispatch<React.SetStateAction<number>>
  lists: ListType[]
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>
}

function CreateTaskForm({
  listId,
  projectId,
  setCreateTaskMode,
  onCreated,
  setTaskListQty,
  setCompletedTaskQty,
  lists,
  setLists,
}: CreateTaskFormProps) {
  const { notify } = useNotify()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<formCreateTaskType>({
    resolver: zodResolver(formCreateTaskSchema),
  })

  async function onSubmit(formData: formCreateTaskType) {
    setLoading(true)

    try {
      const result = await createTask(formData, listId)

      if (result.error) {
        notify(result.message)
      } else {
        onCreated()
        reset()
        void handleCompletedTask(
          listId,
          projectId,
          setTaskListQty,
          setCompletedTaskQty,
          lists,
          setLists,
        ).catch((error) => {
          console.error(error)
          setLoading(false)
          notify("Erro ao atualizar o status da lista")
        })
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      notify("Algo deu errado ao tentar criar a tarefa")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setFocus("taskName")
  }, [setFocus])

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
