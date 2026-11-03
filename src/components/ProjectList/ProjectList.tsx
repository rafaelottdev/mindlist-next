"use client"

import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import type { ProjectListType } from "@/types/ProjectListType"

import ProjectCard from "./ProjectCard/ProjectCard"

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
      {projectList.map((project: ProjectListType | Record<string, any>) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ul>
  )
}

export default ProjectList
