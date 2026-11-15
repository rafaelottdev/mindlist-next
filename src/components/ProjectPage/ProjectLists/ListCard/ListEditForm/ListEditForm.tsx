"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import ListForm from "@/components/ListForm/ListForm"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { updateList } from "@/lib/actions/updateList"
import { formEditListSchema } from "@/lib/schemas/formEditListSchema"
import type { FormEditListType } from "@/types/FormEditListType"
import type { ListType } from "@/types/ListType"

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
    <ListForm<FormEditListType>
      handleSubmit={handleSubmit}
      register={register}
      reset={reset}
      errors={errors}
      onSubmit={onSubmit}
      registerName="editListName"
      registerPriority="editListPriority"
      setShow={setEditMode}
      loading={loading}
      nameTitle="Editar Nome"
      priorityTitle="Editar Prioridade"
      submitText="Editar"
    />
  )
}

export default ListEditForm
