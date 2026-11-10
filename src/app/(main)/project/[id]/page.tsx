import ProjectPage from "@/components/ProjectPage/ProjectPage"
import { getLists } from "@/lib/actions/getLists"
import { getProject } from "@/lib/actions/getProject"

async function projectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const resultProject = await getProject(id)
  const resultLists = await getLists(Number(id))

  return <ProjectPage resultProject={resultProject} resultLists={resultLists} />
}

export default projectPage
