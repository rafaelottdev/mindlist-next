import styles from "./Notification.module.sass"

function Notification() {
  return (
    <div className={styles["notification-container"]}>
      <ul className={styles["notification-container__list"]}>
        <li className={styles["notification-container__item"]}>
          Nenhuma Notificação
        </li>
      </ul>
    </div>
  )
}

export default Notification
