"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import { formCreateProjectSchema } from "@/lib/schemas/formCreateProjectSchema"
import type { formCreateProjectType } from "@/types/FormCreateProjectType"
import type { TagType } from "@/types/TagType"
import styles from "./CreateProjectForm.module.sass"
import FormCover from "./FormCover/FormCover"
import Input from "./Input/Input"
import Tags from "./Tags/Tags"

function CreateProjectForm() {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const { control, register, handleSubmit } = useForm<formCreateProjectType>({
    resolver: zodResolver(formCreateProjectSchema),
    defaultValues: {
      projectTags: [],
    },
  })
  const { append } = useFieldArray({
    control,
    name: "projectTags",
  })

  function onSubmit(data: formCreateProjectType) {
    console.log(data.projectCover)
  }

  return (
    <div className={styles["form-container"]}>
      <FormCover showForm={showForm} setShowForm={setShowForm} />

      <form
        className={styles["form-container__form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles["form-container__name-date-container"]}>
          <Input
            inputId="projectName"
            labelTitle="Nome do Projeto"
            inputType="text"
            registerName="projectName"
            register={register}
          />

          <Input
            inputId="projectDeadline"
            labelTitle="Data Limite"
            inputType="date"
            registerName="projectDate"
            register={register}
          />
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

            <div>Selecionar Imagem</div>
          </label>

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
        </fieldset>

        <Tags
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          append={append}
        />

        <div className={styles["form-container__form-button-container"]}>
          <button
            type="submit"
            className={styles["form-container__send-button"]}
          >
            Criar Projeto
          </button>

          <button
            type="button"
            className={styles["form-container__clear-button"]}
            onClick={() => setShowForm(false)}
          >
            <FaXmark />
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProjectForm
