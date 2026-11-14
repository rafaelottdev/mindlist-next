import type { ListType } from "@/types/ListType"
import ListCard from "./ListCard/ListCard"
import styles from "./ProjectLists.module.sass"

interface ProjectListsProps {
  lists: ListType[]
  handleList: () => void
}

function ProjectLists({ lists, handleList }: ProjectListsProps) {
  return (
    <ul className={styles.list}>
      {lists.map((list: ListType) => {
        return (
          <li key={list.id}>
            <ListCard list={list} handleList={handleList} />
          </li>
        )
      })}
    </ul>
  )
}

export default ProjectLists
