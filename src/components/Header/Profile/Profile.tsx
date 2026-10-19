import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { FaRegTrashAlt } from "react-icons/fa"
import { getUser } from "@/lib/actions/getUser"
import { updateUser } from "@/lib/actions/updateUser"
import { formChangeProfileSchema } from "@/lib/schemas/formChangeProfileSchema"
import type { formChangeProfileType } from "@/types/formChangeProfileType"
import styles from "./Profile.module.sass"

interface ProfileProp {
  setUserName: React.Dispatch<React.SetStateAction<string | undefined>>
  setUserImage: React.Dispatch<React.SetStateAction<string | null | undefined>>
  userImage: string | null | undefined
}

function Profile({ setUserName, userImage, setUserImage }: ProfileProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formChangeProfileType>({
    resolver: zodResolver(formChangeProfileSchema),
  })

  async function onSubmit(data: formChangeProfileType) {
    const name = data.profileName
    const imageFile = data.profileImage?.item(0)

    const formData = new FormData()

    if (name) {
      formData.append("profileName", name)
    }

    if (imageFile) {
      formData.append("profileImage", imageFile)
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
      const profileImage = user?.image

      setUserImage(profileImage)
    }

    getUserImage()
  }, [setUserImage])

  return (
    <div className={styles["profile-config"]}>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={styles["profile-config__form"]}
      >
        <div className={styles["profile-config__avatar-container"]}>
          <div className={styles["profile-config__avatar-wrapper"]}>
            <div className={styles["profile-config__image-container"]}>
              <span></span>
              <Image
                src={
                  userImage ? `${userImage}` : `/img/header/profile-default.png`
                }
                alt="imagem de perfil"
                width={100}
                height={100}
              />
            </div>

            <label htmlFor="profileImage">Alterar foto</label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              {...register("profileImage")}
            />
          </div>

          <div className={styles["profile-config__remove-button-container"]}>
            <button
              type="button"
              className={styles["profile-config__remove-button"]}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </div>

        <div className={styles["profile-config__name-container"]}>
          <div className={styles["profile-config__input-container"]}>
            <label htmlFor="profileName">Alterar Nome</label>

            <input
              type="text"
              id="profileName"
              maxLength={10}
              {...register("profileName")}
            />
          </div>

          <div className={styles["config-profile__submit-container"]}>
            <button
              type="submit"
              className={styles["config-profile__submit-button"]}
            >
              Definir
            </button>
          </div>
        </div>

        {errors.profileImage && errors.profileName ? (
          <p className={styles["error-form"]}>{errors.profileImage.message}</p>
        ) : errors.profileImage ? (
          <p className={styles["error-form"]}>{errors.profileImage.message}</p>
        ) : (
          errors.profileName && (
            <p className={styles["error-form"]}>{errors.profileName.message}</p>
          )
        )}
      </form>
    </div>
  )
}

export default Profile
