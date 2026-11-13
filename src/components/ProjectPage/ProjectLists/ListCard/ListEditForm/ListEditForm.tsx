"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import ButtonLoading from "@/components/loadings/ButtonLoading/ButtonLoading"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { updateList } from "@/lib/actions/updateList"
import { formEditListSchema } from "@/lib/schemas/formEditListSchema"
import type { FormEditListType } from "@/types/FormEditListType"
import type { ListType } from "@/types/ListType"
import styles from "./ListEditForm.module.sass"

function ListEditForm({
  list,
  setEditMode,
}: {
  list: ListType
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()
  const { notify } = useNotify()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<FormEditListType>({
    resolver: zodResolver(formEditListSchema),
  })

  async function onSubmit(formData: FormEditListType) {
    try {
      if (formData.editListName || formData.editListPriority) {
        setLoading(true)

        const result = await updateList(formData, list)

        if (result.error) {
          notify(result.message)
        } else {
          router.refresh()
          notify(result.message)
          reset()
          setEditMode(false)
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      notify("Algo deu errado ao tentar editar a lista")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setFocus("editListName")
  }, [setFocus])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["list-form"]}>
      <div className={styles["list-form__field-container"]}>
        <div className={styles["list-form__name"]}>
          <label htmlFor="list-name">Editar Nome</label>

          <input
            type="text"
            id="list-name"
            maxLength={15}
            {...register("editListName")}
          />

          {errors.editListName && (
            <p className={styles["input-error"]}>
              {errors.editListName.message}
            </p>
          )}
        </div>

        <div className={styles["list-form__priority-container"]}>
          <legend>Editar Prioridade</legend>

          <div className={styles["list-form__priority-options"]}>
            <div className={styles["list-form__priority"]}>
              <input
                type="radio"
                value="low"
                id="low-priority"
                {...register("editListPriority")}
              />

              <label htmlFor="low-priority">Baixa</label>
            </div>

            <div className={styles["list-form__priority"]}>
              <input
                type="radio"
                value="medium"
                id="medium-priority"
                {...register("editListPriority")}
              />

              <label htmlFor="medium-priority">Média</label>
            </div>

            <div className={styles["list-form__priority"]}>
              <input
                type="radio"
                value="high"
                id="high-priority"
                {...register("editListPriority")}
              />

              <label htmlFor="high-priority">Alta</label>
            </div>
          </div>

          {errors.editListPriority && (
            <p className={styles["input-error"]}>
              {errors.editListPriority.message}
            </p>
          )}
        </div>
      </div>

      <div className={styles["list-form__button-container"]}>
        <button type="submit" className={styles["list-form__send-button"]}>
          {loading ? <ButtonLoading /> : <p>Editar</p>}
        </button>

        <button
          type="button"
          className={styles["list-form__cancel-button"]}
          onClick={() => {
            setEditMode(false)
            reset()
          }}
        >
          <FaXmark />
        </button>
      </div>
    </form>
  )
}

export default ListEditForm
