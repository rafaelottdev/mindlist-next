"use client"

import Image from "next/image"
import { FaCheck, FaRegCircle, FaRegClock, FaXmark } from "react-icons/fa6"
import { FiTrash } from "react-icons/fi"
import { IoPricetagOutline } from "react-icons/io5"
import { LuClipboardPen } from "react-icons/lu"
import { PiStarBold } from "react-icons/pi" // PiStarFill
import {
  RiSignalCellular1Fill,
  RiSignalCellular2Fill,
  RiSignalCellular3Fill,
} from "react-icons/ri"
import { useNotify } from "@/contexts/NotificationAlert/NotificationAlert"
import type { ProjectListType } from "@/types/ProjectListType"

interface ProjectListProps {
  error: boolean
  message: string
  response: ProjectListType[] | null | Record<string, any>[]
}

function ProjectList({
  projectResponse,
}: {
  projectResponse: ProjectListProps
}) {
  const { notify } = useNotify()
  const projectList =
    !projectResponse.error && projectResponse.response
      ? projectResponse.response
      : []

  if (projectResponse.error) {
    notify(projectResponse.message)
  }

  return (
    <ul>
      {projectList.map((project: ProjectListType | Record<string, any>) => {
        const _newDeadline = ""
        const newTagList = project.tags.map((tag: string, id: number) => {
          return { id, name: tag }
        })

        return (
          <li key={project.id}>
            <div>
              <Image
                src="/img/home/project-cover.png"
                alt="capa do projeto"
                width={100}
                height={100}
              />
            </div>

            <div>
              <div>
                <div>
                  {project.image_url && (
                    <Image
                      src={project.image_url}
                      alt="imagem do projeto"
                      width={100}
                      height={100}
                    />
                  )}
                </div>

                <ul>
                  <li>
                    {project.priority === "low" ? (
                      <RiSignalCellular1Fill />
                    ) : project.priority === "medium" ? (
                      <RiSignalCellular2Fill />
                    ) : project.priority === "high" ? (
                      <RiSignalCellular3Fill />
                    ) : (
                      ""
                    )}
                  </li>

                  <li>
                    <PiStarBold />
                  </li>

                  <li>
                    <ul>
                      <li>
                        <FiTrash />
                      </li>

                      <li>
                        <LuClipboardPen />
                      </li>
                    </ul>

                    <div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <div>
                  <div>
                    <p>{project.name}</p>
                  </div>

                  <div>
                    <FaRegClock />

                    <p>{project.deadline.toLocaleDateString("pt-BR")}</p>
                  </div>

                  <div>
                    <IoPricetagOutline />

                    <ul>
                      {newTagList.map((tag: { id: number; name: string }) => (
                        <li key={tag.id}>{tag.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <ul>
                    <li>
                      <FaRegCircle />
                    </li>

                    <li>
                      <FaCheck />
                    </li>

                    <li>
                      <FaXmark />
                    </li>
                  </ul>

                  <div>
                    {/* Qtde tarefas concluidas */}
                    <div>
                      <div></div>
                    </div>

                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ProjectList
