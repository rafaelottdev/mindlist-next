import Image from "next/image"
import { useEffect, useState } from "react"
import type {
  FieldError,
  FieldPath,
  FieldValues,
  UseFormRegister,
} from "react-hook-form"
import styles from "./CoverInput.module.sass"

interface CoverInputProps<T extends FieldValues> {
  registerName: FieldPath<T>
  title: string
  register: UseFormRegister<T>
  watch: any
  errors: FieldError | undefined
}

function CoverInput<T extends FieldValues>({
  registerName,
  title,
  register,
  watch,
  errors,
}: CoverInputProps<T>) {
  const [preview, setPreview] = useState<string | null>(null)

  const fileList = watch("projectCover")

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

  return (
    <div className={styles["cover-container"]}>
      <label
        htmlFor="projectCover"
        className={`
          ${styles["cover-container__input-container"]}
          ${styles["cover-container__cover-label"]}
        `}
      >
        <p>{title}</p>

        <div className={styles["cover-container__cover"]}>
          <div>
            {preview && (
              <Image
                src={preview}
                alt="Capa do projeto"
                width={100}
                height={100}
              />
            )}
          </div>

          <p
            className={`
              ${styles["cover-container__cover-legend"]}
              ${preview && styles["cover-container__cover-legend--color"]}
            `}
          >
            Selecionar Imagem
          </p>
        </div>
      </label>

      {errors && <p className={styles["input-error"]}>{errors.message}</p>}

      <input
        type="file"
        id="projectCover"
        accept="image/*"
        {...register(registerName)}
      />
    </div>
  )
}

export default CoverInput
