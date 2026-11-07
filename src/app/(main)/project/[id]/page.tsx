import ProjectPage from "@/components/ProjectPage/ProjectPage"
import { getProject } from "@/lib/actions/getProject"

async function projectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getProject(id)

  return <ProjectPage result={result} />
}

export default projectPage
