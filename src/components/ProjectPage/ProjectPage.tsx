"use client"

import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import type { ListType } from "@/types/ListType"
import type { ProjectListType } from "@/types/ProjectListType"
import CreateListForm from "../CreateListForm/CreateListForm"
import ProjectBackground from "./ProjectBackground/ProjectBackground"
import ProjectInfoBar from "./ProjectInfoBar/ProjectInfoBar"
import ProjectLists from "./ProjectLists/ProjectLists"
import styles from "./ProjectPage.module.sass"

interface ProjectPageProps {
  resultProject: {
    error: boolean
    message: string
    response: ProjectListType[] | null
  }

  resultLists: {
    error: boolean
    message: string
    response: ListType[] | null
  }
}

function ProjectPage({ resultProject, resultLists }: ProjectPageProps) {
  const { notify } = useNotify()

  if (resultProject.error) {
    notify(resultProject.message)
  }

  const projectList: ProjectListType[] =
    resultProject && !resultProject.error && resultProject.response
      ? resultProject.response
      : []
  const projectData = projectList[0]

  if (resultLists.error) {
    notify(resultLists.message)
  }

  const lists: ListType[] =
    resultLists && !resultLists.error && resultLists.response
      ? resultLists.response
      : []

  return (
    <div className={styles["project-page-container"]}>
      <ProjectBackground src={projectData.image_url} />

      <section>
        <ProjectLists lists={lists} />

        <CreateListForm projectData={projectData} />
      </section>

      <ProjectInfoBar projectData={projectData} />
    </div>
  )
}

export default ProjectPage
