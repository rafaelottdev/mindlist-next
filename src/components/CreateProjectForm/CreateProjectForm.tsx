"use client"

import { useState } from "react"
import { FaXmark } from "react-icons/fa6"

import styles from "./CreateProjectForm.module.sass"
import FormCover from "./FormCover/FormCover"
import Input from "./Input/Input"
import Tags from "./Tags/Tags"

function CreateProjectForm() {
  const [showForm, setShowForm] = useState<boolean>(false)

  return (
    <div className={styles["form-container"]}>
      <FormCover showForm={showForm} setShowForm={setShowForm} />

      <form className={styles["form-container__form"]}>
        <div className={styles["form-container__name-date-container"]}>
          <Input
            inputId="projectName"
            labelTitle="Nome do Projeto"
            inputType="text"
          />

          <Input
            inputId="projectDeadline"
            labelTitle="Data Limite"
            inputType="date"
          />
        </div>

        <div className={styles["form-container__cover-container"]}>
          <label
            htmlFor="projectCover"
            className={`
              ${styles["form-container__input-container"]}
              ${styles["form-container__cover-label"]}
            `}
          >
            <p>Capa</p>

            <div>Selecionar Imagem</div>
          </label>

          <input type="file" id="projectCover" />
        </div>

        <fieldset
          className={`
            ${styles["form-container__input-container"]}
            ${styles["form-container__priority-container"]}
          `}
        >
          <legend>Prioridade</legend>

          <div className={styles["form-container__input-list-option"]}>
            <div className={styles["form-container__option"]}>
              <input type="radio" id="lowPriority" name="priority" />
              <label htmlFor="lowPriority">Baixa</label>
            </div>

            <div className={styles["form-container__option"]}>
              <input type="radio" id="mediumPriority" name="priority" />
              <label htmlFor="mediumPriority">Média</label>
            </div>

            <div className={styles["form-container__option"]}>
              <input type="radio" id="highPriority" name="priority" />
              <label htmlFor="highPriority">Alta</label>
            </div>
          </div>
        </fieldset>

        <Tags />

        <div className={styles["form-container__form-button-container"]}>
          <button
            type="submit"
            className={styles["form-container__send-button"]}
          >
            Criar Projeto
          </button>

          <button
            type="button"
            className={styles["form-container__clear-button"]}
            onClick={() => setShowForm(false)}
          >
            <FaXmark />
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProjectForm
