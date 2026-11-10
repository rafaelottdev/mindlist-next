import type { ListType } from "@/types/ListType"
import ListCard from "./ListCard/ListCard"
import styles from "./ProjectLists.module.sass"

function ProjectLists({ lists }: { lists: ListType[] }) {
  return (
    <ul className={styles.list}>
      {lists.map((list: ListType) => {
        return (
          <li key={list.id}>
            <ListCard list={list} />
          </li>
        )
      })}
    </ul>
  )
}

export default ProjectLists
