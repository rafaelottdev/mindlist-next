import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import CoverInput from "@/components/CoverInput/CoverInput"
import Input from "@/components/Input/Input"
import PriorityInput from "@/components/PriorityInput/PriorityInput"
import Tags from "@/components/Tags/Tags"
import { formEditProjectSchema } from "@/lib/schemas/formEditProjectSchema"
import type { FormEditProjectType } from "@/types/FormEditProjectType"
import type { ProjectListType } from "@/types/ProjectListType"
import type { TagType } from "@/types/TagType"
import styles from "./ProjectEditForm.module.sass"

type ProjectEditFormProps = {
  project: ProjectListType | Record<string, any>
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

function ProjectEditForm({ project, setEditMode }: ProjectEditFormProps) {
  const [showTagOptionList, setShowTagOptionList] = useState<boolean>(false)
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormEditProjectType>({
    resolver: zodResolver(formEditProjectSchema),
    defaultValues: {
      editProjectTags: [],
    },
  })

  const { append, replace, remove } = useFieldArray({
    control,
    name: "editProjectTags",
  })

  async function onSubmit(projectData: FormEditProjectType) {
    console.log(projectData)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["editProject-form"]}
    >
      <div className={styles["editProject-form__name-date-container"]}>
        <div>
          <Input
            inputId="editProjectName"
            labelTitle="Editar Nome"
            inputType="text"
            registerName="editProjectName"
            register={register}
          />
        </div>

        <div>
          <Input
            inputId="editProjectDate"
            labelTitle="Editar Data"
            inputType="date"
            registerName="editProjectDate"
            register={register}
          />
        </div>
      </div>

      <CoverInput
        registerName="editProjectCover"
        title="Nova Capa"
        register={register}
        watch={watch}
        errors={errors.editProjectCover}
      />

      <PriorityInput
        registerName="editProjectPriority"
        title="Editar Prioridade"
        register={register}
        errors={errors.editProjectPriority}
      />

      <Tags
        showTagOptionList={showTagOptionList}
        setShowTagOptionList={setShowTagOptionList}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        title="Editar Tags"
        append={append}
        remove={remove}
        errors={errors.editProjectTags}
      />

      <div className={styles["editProject-form__button-container"]}>
        <button
          type="submit"
          className={styles["editProject-form__send-button"]}
        >
          Editar Projeto
        </button>

        <button
          type="button"
          className={styles["editProject-form__clear-button"]}
          onClick={() => setEditMode(false)}
        >
          <FaXmark />
        </button>
      </div>
    </form>
  )
}

export default ProjectEditForm
