import type { ListType } from "@/types/ListType"
import { getCompletedTask } from "../actions/getCompletedTask"
import { getTasks } from "../actions/getTasks"
import { updateListStatus } from "../actions/updateListStatus"
import { updateProjectStatus } from "../actions/updateProjectStatus"

export async function handleCompletedTask(
  listId: number,
  projectId: number,
  setTaskListQty: React.Dispatch<React.SetStateAction<number>>,
  setCompletedTaskQty: React.Dispatch<React.SetStateAction<number>>,
  lists: ListType[],
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>,
) {
  const taskResult = await getTasks(listId)
  const completedTaskResult = await getCompletedTask(listId)

  const taskQty = taskResult.response?.length ?? 0
  const completedTaskQty = completedTaskResult.response?.length ?? 0

  const listCompleted = taskQty > 0 && completedTaskQty === taskQty

  await updateListStatus(listCompleted, listId, projectId)

  const updatedLists = lists.map((list) =>
    list.id === listId
      ? {
          ...list,
          status: listCompleted ? "completed" : "pending",
        }
      : list,
  )

  setLists(updatedLists)

  const listQty = updatedLists.length

  const completedListQty = updatedLists.filter(
    (list) => list.status === "completed",
  ).length

  await updateProjectStatus(
    listQty > 0 && listQty === completedListQty,
    projectId,
  )

  setTaskListQty(taskQty)
  setCompletedTaskQty(completedTaskQty)
}
