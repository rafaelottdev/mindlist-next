import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formChangePerfilSchema } from "@/lib/schemas/formChangePerfilSchema"
import type { formChangePerfilType } from "@/types/formChangePerfilType"
import styles from "./Perfil.module.sass"

function Perfil() {
  const { register, handleSubmit } = useForm<formChangePerfilType>({
    resolver: zodResolver(formChangePerfilSchema),
  })

  function onSubmit(formData: formChangePerfilType) {
    console.log(formData.perfilImage)
  }

  return (
    <div className={styles["config-perfil"]}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["config-perfil__form"]}
      >
        <div className={styles["config-perfil__input-container"]}>
          <div className={styles["config-perfil__image-container"]}>
            <div></div>

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
      </form>
    </div>
  )
}

export default Perfil
