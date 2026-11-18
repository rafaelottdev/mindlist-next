import type { ListType } from "@/types/ListType"
import ListCard from "./ListCard/ListCard"
import styles from "./ProjectLists.module.sass"

interface ProjectListsProps {
  lists: ListType[]
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>
  projectId: number
}

function ProjectLists({ lists, setLists, projectId }: ProjectListsProps) {
  return (
    <ul className={styles.list}>
      {lists.map((list: ListType) => {
        return (
          <li key={list.id}>
            <ListCard
              list={list}
              lists={lists}
              setLists={setLists}
              projectId={projectId}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default ProjectLists
