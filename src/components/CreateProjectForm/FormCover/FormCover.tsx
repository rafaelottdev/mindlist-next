import Image from "next/image"
import { HiLogout } from "react-icons/hi"
import styles from "./FormCover.module.sass"

interface FormCoverProps {
  showForm: boolean
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

function FormCover({ showForm, setShowForm }: FormCoverProps) {
  return (
    <div
      className={`
        ${styles["form-cover"]}
        ${showForm && styles["form-cover--hide"]}
      `}
    >
      <Image
        src="/img/home/project-cover.png"
        alt=""
        width={280}
        height={380}
        loading="eager"
        className={styles["form-cover__image"]}
      />

      <button
        type="button"
        className={`
          ${styles["form-cover__add-button"]}
          ${showForm && styles["form-cover__add-button--hide"]}
        `}
        onClick={() => setShowForm(true)}
      >
        Adicionar Projeto
        <HiLogout />
      </button>
    </div>
  )
}

export default FormCover
