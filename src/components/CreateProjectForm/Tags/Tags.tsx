import { useState } from "react"
import { FaPlus } from "react-icons/fa6"
import type { TagType } from "@/types/TagType"
import styles from "./Tags.module.sass"

const tags = [
  { id: 0, name: "Estudo" },
  { id: 1, name: "Trabalho" },
  { id: 2, name: "Pessoal" },
  { id: 3, name: "Projetos" },
  { id: 4, name: "Academia" },
  { id: 5, name: "Receita" },
  { id: 6, name: "Casa" },
  { id: 7, name: "Rotina" },
  { id: 8, name: "Freelance" },
  { id: 9, name: "Entrevista" },
  { id: 10, name: "Finanças" },
  { id: 11, name: "Idioma" },
  { id: 12, name: "Livros" },
  { id: 13, name: "Pesquisa" },
]

interface TagsProps {
  selectedTags: TagType[]
  setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>
  append: any
}

function Tags({ selectedTags, setSelectedTags, append }: TagsProps) {
  const [showTagOptionList, setShowTagOptionList] = useState<boolean>(false)

  function addTag(id: number, name: string) {
    if (selectedTags.length < 3) {
      setSelectedTags((prev: TagType[]) => [...prev, { id, name }])
      append({ id: id, name: name })
    }
  }

  return (
    <div className={`${styles["tag-container"]}`}>
      <p>Tags</p>

      <div className={styles["tag-container__wrapper"]}>
        <div className={styles["tag-container__add-tag"]}>
          <ul className={styles["tag-container__tag-list"]}></ul>

          <button
            type="button"
            className={styles["tag-container__add-button"]}
            onClick={() => setShowTagOptionList((prev) => !prev)}
          >
            <FaPlus />

            <p>Adicionar Tags</p>
          </button>
        </div>

        {showTagOptionList && (
          <ul className={styles["tag-container__option-list"]}>
            {tags.map((tag) => (
              <li key={tag.id}>
                <button type="button" onClick={() => addTag(tag.id, tag.name)}>
                  {tag.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Tags
