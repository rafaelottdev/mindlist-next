import { useState } from "react"
import { FaCheck } from "react-icons/fa6"
import { FiTrash } from "react-icons/fi"
import { LuClipboardPen } from "react-icons/lu"
import ButtonLoading from "@/components/loadings/ButtonLoading/ButtonLoading"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { deleteTask } from "@/lib/actions/deleteTask"
import { updateTaskStatus } from "@/lib/actions/updateTaskStatus"
import { handleCompletedTask } from "@/lib/utils/handleCompletedTask"
import type { ListType } from "@/types/ListType"
import type { taskType } from "@/types/taskType"
import styles from "./TaskCard.module.sass"
import TaskEditForm from "./TaskEditForm/TaskEditForm"

interface TaskCardProps {
  task: taskType
  listId: number
  lists: ListType[]
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>
  onUpdate: () => void
  setCreateTaskMode: React.Dispatch<React.SetStateAction<boolean>>
  setCloseEditTask: React.Dispatch<React.SetStateAction<boolean>>
  closeEditTask: boolean
  setTaskListQty: React.Dispatch<React.SetStateAction<number>>
  setCompletedTaskQty: React.Dispatch<React.SetStateAction<number>>
  projectId: number
}

function TaskCard({
  task,
  listId,
  lists,
  setLists,
  onUpdate,
  setCreateTaskMode,
  setCloseEditTask,
  closeEditTask,
  setTaskListQty,
  setCompletedTaskQty,
  projectId,
}: TaskCardProps) {
  const { notify } = useNotify()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [completed, setCompleted] = useState<boolean>(
    task.status === "completed",
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [showEditForm, setShowEditForm] = useState<boolean>(false)

  async function handleStatus() {
    try {
      const result = await updateTaskStatus(completed, task.id, listId)

      if (result.error && result.message) {
        throw new Error(result.message)
      }

      setCompleted((prev) => !prev)
      await handleCompletedTask(
        listId,
        projectId,
        setTaskListQty,
        setCompletedTaskQty,
        lists,
        setLists,
      )
    } catch (error) {
      notify(error instanceof Error ? error.message : String(error))
    }
  }

  async function handleDeleteTask() {
    try {
      setLoading(true)
      const result = await deleteTask(task.id, listId)

      if (result.error && result.message) {
        throw new Error(result.message)
      }

      onUpdate()
      await handleCompletedTask(
        listId,
        projectId,
        setTaskListQty,
        setCompletedTaskQty,
        lists,
        setLists,
      )
    } catch (error) {
      console.log(error)
      notify(error instanceof Error ? error.message : String(error))
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {showEditForm && closeEditTask ? (
        <TaskEditForm
          task={task}
          listId={listId}
          setShowEditForm={setShowEditForm}
          setShowMenu={setShowMenu}
          onUpdate={onUpdate}
        />
      ) : (
        <div className={styles["task-card"]}>
          <button
            type="button"
            className={styles["task-card__check-action"]}
            onClick={handleStatus}
          >
            <div className={styles["task-card__title-container"]}>
              <div
                className={`
                  ${styles["task-card__check-button"]}
                  ${completed && styles["task-card__check-button--checked"]}  
                `}
              >
                {completed && <FaCheck />}
              </div>

              <p className={styles["task-card__title"]}>{task.title}</p>
            </div>
          </button>

          <button
            type="button"
            className={styles["task-card__toggle-menu"]}
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu((prev) => !prev)
            }}
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
            <button
              type="button"
              className={styles["task-card__edit-button"]}
              onClick={(e) => {
                e.stopPropagation()
                setShowEditForm(true)
                setCreateTaskMode(false)
                setCloseEditTask(true)
              }}
            >
              <LuClipboardPen />
            </button>

            <button
              type="button"
              className={styles["task-card__delete-button"]}
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteTask()
              }}
            >
              {loading ? <ButtonLoading /> : <FiTrash />}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default TaskCard
