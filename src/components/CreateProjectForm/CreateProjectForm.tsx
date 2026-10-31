"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { createProject } from "@/lib/actions/createProject"
import { formCreateProjectSchema } from "@/lib/schemas/formCreateProjectSchema"
import type { formCreateProjectType } from "@/types/FormCreateProjectType"
import type { TagType } from "@/types/TagType"
import ButtonLoading from "../loadings/ButtonLoading/ButtonLoading"
import styles from "./CreateProjectForm.module.sass"
import FormCover from "./FormCover/FormCover"
import Input from "./Input/Input"
import Tags from "./Tags/Tags"

function CreateProjectForm() {
  const { notify } = useNotify()
  const [showForm, setShowForm] = useState<boolean>(false)
  const [showTagOptionList, setShowTagOptionList] = useState<boolean>(false)
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | null>(null)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<formCreateProjectType>({
    resolver: zodResolver(formCreateProjectSchema),
    defaultValues: {
      projectTags: [],
    },
  })
  const { append, replace } = useFieldArray({
    control,
    name: "projectTags",
  })

  const fileList = watch("projectCover")

  useEffect(() => {
    const file = fileList?.[0]

    if (!file) {
      setPreview(null)
      return
    }

    const url = URL.createObjectURL(file)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [fileList])

  async function onSubmit(projectData: formCreateProjectType) {
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
        notify(result.message)
        setShowTagOptionList(false)
        clearFields()
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      notify("Algo de errado ao tentar criar um projeto")
    } finally {
      setLoading(false)
    }
  }

  function clearFields() {
    reset()
    setSelectedTags([])
    replace([])
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

        <div className={styles["form-container__cover-container"]}>
          <label
            htmlFor="projectCover"
            className={`
              ${styles["form-container__input-container"]}
              ${styles["form-container__cover-label"]}
            `}
          >
            <p>Capa</p>

            <div className={styles["form-container__cover"]}>
              <div>
                {preview && (
                  <Image
                    src={preview}
                    alt="Capa do projeto"
                    width={100}
                    height={100}
                  />
                )}
              </div>

              <p
                className={`
                  ${styles["form-container__cover-legend"]}
                  ${preview && styles["form-container__cover-legend--color"]}
                `}
              >
                Selecionar Imagem
              </p>
            </div>
          </label>

          {errors.projectCover && (
            <p className={styles["input-error"]}>
              {errors.projectCover.message}
            </p>
          )}

          <input
            type="file"
            id="projectCover"
            accept="image/*"
            {...register("projectCover")}
          />
        </div>

        <fieldset
          className={`
            ${styles["form-container__input-container"]}
            ${styles["form-container__priority-container"]}
          `}
        >
          <legend>Prioridade</legend>

          <div className={styles["form-container__input-list-option"]}>
            <div className={styles["form-container__option"]}>
              <input
                type="radio"
                id="lowPriority"
                value="low"
                {...register("projectPriority")}
              />

              <label htmlFor="lowPriority">Baixa</label>
            </div>

            <div className={styles["form-container__option"]}>
              <input
                type="radio"
                id="mediumPriority"
                value="medium"
                {...register("projectPriority")}
              />

              <label htmlFor="mediumPriority">Média</label>
            </div>

            <div className={styles["form-container__option"]}>
              <input
                type="radio"
                id="highPriority"
                value="high"
                {...register("projectPriority")}
              />

              <label htmlFor="highPriority">Alta</label>
            </div>
          </div>

          {errors.projectPriority && (
            <p className={styles["input-error"]}>
              {errors.projectPriority.message}
            </p>
          )}
        </fieldset>

        <Tags
          showTagOptionList={showTagOptionList}
          setShowTagOptionList={setShowTagOptionList}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          append={append}
          error={errors.projectTags}
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
            onClick={() => {
              setShowForm(false)
              clearFields()
            }}
          >
            <FaXmark />
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProjectForm
