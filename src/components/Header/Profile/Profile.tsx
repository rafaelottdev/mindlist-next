import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { FaRegTrashAlt } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"
import { deleteProfileAvatar } from "@/lib/actions/deleteProfileAvatar"
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
    watch,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<formChangeProfileType>({
    resolver: zodResolver(formChangeProfileSchema),
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileList = watch("profileImage")

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

  async function onSubmit(data: formChangeProfileType) {
    const imageFile = data.profileImage?.item(0)
    const name = data.profileName
    const currentPassword = data.currentPassword
    const newPassword = data.changePassword

    const formData = new FormData()

    if (name) {
      formData.append("profileName", name)
    }

    if (imageFile) {
      formData.append("profileImage", imageFile)
    }

    if (currentPassword) {
      formData.append("currentPassword", currentPassword)
    }

    if (newPassword) {
      formData.append("newPassword", newPassword)
    }

    const result = await updateUser(formData)

    if (result) {
      setUserName(result.newName)
      setUserImage(result.newImage)

      if (imageFile) resetField("profileImage")
      if (name) setValue("profileName", "")
      if (currentPassword) setValue("currentPassword", "")
      if (newPassword) setValue("changePassword", "")
    }
  }

  function handleClick() {
    deleteProfileAvatar()
    setUserImage("")
  }

  function clearFields() {
    resetField("profileImage")
    resetField("profileName")
    resetField("currentPassword")
    resetField("changePassword")
  }

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

          <div className={styles["profile-config__remove-button-container"]}>
            <button
              type="button"
              className={styles["profile-config__remove-button"]}
              onClick={handleClick}
            >
              <FaRegTrashAlt />
            </button>
          </div>

          {errors.profileImage && (
            <p className={styles["error-form"]}>
              {errors.profileImage.message}
            </p>
          )}
        </div>

        <div className={styles["profile-config__data-container"]}>
          <div className={styles["profile-config__input-container"]}>
            <div>
              <label htmlFor="profileName">Alterar Nome</label>

              <input
                type="text"
                id="profileName"
                maxLength={10}
                {...register("profileName")}
              />

              {errors.profileName && (
                <p className={styles["error-form"]}>
                  {errors.profileName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="currentPassword">Senha Atual</label>

              <div
                className={styles["profile-config__password-input-container"]}
              >
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  maxLength={10}
                  {...register("currentPassword")}
                />

                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                >
                  {showCurrentPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>

              {errors.currentPassword && (
                <p className={styles["error-form"]}>
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="changePassword">Alterar Senha</label>

              <div
                className={styles["profile-config__password-input-container"]}
              >
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="changePassword"
                  maxLength={10}
                  {...register("changePassword")}
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>

              {errors.changePassword && (
                <p className={styles["error-form"]}>
                  {errors.changePassword.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles["config-profile__submit-container"]}>
            <button
              type="submit"
              className={styles["config-profile__submit-button"]}
            >
              Definir
            </button>

            <button
              type="button"
              className={styles["config-profile__clear-fields-button"]}
              onClick={clearFields}
            >
              <FaXmark />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
