"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import ProjectForm from "@/components/ProjectForm/ProjectForm"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { updateProject } from "@/lib/actions/updateProject"
import { formEditProjectSchema } from "@/lib/schemas/formEditProjectSchema"
import type { FormEditProjectType } from "@/types/FormEditProjectType"
import type { ProjectListType } from "@/types/ProjectListType"
import type { TagType } from "@/types/TagType"

type ProjectEditFormProps = {
  project: ProjectListType
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

function ProjectEditForm({ project, setEditMode }: ProjectEditFormProps) {
  const router = useRouter()
  const { notify } = useNotify()
  const [showTagOptionList, setShowTagOptionList] = useState<boolean>(false)
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm<FormEditProjectType>({
    resolver: zodResolver(formEditProjectSchema),
    defaultValues: {
      editProjectTags: [],
    },
  })

  const { append, remove } = useFieldArray({
    control,
    name: "editProjectTags",
  })

  async function onSubmit(projectData: FormEditProjectType) {
    try {
      setLoading(true)

      const newName = projectData.editProjectName
      const newDeadline = projectData.editProjectDate
      const newImageFile = projectData.editProjectCover?.item(0)
      const newPriority = projectData.editProjectPriority
      const newtagList = projectData.editProjectTags

      const formData = new FormData()

      if (
        newName ||
        newDeadline ||
        newImageFile ||
        newPriority ||
        newtagList.length > 0
      ) {
        if (newName) {
          formData.append("newName", newName)
        }

        if (newDeadline) {
          formData.append("newDeadline", newDeadline)
        }

        if (newImageFile) {
          formData.append("newImageFile", newImageFile)
        }

        if (newPriority) {
          formData.append("newPriority", newPriority)
        }

        if (newtagList.length > 0) {
          newtagList.map((tag) => formData.append("newTagList", tag.name))
        }

        const result = await updateProject(formData, project)

        if (result?.error && result?.message) {
          throw new Error(result?.message)
        } else {
          router.refresh()
          notify(result.message)
          setEditMode(false)
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      notify(error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setFocus("editProjectName")
  }, [setFocus])

  function closeForm() {
    setEditMode(false)
  }

  return (
    <ProjectForm
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      onSubmit={onSubmit}
      watch={watch}
      append={append}
      remove={remove}
      registerName="editProjectName"
      registerDate="editProjectDate"
      registerCover="editProjectCover"
      registerPriority="editProjectPriority"
      registerTag="editProjectTags"
      handleCloseForm={closeForm}
      showTagOptionList={showTagOptionList}
      setShowTagOptionList={setShowTagOptionList}
      selectedTags={selectedTags}
      setSelectedTags={setSelectedTags}
      loading={loading}
      nameTitle="Editar Nome"
      deadlineTitle="Editar Data"
      coverTitle="Nova Capa"
      priorityTitle="Editar Prioridade"
      tagTitle="Editar Tags"
      sendBtnText="Editar Projeto"
    />
  )
}

export default ProjectEditForm
