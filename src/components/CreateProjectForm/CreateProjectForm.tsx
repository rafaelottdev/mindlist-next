"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { createProject } from "@/lib/actions/createProject"
import { formCreateProjectSchema } from "@/lib/schemas/formCreateProjectSchema"
import type { FormCreateProjectType } from "@/types/FormCreateProjectType"
import type { TagType } from "@/types/TagType"
import ProjectForm from "../ProjectForm/ProjectForm"
import styles from "./CreateProjectForm.module.sass"
import FormCover from "./FormCover/FormCover"

function CreateProjectForm() {
  const router = useRouter()
  const { notify } = useNotify()
  const [showForm, setShowForm] = useState<boolean>(false)
  const [showTagOptionList, setShowTagOptionList] = useState<boolean>(false)
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setFocus,
  } = useForm<FormCreateProjectType>({
    resolver: zodResolver(formCreateProjectSchema),
    defaultValues: {
      projectTags: [],
    },
  })
  const { append, replace, remove } = useFieldArray({
    control,
    name: "projectTags",
  })

  async function onSubmit(projectData: FormCreateProjectType) {
    try {
      setLoading(true)
      const name = projectData.projectName
      const date = projectData.projectDate
      const imageFile = projectData.projectCover?.item(0)
      const priority = projectData.projectPriority
      const tagList = projectData.projectTags

      const formData = new FormData()

      if (name) {
        formData.append("name", name)
      }

      if (date) {
        formData.append("date", date)
      }

      if (imageFile) {
        formData.append("imageFile", imageFile)
      }

      if (priority) {
        formData.append("priority", priority)
      }

      if (tagList) {
        tagList.map((tag) => formData.append("tagList", tag.name))
      }

      const result = await createProject(formData)

      if (result?.error) {
        notify(result.message)
      } else {
        router.push(`/project/${result.projectId}`)
        notify(result.message)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      notify("Algo deu errado ao tentar criar o projeto")
    } finally {
      setLoading(false)
    }
  }

  function clearFields() {
    setShowForm(false)
    reset()
    setSelectedTags([])
    replace([])
    setShowTagOptionList(false)
  }

  return (
    <div className={styles["form-container"]}>
      <FormCover
        showForm={showForm}
        setShowForm={setShowForm}
        setFocus={setFocus}
      />

      <ProjectForm
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        watch={watch}
        append={append}
        remove={remove}
        registerName="projectName"
        registerDate="projectDate"
        registerCover="projectCover"
        registerPriority="projectPriority"
        registerTag="projectTags"
        handleCloseForm={clearFields}
        showTagOptionList={showTagOptionList}
        setShowTagOptionList={setShowTagOptionList}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        loading={loading}
        nameTitle="Nome do Projeto"
        deadlineTitle="Data Limite"
        coverTitle="Capa"
        priorityTitle="Prioridade"
        tagTitle="Tags"
      />
    </div>
  )
}

export default CreateProjectForm
