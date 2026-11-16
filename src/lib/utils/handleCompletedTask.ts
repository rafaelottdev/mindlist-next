import type { ListType } from "@/types/ListType"
import { getCompletedTask } from "../actions/getCompletedTask"
import { getTasks } from "../actions/getTasks"
import { updateListStatus } from "../actions/updateListStatus"

export async function handleCompletedTask(
  listId: number,
  projectId: number,
  setTaskListQtd: React.Dispatch<React.SetStateAction<number>>,
  setCompletedTaskQtd: React.Dispatch<React.SetStateAction<number>>,
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>,
) {
  const taskResult = await getTasks(listId)
  const completedTaskResult = await getCompletedTask(listId)

  const taskQtd = taskResult?.response?.length ?? 0
  const completedTaskQtd = completedTaskResult?.response?.length ?? 0

  if (taskQtd > 0) {
    await updateListStatus(completedTaskQtd === taskQtd, listId, projectId)

    setLists((prev: ListType[]) =>
      prev.map((item: ListType) => {
        return item.id === listId
          ? {
              ...item,
              status: completedTaskQtd === taskQtd ? "completed" : "pending",
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

  setTaskListQtd(taskQtd)
  setCompletedTaskQtd(completedTaskQtd)
}
