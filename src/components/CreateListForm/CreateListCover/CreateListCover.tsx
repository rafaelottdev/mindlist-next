import { HiLogout } from "react-icons/hi"
import styles from "./CreateListCover.module.sass"

interface CreateListCoverProps {
  showForm: boolean
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateListCover({ showForm, setShowForm }: CreateListCoverProps) {
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
        onClick={() => setShowForm(true)}
      >
        <span></span>

        <p>Add Lista</p>

        <HiLogout />
      </button>
    </div>
  )
}

export default CreateListCover
