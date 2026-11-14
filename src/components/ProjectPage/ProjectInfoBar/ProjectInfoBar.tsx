"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaCheck, FaRegCircle, FaRegClock } from "react-icons/fa6"
import { PiStarBold, PiStarFill } from "react-icons/pi"
import {
  RiSignalCellular1Fill,
  RiSignalCellular2Fill,
  RiSignalCellular3Fill,
} from "react-icons/ri"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { updateFavorite } from "@/lib/actions/updateFavorite"
import type { ProjectListType } from "@/types/ProjectListType"
import styles from "./ProjectInfoBar.module.sass"

interface ProjectInfoBarProps {
  projectData: ProjectListType
  handleList: () => void
  listQtd: number
  completedListQtd: number
}

function ProjectInfoBar({
  projectData,
  handleList,
  listQtd,
  completedListQtd,
}: ProjectInfoBarProps) {
  const router = useRouter()
  const { notify } = useNotify()
  const [favorite, setFavorite] = useState<boolean>(projectData.favorite)

  const newDeadline = new Date(projectData.deadline)
    .toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/\s+de\s+/g, " ")
  const newTagList = projectData.tags.map((tag: string, id: number) => {
    return { id, name: tag }
  })

  async function handleFavorite() {
    try {
      const result = await updateFavorite(projectData.favorite, projectData.id)

      if (result.error && result.message) {
        throw new Error(result.message)
      } else {
        setFavorite((prev) => !prev)
        router.refresh()
        notify(result.message)
      }
    } catch (error) {
      console.log(error)
      notify(error instanceof Error ? error.message : String(error))
    }
  }

  useEffect(() => {
    handleList()
  }, [handleList])

  return (
    <div className={styles["project-bar"]}>
      <div className={styles["project-bar__title-priority-container"]}>
        <h3 className={styles["project-bar__title"]}>{projectData.name}</h3>

        <div className={styles["project-bar__priority"]}>
          {projectData.priority === "low" ? (
            <RiSignalCellular1Fill />
          ) : projectData.priority === "medium" ? (
            <RiSignalCellular2Fill />
          ) : projectData.priority === "high" ? (
            <RiSignalCellular3Fill />
          ) : (
            ""
          )}
        </div>
      </div>

      <div className={styles["project-bar__general-info"]}>
        <ul className={styles["project-bar__status-list"]}>
          <li
            className={`
              ${styles["project-bar__status"]}
              ${projectData.status === "pending" ? styles["project-card__status--current"] : ""}
            `}
          >
            <FaRegCircle />
          </li>

          <li
            className={`
              ${styles["project-bar__status"]}
              ${projectData.status === "completed" ? styles["project-card__status--current"] : ""}
            `}
          >
            <FaCheck />
          </li>
        </ul>

        <div className={styles["project-bar__deadline-container"]}>
          <FaRegClock className={styles["project-bar__deadline-icon"]} />

          <p className={styles["project-bar__deadline"]}>{newDeadline}</p>
        </div>

        <ul className={styles["project-bar__tag-list"]}>
          {newTagList.map((tag: { id: number; name: string }) => (
            <li key={tag.id} className={styles["project-bar__tag-item"]}>
              {tag.name}
            </li>
          ))}
        </ul>

        <div className={styles["project-bar__task-bar-container"]}>
          <div className={styles["project-bar__task-bar"]}>
            <div
              style={{
                width: `${completedListQtd === 0 && listQtd === 0 ? 0 : (completedListQtd / listQtd) * 100}%`,
              }}
            ></div>
          </div>

          <p className={styles["project-bar__task-text"]}>
            {completedListQtd} de {listQtd}
          </p>
        </div>
      </div>

      <div className={styles["project-bar__favorite-container"]}>
        <button
          type="button"
          className={` ${styles["project-bar__favorite-button"]}`}
          onClick={handleFavorite}
        >
          {favorite ? <PiStarFill /> : <PiStarBold />}
        </button>
      </div>
    </div>
  )
}

export default ProjectInfoBar
