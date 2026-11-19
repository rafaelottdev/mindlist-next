import ProjectList from "@/components/ProjectList/ProjectList"
import { getCompletedProjects } from "@/lib/actions/getCompletedProjects"

async function concluido() {
  const completedProjectsResponse = await getCompletedProjects()

  return (
    <>
      {completedProjectsResponse?.response &&
      completedProjectsResponse?.response?.length > 0 ? (
        <ProjectList projectResponse={completedProjectsResponse} />
      ) : (
        <div>
          <p>Nenhum projeto concluido</p>
        </div>
      )}
    </>
  )
}

export default concluido
