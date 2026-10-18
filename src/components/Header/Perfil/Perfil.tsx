import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { getUser } from "@/lib/actions/getUser"
import { updateUser } from "@/lib/actions/updateUser"
import { formChangePerfilSchema } from "@/lib/schemas/formChangePerfilSchema"
import type { formChangePerfilType } from "@/types/formChangePerfilType"
import styles from "./Perfil.module.sass"

interface PerfilProp {
  setUserName: React.Dispatch<React.SetStateAction<string | undefined>>
  setUserImage: React.Dispatch<React.SetStateAction<string | null | undefined>>
  userImage: string | null | undefined
}

function Perfil({ setUserName, userImage, setUserImage }: PerfilProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formChangePerfilType>({
    resolver: zodResolver(formChangePerfilSchema),
  })

  async function onSubmit(data: formChangePerfilType) {
    const name = data.perfilName
    const imageFile = data.perfilImage?.item(0)

    const formData = new FormData()

    if (name) {
      formData.append("perfilName", name)
    }

    if (imageFile) {
      formData.append("perfilImage", imageFile)
    }

    const result = await updateUser(formData)

    if (result) {
      setUserName(result.newName)
      setUserImage(result.newImage)
    }
  }

  useEffect(() => {
    async function getUserImage() {
      const user = await getUser()
      const perfilImage = user?.image

      setUserImage(perfilImage)
    }

    getUserImage()
  }, [setUserImage])

  return (
    <div className={styles["config-perfil"]}>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={styles["config-perfil__form"]}
      >
        <div className={styles["config-perfil__input-container"]}>
          <div className={styles["config-perfil__image-container"]}>
            <div>
              <span></span>
              <Image
                src={
                  userImage ? `${userImage}` : `/img/header/perfil-default.png`
                }
                alt="imagem de perfil"
                width={100}
                height={100}
              />
            </div>

            <label htmlFor="perfilImage">Alterar foto</label>
            <input
              type="file"
              id="perfilImage"
              accept="image/*"
              {...register("perfilImage")}
            />
          </div>

          <div className={styles["config-perfil__name-container"]}>
            <label htmlFor="perfilName">Alterar Nome</label>
            <input
              type="text"
              id="perfilName"
              maxLength={10}
              {...register("perfilName")}
            />
          </div>
        </div>

        <div className={styles["config-perfil__send-button-container"]}>
          <button
            type="submit"
            className={styles["config-perfil__send-button"]}
          >
            Definir
          </button>
        </div>

        {errors.perfilImage && errors.perfilName ? (
          <p className={styles["error-form"]}>{errors.perfilImage.message}</p>
        ) : errors.perfilImage ? (
          <p className={styles["error-form"]}>{errors.perfilImage.message}</p>
        ) : (
          errors.perfilName && (
            <p className={styles["error-form"]}>{errors.perfilName.message}</p>
          )
        )}
      </form>
    </div>
  )
}

export default Perfil
