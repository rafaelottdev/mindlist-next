import { getCompletedList } from "../actions/getCompletedList"
import { getLists } from "../actions/getLists"
import { updateProjectStatus } from "../actions/updateProjectStatus"

export async function handleCompletedList(
  projectId: number,
  setListQty: React.Dispatch<React.SetStateAction<number>>,
  setCompletedListQty: React.Dispatch<React.SetStateAction<number>>,
) {
  const listResult = await getLists(projectId)
  const completedListResult = await getCompletedList(projectId)

  const listQty = listResult?.response?.length ?? 0
  const completedListResultQty = completedListResult?.response?.length ?? 0

  setListQty(listQty)
  setCompletedListQty(completedListResultQty)

  if (listQty > 0) {
    await updateProjectStatus(listQty === completedListResultQty, projectId)
  } else {
    await updateProjectStatus(false, projectId)
  }
}
