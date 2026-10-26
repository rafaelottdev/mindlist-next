"use client"

import Image from "next/image"
import { useState } from "react"
import { FaPlus, FaXmark } from "react-icons/fa6"
import { HiLogout } from "react-icons/hi"
import styles from "./CreateProjectForm.module.sass"

const _tags: string[] = [
  "Estudo",
  "Trabalho",
  "Pessoal",
  "Projetos",
  "Academia",
  "Receita",
  "Casa",
  "Rotina",
  "Freelance",
  "Entrevista",
  "Finanças",
  "Idioma",
  "Livros",
  "Pesquisa",
]

function CreateProjectForm() {
  const [showForm, setShowForm] = useState<boolean>(false)

  return (
    <div className={styles["form-container"]}>
      <div
        className={`
          ${styles["form-container__cover-form-container"]}
          ${showForm && styles["form-container__cover-form-container--hide"]}
        `}
      >
        <Image
          src="/img/home/project-cover.png"
          alt=""
          width={280}
          height={380}
          loading="eager"
          className={styles["form-container__cover-image"]}
        />

        <button
          type="button"
          className={`
            ${styles["form-container__add-project-button"]}
            ${showForm && styles["form-container__add-project-button--hide"]}
          `}
          onClick={() => setShowForm(true)}
        >
          Adicionar Projeto
          <HiLogout />
        </button>
      </div>

      <form className={styles["form-container__form"]}>
        <div className={styles["form-container__name-date-container"]}>
          <div
            className={`
              ${styles["form-container__input-container"]}
              ${styles["form-container__name-container"]}
            `}
          >
            <label htmlFor="projectName">Nome do Projeto</label>

            <input type="text" id="projectName" />
          </div>

          <div
            className={`
              ${styles["form-container__input-container"]}
              ${styles["form-container__date-container"]}
            `}
          >
            <label htmlFor="projectDeadline">Data Limite</label>

            <input type="date" id="projectDeadline" />
          </div>
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

            <div></div>
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
            <input type="radio" id="lowPriority" name="priority" />
            <label htmlFor="lowPriority">Baixa</label>

            <input type="radio" id="mediumPriority" name="priority" />
            <label htmlFor="mediumPriority">Média</label>

            <input type="radio" id="highPriority" name="priority" />
            <label htmlFor="highPriority">Alta</label>
          </div>
        </fieldset>

        <div
          className={`
            ${styles["form-container__input-container"]}
            ${styles["form-container__tag-container"]}
          `}
        >
          <label htmlFor="">Tags</label>

          <div className={styles["form-container__tag-wrapper"]}>
            <div className={styles["form-container__add-tag-container"]}>
              <ul className={styles["form-container__tag-list"]}></ul>

              <button
                type="button"
                className={styles["form-container__add-tag-button"]}
              >
                <FaPlus />
                Adicionar Tags
              </button>
            </div>

            <ul className={styles["form-container__tag-option-list"]}>
              {/* {tags.map((tag, id) => (
                <li key={id}>
                  <button type="button">{tag}</button>
                </li>
              ))} */}
            </ul>
          </div>
        </div>

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
          >
            <FaXmark />
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProjectForm
