import CreateProjectForm from "@/components/CreateProjectForm/CreateProjectForm"
import ProjectList from "@/components/ProjectList/ProjectList"
import { getPendingProjects } from "@/lib/actions/getPendingProjects"
import styles from "./pages.module.sass"

export default async function page() {
  const projectResponse = await getPendingProjects()
  const projectQtde = projectResponse?.response?.length

  return (
    <div
      className={`
        ${styles["project-list-container"]}
        ${projectQtde && projectQtde > 0 && `${styles["project-list-container--gap"]}`}
      `}
    >
      <ProjectList projectResponse={projectResponse} />

      <CreateProjectForm />
    </div>
  )
}
