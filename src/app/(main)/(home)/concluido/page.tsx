import ProjectList from "@/components/ProjectList/ProjectList"
import { getCompletedProjects } from "@/lib/actions/getCompletedProjects"
import styles from "./page.module.sass"

async function concluido() {
  const completedProjectsResponse = await getCompletedProjects()

  return (
    <div
      className={`
        ${styles["project-list-container"]}
        ${
          completedProjectsResponse.response &&
          completedProjectsResponse?.response.length > 0 &&
          `${styles["project-list-container--gap"]}`
        }
      `}
    >
      {completedProjectsResponse?.response &&
      completedProjectsResponse?.response?.length > 0 ? (
        <ProjectList projectResponse={completedProjectsResponse} />
      ) : (
        <div className={styles["project-list-container_message-contianer"]}>
          <p>Nenhum projeto concluido</p>
        </div>
      )}
    </div>
  )
}

export default concluido
