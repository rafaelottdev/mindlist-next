import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaXmark } from "react-icons/fa6"
import { updateUser } from "@/lib/actions/updateUser"
import { formChangeProfileSchema } from "@/lib/schemas/formChangeProfileSchema"
import type { formChangeProfileType } from "@/types/formChangeProfileType"
import styles from "./Profile.module.sass"
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar"
import ProfileNameInput from "./ProfileNameInput/ProfileNameInput"
import ProfilePasswordInput from "./ProfilePasswordInput/ProfilePasswordInput"

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
        <ProfileAvatar
          setUserImage={setUserImage}
          userImage={userImage}
          register={register}
          errors={errors}
          watch={watch}
        />

        <div className={styles["profile-config__data-container"]}>
          <div className={styles["profile-config__input-container"]}>
            <ProfileNameInput register={register} errors={errors} />

            <ProfilePasswordInput
              register={register}
              errors={errors}
              inputName={"currentPassword"}
            />

            <ProfilePasswordInput
              register={register}
              errors={errors}
              inputName={"changePassword"}
            />
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
