import styles from "./Slogan.module.sass"

function Slogan() {
  return (
    <div className={styles.slogan}>
      <p className={styles.slogan__text}>
        <span className={styles.slogan__span}>Organize</span>

        <span className={styles.slogan__span}>Seus</span>

        <span className={styles.slogan__span}>Projetos</span>
      </p>
    </div>
  )
}

export default Slogan
