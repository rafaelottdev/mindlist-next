import ProjectList from "@/components/ProjectList/ProjectList"
import { getFavoriteProjects } from "@/lib/actions/getFavoriteProjects"
import styles from "../pages.module.sass"

async function favorito() {
  const favoriteProjectsResponse = await getFavoriteProjects()

  return (
    <div
      className={`
        ${styles["project-list-container"]}
        ${
          favoriteProjectsResponse.response &&
          favoriteProjectsResponse?.response.length > 0 &&
          `${styles["project-list-container--gap"]}`
        }
        ${favoriteProjectsResponse?.response?.length === 1 ? styles["project-list-container--center"] : ""}
      `}
    >
      {favoriteProjectsResponse?.response &&
      favoriteProjectsResponse?.response?.length > 0 ? (
        <ProjectList projectResponse={favoriteProjectsResponse} />
      ) : (
        <div className={styles["project-list-container_message-container"]}>
          <p>Nenhum projeto favoritado</p>
        </div>
      )}
    </div>
  )
}

export default favorito
