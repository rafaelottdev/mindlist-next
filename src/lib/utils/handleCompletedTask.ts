import type { ListType } from "@/types/ListType"
import { getCompletedTask } from "../actions/getCompletedTask"
import { getTasks } from "../actions/getTasks"
import { updateListStatus } from "../actions/updateListStatus"

export async function handleCompletedTask(
  listId: number,
  projectId: number,
  setTaskListQty: React.Dispatch<React.SetStateAction<number>>,
  setCompletedTaskQty: React.Dispatch<React.SetStateAction<number>>,
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>,
) {
  const taskResult = await getTasks(listId)
  const completedTaskResult = await getCompletedTask(listId)

  const taskQty = taskResult?.response?.length ?? 0
  const completedTaskQty = completedTaskResult?.response?.length ?? 0

  if (taskQty > 0) {
    await updateListStatus(completedTaskQty === taskQty, listId, projectId)

    setLists((prev: ListType[]) =>
      prev.map((item: ListType) => {
        return item.id === listId
          ? {
              ...item,
              status: completedTaskQty === taskQty ? "completed" : "pending",
            }
          : item
      }),
    )
  } else {
    await updateListStatus(false, listId, projectId)

    setLists((prev: ListType[]) =>
      prev.map((item: ListType) => {
        return item.id === listId
          ? {
              ...item,
              status: "pending",
            }
          : item
      }),
    )
  }

  setTaskListQty(taskQty)
  setCompletedTaskQty(completedTaskQty)
}
