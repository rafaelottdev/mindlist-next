import ProjectList from "@/components/ProjectList/ProjectList"
import { getOverdueProjects } from "@/lib/actions/getOverdueProjects"
import styles from "./page.module.sass"

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
      `}
    >
      {overdueProjectsResponse?.response &&
      overdueProjectsResponse?.response?.length > 0 ? (
        <ProjectList projectResponse={overdueProjectsResponse} />
      ) : (
        <div className={styles["project-list-container_message-contianer"]}>
          <p>Nenhum projeto atrasado</p>
        </div>
      )}
    </div>
  )
}

export default atrasado
