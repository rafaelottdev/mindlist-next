"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { createProject } from "@/lib/actions/createProject"
import { formCreateProjectSchema } from "@/lib/schemas/formCreateProjectSchema"
import type { FormCreateProjectType } from "@/types/FormCreateProjectType"
import type { TagType } from "@/types/TagType"
import CoverInput from "../CoverInput/CoverInput"
import Input from "../Input/Input"
import ButtonLoading from "../loadings/ButtonLoading/ButtonLoading"
import PriorityInput from "../PriorityInput/PriorityInput"
import Tags from "../Tags/Tags"
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
        router.refresh()
        notify(result.message)
        setShowTagOptionList(false)
        clearFields()
        setShowForm(false)
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
      <FormCover showForm={showForm} setShowForm={setShowForm} />

      <form
        className={styles["form-container__form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles["form-container__name-date-container"]}>
          <div>
            <Input
              inputId="projectName"
              labelTitle="Nome do Projeto"
              inputType="text"
              registerName="projectName"
              register={register}
            />

            {errors.projectName && (
              <p className={styles["input-error"]}>
                {errors.projectName.message}
              </p>
            )}
          </div>

          <div>
            <Input
              inputId="projectDeadline"
              labelTitle="Data Limite"
              inputType="date"
              registerName="projectDate"
              register={register}
            />

            {errors.projectDate && (
              <p className={styles["input-error"]}>
                {errors.projectDate.message}
              </p>
            )}
          </div>
        </div>

        <CoverInput
          registerName="projectCover"
          title="Capa"
          register={register}
          watch={watch}
          errors={errors.projectCover}
        />

        <PriorityInput
          registerName="projectPriority"
          title="Prioridade"
          register={register}
          errors={errors.projectPriority}
        />

        <Tags
          showTagOptionList={showTagOptionList}
          setShowTagOptionList={setShowTagOptionList}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          title="Tags"
          append={append}
          remove={remove}
          errors={errors.projectTags}
        />

        <div className={styles["form-container__form-button-container"]}>
          <button
            type="submit"
            className={styles["form-container__send-button"]}
          >
            {loading ? <ButtonLoading /> : <p>Criar Projeto</p>}
          </button>

          <button
            type="button"
            className={styles["form-container__clear-button"]}
            onClick={() => clearFields()}
          >
            <FaXmark />
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProjectForm
