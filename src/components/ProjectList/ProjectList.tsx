"use client"

import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import type { ProjectListType } from "@/types/ProjectListType"
import ProjectCard from "./ProjectCard/ProjectCard"
import styles from "./ProjectList.module.sass"

interface ProjectListProps {
  error: boolean
  message: string
  response: ProjectListType[] | null
}

function ProjectList({
  projectResponse,
}: {
  projectResponse: ProjectListProps
}) {
  const { notify } = useNotify()

  const projectList =
    !projectResponse.error && projectResponse.response
      ? projectResponse.response.slice(0, 2)
      : []

  if (projectResponse.error) {
    notify(projectResponse.message)
  }

  return (
    <ul className={styles["project-list"]}>
      {projectList.map((project: ProjectListType) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}

export default ProjectList
