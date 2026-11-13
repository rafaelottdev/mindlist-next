"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { FiTrash } from "react-icons/fi"
import { LuClipboardPen } from "react-icons/lu"
import {
  RiSignalCellular1Fill,
  RiSignalCellular2Fill,
  RiSignalCellular3Fill,
} from "react-icons/ri"
import CreateTaskForm from "@/components/CreateTaskForm/CreateTaskForm"
import ButtonLoading from "@/components/loadings/ButtonLoading/ButtonLoading"
import { useConfirm } from "@/contexts/ConfirmAlert/ConfirmAlert"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { deleteList } from "@/lib/actions/deleteList"
import { getTasks } from "@/lib/actions/getTasks"
import type { ListType } from "@/types/ListType"
import type { taskType } from "@/types/taskType"
import styles from "./ListCard.module.sass"
import ListEditForm from "./ListEditForm/ListEditForm"
import TaskCard from "./TaskCard/TaskCard"

function ListCard({ list }: { list: ListType }) {
  const router = useRouter()
  const { notify } = useNotify()
  const { confirm } = useConfirm()
  const [editMode, setEditMode] = useState<boolean>(false)
  const [createTaskMode, setCreateTaskMode] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [taskList, setTaskList] = useState<taskType[] | null>(null)

  async function handleDeleteList() {
    const approve = await confirm("Deseja excluir a lista")

    try {
      if (approve) {
        setDeleteLoading(true)

        const result = await deleteList(list.id)

        if (result.error && result.message) {
          throw new Error(result.message)
        } else {
          notify(result.message)

          router.refresh()
        }
      }
    } catch (error) {
      console.log(error)
      setDeleteLoading(false)
      notify(error instanceof Error ? error.message : String(error))
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleTaskList = useCallback(async () => {
    const result = await getTasks(list.id)

    if (result.error) {
      notify("Erro ao pegar as tarefas")
    }

    const taskList = result?.response

    setTaskList(taskList)
  }, [list.id, notify])

  useEffect(() => {
    handleTaskList()
  }, [handleTaskList])

  return (
    <>
      {editMode ? (
        <ListEditForm list={list} setEditMode={setEditMode} />
      ) : (
        <div className={styles["list-card"]}>
          <div className={styles["list-card__info-top"]}>
            <div className={styles["list-card__title-priority-container"]}>
              <h4>{list.title}</h4>

              {list.priority === "low" ? (
                <RiSignalCellular1Fill />
              ) : list.priority === "medium" ? (
                <RiSignalCellular2Fill />
              ) : list.priority === "high" ? (
                <RiSignalCellular3Fill />
              ) : (
                ""
              )}
            </div>

            <p className={styles["list-card__task-count"]}>0</p>
          </div>

          <div className={styles["list-card__task-container"]}>
            <ul className={styles["list-card__task-list"]}>
              {taskList?.map((task) => (
                <li key={task.id}>
                  <TaskCard task={task} />
                </li>
              ))}
            </ul>

            {createTaskMode ? (
              <CreateTaskForm
                listId={list.id}
                setCreateTaskMode={setCreateTaskMode}
                onCreated={handleTaskList}
              />
            ) : (
              <button
                type="button"
                className={styles["list-card__add-task-button"]}
                onClick={() => setCreateTaskMode(true)}
              >
                <FaPlus />

                <p>Adicionar Tarefa</p>
              </button>
            )}
          </div>

          <div className={styles["list-card__info-bottom"]}>
            <div className={styles["list-card__progress-task-bar"]}>
              <div></div>
            </div>

            <div className={styles["list-card__edit-container"]}>
              <button type="button" onClick={handleDeleteList}>
                {deleteLoading ? <ButtonLoading /> : <FiTrash />}
              </button>

              <button type="button" onClick={() => setEditMode(true)}>
                <LuClipboardPen />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ListCard
