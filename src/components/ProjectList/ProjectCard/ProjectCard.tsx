import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaCheck, FaRegCircle, FaRegClock } from "react-icons/fa6"
import { FiTrash } from "react-icons/fi"
import { LuClipboardPen } from "react-icons/lu"
import { PiStarBold, PiStarFill } from "react-icons/pi"
import {
  RiSignalCellular1Fill,
  RiSignalCellular2Fill,
  RiSignalCellular3Fill,
} from "react-icons/ri"
import { useConfirm } from "@/contexts/ConfirmAlert/ConfirmAlert"
import { deleteProject } from "@/lib/actions/deleteProject"
import { updateFavorite } from "@/lib/actions/updateFavorite"
import type { ProjectListType } from "@/types/ProjectListType"
import styles from "./ProjectCard.module.sass"
import ProjectEditForm from "./ProjectEditForm/ProjectEditForm"

type ProjectCardProps = {
  project: ProjectListType | Record<string, any>
}

function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
  const { confirm } = useConfirm()
  const [favorite, setFavorite] = useState<boolean>(project.favorite)
  const [editMode, setEditMode] = useState<boolean>(false)

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
    <>
      {editMode ? (
        <ProjectEditForm project={project} setEditMode={setEditMode} />
      ) : (
        <Link
          href={`/project/${project.id}`}
          className={styles["project-card__link"]}
        >
          <div className={styles["project-card__background-container"]}>
            <Image
              src="/img/home/project-background.png"
              alt="capa do projeto"
              width={280}
              height={370}
            />
          </div>

          <div className={styles["project-card__content-container"]}>
            <div className={styles["project-card__cover-container"]}>
              <div className={styles["project-card__cover-image-container"]}>
                <Image
                  src={
                    project.image_url
                      ? project.image_url
                      : "/img/home/project-cover-1.png"
                  }
                  alt="imagem do projeto"
                  width={280}
                  height={160}
                />
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
                    onClick={(e) => {
                      e.preventDefault()
                      updateFavorite(
                        project.favorite,
                        project.id,
                        project.user_id,
                      )
                      setFavorite((prev) => !prev)
                      router.refresh()
                    }}
                  >
                    {favorite ? <PiStarFill /> : <PiStarBold />}
                  </button>
                </li>

                <li className={styles["project-card__option-items"]}>
                  <button
                    type="button"
                    className={`
                      ${styles["project-card__option-button"]}
                      ${styles["project-card__delete-button"]}
                    `}
                    onClick={async (e) => {
                      e.preventDefault()
                      const approve = await confirm("Deseja excluir o projeto")

                      if (approve) {
                        deleteProject(project.id, project.image_url)
                        router.refresh()
                      }
                    }}
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
                    onClick={(e) => {
                      e.preventDefault()
                      setEditMode((prev) => !prev)
                    }}
                  >
                    <LuClipboardPen />
                  </button>
                </li>
              </ul>
            </div>

            <div className={styles["project-card__project-info-container"]}>
              <div className={styles["project-card__project-info-top"]}>
                <h3 className={styles["project-card__name"]}>{project.name}</h3>

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
                </ul>

                <div
                  className={styles["project-card__completed-task-container"]}
                >
                  {/* Qtde tarefas concluidas */}
                  <div className={styles["project-card__completed-task-bar"]}>
                    <div></div>
                  </div>

                  <p className={styles["project-card__completed-task-text"]}>
                    {} de {} Listas Concluidas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

export default ProjectCard
