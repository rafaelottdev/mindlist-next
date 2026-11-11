"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { FiTrash } from "react-icons/fi"
import { LuClipboardPen } from "react-icons/lu"
import {
  RiSignalCellular1Fill,
  RiSignalCellular2Fill,
  RiSignalCellular3Fill,
} from "react-icons/ri"
import { useConfirm } from "@/contexts/ConfirmAlert/ConfirmAlert"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { deleteList } from "@/lib/actions/deleteList"
import type { ListType } from "@/types/ListType"
import styles from "./ListCard.module.sass"
import ListEditForm from "./ListEditForm/ListEditForm"

function ListCard({ list }: { list: ListType }) {
  const router = useRouter()
  const { notify } = useNotify()
  const { confirm } = useConfirm()
  const [editMode, setEditMode] = useState<boolean>(false)

  async function handleDeleteList() {
    const approve = await confirm("Deseja excluir a lista")

    try {
      if (approve) {
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
      notify(error instanceof Error ? error.message : String(error))
    }
  }

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
            <ul className={styles["list-card__task-list"]}></ul>

            <button
              type="button"
              className={styles["list-card__add-task-button"]}
            >
              <FaPlus />

              <p>Adicionar Tarefa</p>
            </button>
          </div>

          <div className={styles["list-card__info-bottom"]}>
            <div className={styles["list-card__progress-task-bar"]}>
              <div></div>
            </div>

            <div className={styles["list-card__edit-container"]}>
              <button type="button" onClick={handleDeleteList}>
                <FiTrash />
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
