import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import CoverInput from "@/components/CoverInput/CoverInput"
import Input from "@/components/Input/Input"
import PriorityInput from "@/components/PriorityInput/PriorityInput"
import Tags from "@/components/Tags/Tags"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { updateProject } from "@/lib/actions/updateProject"
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

      if (newtagList) {
        newtagList.map((tag) => formData.append("newTagList", tag.name))
      }

      const result = await updateProject(formData, project)

      if (result?.error) {
        console.log(result.error)
      } else {
        router.refresh()
        setEditMode(false)
      }
    } catch (error) {
      console.log(error)
      notify("Erro ao tentar atualizar o projeto")
    } finally {
      setLoading(false)
    }
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
