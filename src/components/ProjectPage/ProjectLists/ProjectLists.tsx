import type { ListType } from "@/types/ListType"

// import styles from "./ProjectLists.module.sass"

function ProjectLists({ lists }: { lists: ListType[] | null }) {
  console.log(lists)
  return <ul>Lista</ul>
}

export default ProjectLists
