"use client"

import type {
  FieldArrayPathByValue,
  FieldErrors,
  FieldValues,
  Path,
  SubmitHandler,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form"
import { get } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import type { TagType } from "@/types/TagType"
import CoverInput from "../CoverInput/CoverInput"
import Input from "../Input/Input"
import ButtonLoading from "../loadings/ButtonLoading/ButtonLoading"
import PriorityInput from "../PriorityInput/PriorityInput"
import Tags from "../Tags/Tags"
import styles from "./ProjectForm.module.sass"

interface ProjectFormProps<
  T extends FieldValues,
  TFieldArrayName extends FieldArrayPathByValue<T, TagType[]>,
> {
  handleSubmit: UseFormHandleSubmit<T>
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  onSubmit: SubmitHandler<T>
  watch: UseFormWatch<T>
  append: UseFieldArrayAppend<T, TFieldArrayName>
  remove: UseFieldArrayRemove
  registerName: Path<T>
  registerDate: Path<T>
  registerCover: Path<T>
  registerPriority: Path<T>
  registerTag: TFieldArrayName
  handleCloseForm: () => void
  showTagOptionList: boolean
  setShowTagOptionList: React.Dispatch<React.SetStateAction<boolean>>
  selectedTags: TagType[]
  setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>
  loading: boolean
  nameTitle: string
  deadlineTitle: string
  coverTitle: string
  priorityTitle: string
  tagTitle: string
  sendBtnText: string
}

function ProjectForm<
  T extends FieldValues,
  TFieldArrayName extends FieldArrayPathByValue<T, TagType[]>,
>({
  handleSubmit,
  register,
  errors,
  onSubmit,
  watch,
  append,
  remove,
  registerName,
  registerDate,
  registerCover,
  registerPriority,
  registerTag,
  handleCloseForm,
  showTagOptionList,
  setShowTagOptionList,
  selectedTags,
  setSelectedTags,
  loading,
  nameTitle,
  deadlineTitle,
  coverTitle,
  priorityTitle,
  tagTitle,
  sendBtnText,
}: ProjectFormProps<T, TFieldArrayName>) {
  return (
    <form className={styles["project-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["project-form__name-date-container"]}>
        <div>
          <Input
            inputId="projectName"
            labelTitle={nameTitle}
            inputType="text"
            registerName={registerName}
            register={register}
          />

          {get(errors, registerName)?.message && (
            <p className={styles["input-error"]}>
              {String(get(errors, registerName).message)}
            </p>
          )}
        </div>

        <div>
          <Input
            inputId="projectDeadline"
            labelTitle={deadlineTitle}
            inputType="date"
            registerName={registerDate}
            register={register}
          />

          {get(errors, registerDate)?.message && (
            <p className={styles["input-error"]}>
              {String(get(errors, registerDate).message)}
            </p>
          )}
        </div>
      </div>

      <CoverInput
        registerName={registerCover}
        title={coverTitle}
        register={register}
        watch={watch}
        errors={get(errors, registerCover)}
      />

      <PriorityInput
        registerName={registerPriority}
        title={priorityTitle}
        register={register}
        errors={get(errors, registerPriority)}
      />

      <Tags
        showTagOptionList={showTagOptionList}
        setShowTagOptionList={setShowTagOptionList}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        title={tagTitle}
        append={append}
        remove={remove}
        errors={get(errors, registerTag)?.message}
      />

      <div className={styles["project-form__form-button-container"]}>
        <button type="submit" className={styles["project-form__send-button"]}>
          {loading ? <ButtonLoading /> : <p>{sendBtnText}</p>}
        </button>

        <button
          type="button"
          className={styles["project-form__clear-button"]}
          onClick={() => handleCloseForm()}
        >
          <FaXmark />
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
