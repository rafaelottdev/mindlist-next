import styles from "./Home.module.sass"
import Nav from "./Nav/Nav"
import Slogan from "./Slogan/Slogan"

function Home({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.home}>
      <div className={styles["home__page-container"]}>
        <Nav />

        <div className={styles.home__page}>{children}</div>
      </div>

      <Slogan />
    </section>
  )
}

export default Home
