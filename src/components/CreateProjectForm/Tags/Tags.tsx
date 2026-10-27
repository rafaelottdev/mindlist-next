import { useState } from "react"
import { FaPlus } from "react-icons/fa6"
import styles from "./Tags.module.sass"

const tags = [
  { id: 1, name: "Estudo" },
  { id: 2, name: "Trabalho" },
  { id: 3, name: "Pessoal" },
  { id: 4, name: "Projetos" },
  { id: 5, name: "Academia" },
  { id: 6, name: "Receita" },
  { id: 7, name: "Casa" },
  { id: 8, name: "Rotina" },
  { id: 9, name: "Freelance" },
  { id: 10, name: "Entrevista" },
  { id: 11, name: "Finanças" },
  { id: 12, name: "Idioma" },
  { id: 13, name: "Livros" },
  { id: 14, name: "Pesquisa" },
]

function Tags() {
  const [showTagOptionList, setShowTagOptionList] = useState<boolean>(false)

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
                <button type="button">{tag.name}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Tags
