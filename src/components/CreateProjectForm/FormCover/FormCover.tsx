import Image from "next/image"
import type { UseFormSetFocus } from "react-hook-form"
import { HiLogout } from "react-icons/hi"
import type { FormCreateProjectType } from "@/types/FormCreateProjectType"
import styles from "./FormCover.module.sass"

interface FormCoverProps {
  showForm: boolean
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  setFocus: UseFormSetFocus<FormCreateProjectType>
}

function FormCover({ showForm, setShowForm, setFocus }: FormCoverProps) {
  return (
    <div
      className={`
        ${styles["form-cover"]}
        ${showForm && styles["form-cover--hide"]}
      `}
    >
      <Image
        src="/img/home/create-project-cover.png"
        alt=""
        width={280}
        height={370}
        loading="eager"
        className={styles["form-cover__image"]}
      />

      <button
        type="button"
        className={`
          ${styles["form-cover__add-button"]}
          ${showForm && styles["form-cover__add-button--hide"]}
        `}
        onClick={() => {
          setShowForm(true)
          setFocus("projectName")
        }}
      >
        <span className={styles["form-cover__button-background"]}></span>

        <p>Adicionar Projeto</p>

        <HiLogout />
      </button>
    </div>
  )
}

export default FormCover
