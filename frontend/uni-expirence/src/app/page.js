import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.accent}>IILM</span> Campus 360
        </h1>
        <p className={styles.subtitle}>
          Your gateway to courses, events, faculty connections, and everything
          campus life has to offer — all in one place.
        </p>
      </div>
    </div>
  );
}