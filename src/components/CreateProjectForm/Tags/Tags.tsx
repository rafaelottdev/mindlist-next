import { useRef, useState } from "react"
import { FaPlus, FaXmark } from "react-icons/fa6"
import { addTag, deleteTag } from "@/lib/utils/tagControl"
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
  showTagOptionList: boolean
  setShowTagOptionList: React.Dispatch<React.SetStateAction<boolean>>
  selectedTags: TagType[]
  setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>
  append: any
  error: any
}

function Tags({
  showTagOptionList,
  setShowTagOptionList,
  selectedTags,
  setSelectedTags,
  append,
  error,
}: TagsProps) {
  const [tagError, setTagError] = useState<{ error: boolean; message: string }>(
    { error: false, message: "" },
  )
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (
    <div className={`${styles["tag-container"]}`}>
      <p>Tags</p>

      <div className={styles["tag-container__wrapper"]}>
        <div className={styles["tag-container__add-tag"]}>
          <ul
            className={styles["tag-container__tag-list"]}
            style={{ paddingLeft: `${selectedTags.length > 0 ? "3px" : "0"}` }}
          >
            {selectedTags.map((tag) => (
              <li key={tag.id}>
                <p>{tag.name}</p>

                <button
                  type="button"
                  onClick={() => deleteTag(setSelectedTags, tag.id)}
                >
                  <FaXmark />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`
              ${styles["tag-container__add-button"]}
              ${selectedTags.length > 0 && styles["tag-container__add-button--change"]}
            `}
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
                <button
                  type="button"
                  onClick={() =>
                    addTag(
                      append,
                      timeoutRef,
                      selectedTags,
                      setSelectedTags,
                      setTagError,
                      tag.id,
                      tag.name,
                    )
                  }
                >
                  {tag.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error ? (
        <p className={styles["input-error"]}>{error.message}</p>
      ) : tagError.error ? (
        <p className={styles["input-error"]}>{tagError.message}</p>
      ) : (
        ""
      )}
    </div>
  )
}

export default Tags
