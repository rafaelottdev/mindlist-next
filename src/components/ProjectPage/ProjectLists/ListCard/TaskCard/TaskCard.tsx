import { useState } from "react"
import { FiTrash } from "react-icons/fi"
import { LuClipboardPen } from "react-icons/lu"
import type { taskType } from "@/types/taskType"
import styles from "./TaskCard.module.sass"

interface TaskCardProps {
  task: taskType
}

function TaskCard({ task }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div className={styles["task-card"]}>
      <div className={styles["task-card__title-container"]}>
        <button
          type="button"
          className={styles["task-card__check-button"]}
        ></button>

        <p className={styles["task-card__title"]}>{task.title}</p>
      </div>

      <button
        type="button"
        className={styles["task-card__toggle-menu"]}
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <div></div>
        <div></div>
        <div></div>
      </button>

      <div
        className={`
          ${styles["task-card__menu-container"]}
          ${showMenu && styles["task-card__menu-container--display"]}
          `}
      >
        <button type="button" className={styles["task-card__edit-button"]}>
          <LuClipboardPen />
        </button>

        <button type="button" className={styles["task-card__delete-button"]}>
          <FiTrash />
        </button>
      </div>
    </div>
  )
}

export default TaskCard
