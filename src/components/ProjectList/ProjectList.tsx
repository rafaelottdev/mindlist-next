"use client"

import { useState } from "react"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import type { ProjectListType } from "@/types/ProjectListType"
import ProjectCard from "./ProjectCard/ProjectCard"
import ProjectEditForm from "./ProjectEditForm/ProjectEditForm"

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
  const [editMode, setEditMode] = useState<boolean>(false)

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
        <li key={project.id}>
          {editMode ? (
            <ProjectEditForm project={project} setEditMode={setEditMode} />
          ) : (
            <ProjectCard project={project} setEditMode={setEditMode} />
          )}
        </li>
      ))}
    </ul>
  )
}

export default ProjectList
