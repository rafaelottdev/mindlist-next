"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { createList } from "@/lib/actions/createList"
import { formCreateListSchema } from "@/lib/schemas/formCreateListSchema"
import type { FormCreateListType } from "@/types/FormCreateListType"
import type { ProjectListType } from "@/types/ProjectListType"
import ButtonLoading from "../loadings/ButtonLoading/ButtonLoading"
import CreateListCover from "./CreateListCover/CreateListCover"
import styles from "./CreateListForm.module.sass"

function CreateListForm({ projectData }: { projectData: ProjectListType }) {
  const router = useRouter()
  const { notify } = useNotify()
  const [showForm, setShowForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormCreateListType>({
    resolver: zodResolver(formCreateListSchema),
  })

  async function onSubmit(formData: FormCreateListType) {
    try {
      setLoading(true)
      const result = await createList(formData, projectData)

      if (result.error) {
        notify(result.message)
      } else {
        router.refresh()
        notify(result.message)
        reset()
        setShowForm(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      notify("Algo deu errado ao tentar criar a lista")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles["create-list"]}>
      <CreateListCover showForm={showForm} setShowForm={setShowForm} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["create-list__form"]}
      >
        <div className={styles["create-list__field-container"]}>
          <div className={styles["create-list__name"]}>
            <label htmlFor="list-name">Nome da Lista</label>

            <input
              type="text"
              id="list-name"
              maxLength={15}
              {...register("listName")}
            />

            {errors.listName && (
              <p className={styles["input-error"]}>{errors.listName.message}</p>
            )}
          </div>

          <div className={styles["create-list__priority-container"]}>
            <legend>Prioridade</legend>

            <div className={styles["create-list__priority-options"]}>
              <div className={styles["create-list__priority"]}>
                <input
                  type="radio"
                  value="low"
                  id="low-priority"
                  {...register("listPriority")}
                />

                <label htmlFor="low-priority">Baixa</label>
              </div>

              <div className={styles["create-list__priority"]}>
                <input
                  type="radio"
                  value="medium"
                  id="medium-priority"
                  {...register("listPriority")}
                />

                <label htmlFor="medium-priority">Média</label>
              </div>

              <div className={styles["create-list__priority"]}>
                <input
                  type="radio"
                  value="high"
                  id="high-priority"
                  {...register("listPriority")}
                />

                <label htmlFor="high-priority">Alta</label>
              </div>
            </div>

            {errors.listPriority && (
              <p className={styles["input-error"]}>
                {errors.listPriority.message}
              </p>
            )}
          </div>
        </div>

        <div className={styles["create-list__button-container"]}>
          <button type="submit" className={styles["create-list__send-button"]}>
            {loading ? <ButtonLoading /> : <p>Criar</p>}
          </button>

          <button
            type="button"
            className={styles["create-list__cancel-button"]}
            onClick={() => {
              setShowForm(false)
              reset()
            }}
          >
            <FaXmark />
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateListForm
