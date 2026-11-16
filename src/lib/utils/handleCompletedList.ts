import { getCompletedList } from "../actions/getCompletedList"
import { getLists } from "../actions/getLists"

export async function handleCompletedList(
  projectId: number,
  setListQtd: React.Dispatch<React.SetStateAction<number>>,
  setCompletedListQtd: React.Dispatch<React.SetStateAction<number>>,
) {
  const listResult = await getLists(projectId)
  const completedListResult = await getCompletedList(projectId)

  const listQtd = listResult?.response?.length ?? 0
  const completedListResultQtd = completedListResult?.response?.length ?? 0

  setListQtd(listQtd)
  setCompletedListQtd(completedListResultQtd)
}
