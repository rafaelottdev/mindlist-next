import ProjectList from "@/components/ProjectList/ProjectList"
import { getOverdueProjects } from "@/lib/actions/getOverdueProjects"
import styles from "../pages.module.sass"

async function atrasado() {
  const overdueProjectsResponse = await getOverdueProjects()

  return (
    <div
      className={`
        ${styles["project-list-container"]}
        ${
          overdueProjectsResponse.response &&
          overdueProjectsResponse?.response.length > 0 &&
          `${styles["project-list-container--gap"]}`
        }
        ${overdueProjectsResponse?.response?.length === 1 ? styles["project-list-container--center"] : ""}
      `}
    >
      {overdueProjectsResponse?.response &&
      overdueProjectsResponse?.response?.length > 0 ? (
        <ProjectList projectResponse={overdueProjectsResponse} />
      ) : (
        <div className={styles["project-list-container_message-container"]}>
          <p>Nenhum projeto atrasado</p>
        </div>
      )}
    </div>
  )
}

export default atrasado
