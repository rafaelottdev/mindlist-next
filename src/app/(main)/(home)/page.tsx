import CreateProjectForm from "@/components/CreateProjectForm/CreateProjectForm"
import ProjectList from "@/components/ProjectList/ProjectList"
import { getProjects } from "@/lib/actions/getProjects"

export default async function page() {
  const projectResponse = await getProjects()

  return (
    <div style={{ display: "flex", gap: "18px" }}>
      <ProjectList projectResponse={projectResponse} />

      <CreateProjectForm />
    </div>
  )
}
