"use client"

import { useState } from "react"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import { getCompletedList } from "@/lib/actions/getCompletedList"
import { getLists } from "@/lib/actions/getLists"
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
  const [listQtd, setListQtd] = useState<number>(0)
  const [completedListQtd, setCompletedListQtd] = useState<number>(0)

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

  async function handleList() {
    const listResult = await getLists(projectData.id)
    const completedListResult = await getCompletedList(projectData.id)

    const listQtd = listResult?.response?.length
    const completedListResultQtd = completedListResult?.response?.length
    if (listQtd) {
      setListQtd(listQtd)
    } else {
      setListQtd(0)
    }

    if (completedListResultQtd) {
      setCompletedListQtd(completedListResultQtd)
    } else {
      setCompletedListQtd(0)
    }
  }

  return (
    <div className={styles["project-page-container"]}>
      <ProjectBackground src={projectData.image_url} />

      <section className={styles["project-page-container__lists"]}>
        <ProjectLists lists={lists} handleList={handleList} />

        <CreateListForm projectData={projectData} handleList={handleList} />
      </section>

      <ProjectInfoBar
        projectData={projectData}
        handleList={handleList}
        listQtd={listQtd}
        completedListQtd={completedListQtd}
      />
    </div>
  )
}

export default ProjectPage
