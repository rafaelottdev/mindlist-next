"use client"

import Image from "next/image"
import Link from "next/link"
import { FaCheck, FaRegCircle, FaRegClock, FaXmark } from "react-icons/fa6"
import { FiTrash } from "react-icons/fi"
import { LuClipboardPen } from "react-icons/lu"
import { PiStarBold } from "react-icons/pi" // PiStarFill
import {
  RiSignalCellular1Fill,
  RiSignalCellular2Fill,
  RiSignalCellular3Fill,
} from "react-icons/ri"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { updateProjectStatus } from "@/lib/actions/updateProjectStatus"
import type { ProjectListType } from "@/types/ProjectListType"
import styles from "./ProjectList.module.sass"

interface ProjectListProps {
  error: boolean
  message: string
  response: ProjectListType[] | null | Record<string, any>[]
}

function ProjectList({
  projectResponse,
}: {
  projectResponse: ProjectListProps
}) {
  const { notify } = useNotify()
  const projectList =
    !projectResponse.error && projectResponse.response
      ? projectResponse.response
      : []

  if (projectResponse.error) {
    notify(projectResponse.message)
  }

  return (
    <ul style={{ display: "flex", gap: "18px" }}>
      {projectList.map((project: ProjectListType | Record<string, any>) => {
        const newDeadline = project.deadline
          .toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
          .replace(/\s+de\s+/g, " ")
        const newTagList = project.tags.map((tag: string, id: number) => {
          return { id, name: tag }
        })

        return (
          <li key={project.id} className={styles["project-card"]}>
            <Link
              href={`/project/${project.id}`}
              className={styles["project-card__link"]}
            >
              <div className={styles["project-card__background-container"]}>
                <Image
                  src="/img/home/project-background-1.png"
                  alt="capa do projeto"
                  width={280}
                  height={370}
                />
              </div>

              <div className={styles["project-card__content-container"]}>
                <div className={styles["project-card__cover-container"]}>
                  <div
                    className={styles["project-card__cover-image-container"]}
                  >
                    {project.image_url && (
                      <Image
                        src={project.image_url}
                        alt="imagem do projeto"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>

                  <ul className={styles["project-card__project-list-options"]}>
                    <li
                      className={`
                        ${styles["project-card__option-items"]}
                        ${styles["project-card__priority"]}
                      `}
                    >
                      {project.priority === "low" ? (
                        <RiSignalCellular1Fill />
                      ) : project.priority === "medium" ? (
                        <RiSignalCellular2Fill />
                      ) : project.priority === "high" ? (
                        <RiSignalCellular3Fill />
                      ) : (
                        ""
                      )}
                    </li>

                    <li className={styles["project-card__option-items"]}>
                      <button
                        type="button"
                        className={`
                          ${styles["project-card__option-button"]}
                          ${styles["project-card__favorite-button"]}
                        `}
                      >
                        <PiStarBold />
                      </button>
                    </li>

                    <li className={styles["project-card__option-items"]}>
                      <button
                        type="button"
                        className={`
                          ${styles["project-card__option-button"]}
                          ${styles["project-card__delete-button"]}
                        `}
                      >
                        <FiTrash />
                      </button>
                    </li>

                    <li className={styles["project-card__option-items"]}>
                      <button
                        type="button"
                        className={`
                          ${styles["project-card__option-button"]}
                          ${styles["project-card__edit-button"]}
                        `}
                      >
                        <LuClipboardPen />
                      </button>
                    </li>
                  </ul>
                </div>

                <div className={styles["project-card__project-info-container"]}>
                  <div className={styles["project-card__project-info-top"]}>
                    <h3 className={styles["project-card__name"]}>
                      {project.name}
                    </h3>

                    <div className={styles["project-card__deadline"]}>
                      <FaRegClock />

                      <p>{newDeadline}</p>
                    </div>

                    <div className={styles["project-card__tag-container"]}>
                      <ul className={styles["project-card__tag-list"]}>
                        {newTagList.map((tag: { id: number; name: string }) => (
                          <li key={tag.id}>{tag.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles["project-card__project-info-bottom"]}>
                    <ul className={styles["project-card__status-list"]}>
                      <li
                        className={`
                          ${styles["project-card__status"]}
                          ${project.status === "pending" ? styles["project-card__status--current"] : ""}
                        `}
                      >
                        <FaRegCircle />
                      </li>

                      <li
                        className={`
                          ${styles["project-card__status"]}
                          ${project.status === "completed" ? styles["project-card__status--current"] : ""}
                        `}
                      >
                        <FaCheck />
                      </li>

                      <li>
                        <button
                          type="button"
                          className={`
                            ${styles["project-card__status"]}
                            ${project.status === "canceled" ? styles["project-card__status--current"] : ""}
                          `}
                          onClick={(e) => {
                            e.preventDefault()
                            updateProjectStatus()
                          }}
                        >
                          <FaXmark />
                        </button>
                      </li>
                    </ul>

                    <div
                      className={
                        styles["project-card__completed-task-container"]
                      }
                    >
                      {/* Qtde tarefas concluidas */}
                      <div
                        className={styles["project-card__completed-task-bar"]}
                      >
                        <div></div>
                      </div>

                      <p
                        className={styles["project-card__completed-task-text"]}
                      >
                        {} de {} Tarefas Concluidas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default ProjectList
