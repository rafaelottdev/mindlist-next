import type { UseFormSetFocus } from "react-hook-form"
import { HiLogout } from "react-icons/hi"
import type { FormCreateListType } from "@/types/FormCreateListType"
import styles from "./CreateListCover.module.sass"

interface CreateListCoverProps {
  showForm: boolean
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  setFocus: UseFormSetFocus<FormCreateListType>
}

function CreateListCover({
  showForm,
  setShowForm,
  setFocus,
}: CreateListCoverProps) {
  return (
    <div
      className={`
        ${styles["create-list-cover"]}
        ${showForm && styles["form-cover--hide"]}
      `}
    >
      <button
        type="button"
        className={styles["create-list-cover__button"]}
        onClick={() => {
          setShowForm(true)
          setFocus("listName")
        }}
      >
        <span></span>

        <p>Add Lista</p>

        <HiLogout />
      </button>
    </div>
  )
}

export default CreateListCover
