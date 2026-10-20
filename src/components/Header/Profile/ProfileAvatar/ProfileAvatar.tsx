import Image from "next/image"
import { useEffect, useState } from "react"
import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form"
import { FaRegTrashAlt } from "react-icons/fa"
import { deleteProfileAvatar } from "@/lib/actions/deleteProfileAvatar"
import { getUser } from "@/lib/actions/getUser"
import type { formChangeProfileType } from "@/types/formChangeProfileType"
import styles from "./ProfileAvatar.module.sass"

interface ProfileAvatarProps {
  setUserImage: React.Dispatch<React.SetStateAction<string | null | undefined>>
  userImage: string | null | undefined
  register: UseFormRegister<formChangeProfileType>
  errors: FieldErrors<formChangeProfileType>
  watch: UseFormWatch<formChangeProfileType>
}

function ProfileAvatar({
  setUserImage,
  userImage,
  register,
  errors,
  watch,
}: ProfileAvatarProps) {
  const fileList = watch("profileImage")
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    const file = fileList?.[0]

    if (!file) {
      setPreview(null)
      return
    }

    const url = URL.createObjectURL(file)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [fileList])

  useEffect(() => {
    async function getUserImage() {
      const user = await getUser()
      const profileImage = user?.image

      setUserImage(profileImage)
    }

    getUserImage()
  }, [setUserImage])

  function handleClick() {
    deleteProfileAvatar()
    setUserImage("")
  }

  return (
    <div className={styles["avatar-container"]}>
      <div className={styles["avatar-container__avatar-wrapper"]}>
        <div className={styles["avatar-container__image-container"]}>
          <span></span>
          <Image
            src={preview || userImage || "/img/header/profile-default.png"}
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

      <div className={styles["avatar-container__remove-button-container"]}>
        <button
          type="button"
          className={styles["avatar-container__remove-button"]}
          onClick={handleClick}
        >
          <FaRegTrashAlt />
        </button>
      </div>

      {errors.profileImage && (
        <p className={styles["error-form"]}>{errors.profileImage.message}</p>
      )}
    </div>
  )
}

export default ProfileAvatar
