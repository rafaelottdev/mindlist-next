"use client"

import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import type { ProjectListType } from "@/types/ProjectListType"
import ProjectBackground from "./ProjectBackground/ProjectBackground"
import ProjectInfoBar from "./ProjectBarInfo/ProjectInfoBar"
import ProjectLists from "./ProjectLists/ProjectLists"
import styles from "./ProjectPage.module.sass"

interface ProjectPageProps {
  error: boolean
  message: string
  response: ProjectListType[] | Record<string, any>[] | null
}

function ProjectPage({ result }: { result: ProjectPageProps }) {
  const { notify } = useNotify()

  if (result.error) {
    notify(result.message)
  }

  const projectList: ProjectListType[] | Record<string, any>[] =
    result && !result.error && result.response ? result.response : []
  const projectData: ProjectListType | Record<string, any> = projectList[0]

  return (
    <div className={styles["project-page-container"]}>
      <ProjectBackground src={projectData.image_url} />

      <ProjectLists />

      <ProjectInfoBar projectData={projectData} />
    </div>
  )
}

export default ProjectPage
