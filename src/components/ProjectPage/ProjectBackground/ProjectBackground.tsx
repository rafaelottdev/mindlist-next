import Image from "next/image"
import styles from "./ProjectBackground.module.sass"

function ProjectBackground({ src }: { src: string }) {
  return (
    <div className={styles["background-container"]}>
      <Image
        src={src ? src : "/img/home/project-background-full.png"}
        alt="Imagem de fundo do projeto"
        width={1550}
        height={650}
        className={styles["background-container__image"]}
      />
    </div>
  )
}

export default ProjectBackground
