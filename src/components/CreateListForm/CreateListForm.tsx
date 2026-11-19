"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { createList } from "@/lib/actions/createList"
import { formCreateListSchema } from "@/lib/schemas/formCreateListSchema"
import type { FormCreateListType } from "@/types/FormCreateListType"
import type { ListType } from "@/types/ListType"
import type { ProjectListType } from "@/types/ProjectListType"
import ListForm from "../ListForm/ListForm"
import CreateListCover from "./CreateListCover/CreateListCover"
import styles from "./CreateListForm.module.sass"

interface CreateListFormProps {
  projectData: ProjectListType
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>
}

function CreateListForm({ projectData, setLists }: CreateListFormProps) {
  const { notify } = useNotify()
  const [showForm, setShowForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
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
        setLists((prev) => [...prev, ...(result.response ?? [])])
        reset()
        setShowForm(false)
        notify(result.message)
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
      {showForm ? (
        <ListForm<FormCreateListType>
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
          errors={errors}
          onSubmit={onSubmit}
          registerName="listName"
          registerPriority="listPriority"
          setShow={setShowForm}
          loading={loading}
          nameTitle="Nome da Lista"
          priorityTitle="Prioridade"
          submitText="Criar"
        />
      ) : (
      <CreateListCover
        setShowForm={setShowForm}
        setFocus={setFocus}
      />
      )}      
    </div>
  )
}

export default CreateListForm
