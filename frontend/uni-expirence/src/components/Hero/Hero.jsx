import Image from "next/image";
import styles from "./Hero.module.css";
import heroBg from "../../public/IILM_Front.jpg";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Subtle background effects */}
      <div className={styles.bgPattern} aria-hidden="true" />
      <div className={styles.glowTopRight} aria-hidden="true" />
      <div className={styles.glowBottomLeft} aria-hidden="true" />

      <div className={styles.container}>
        {/* ── Left: Text Content ── */}
        <div className={styles.textCol}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Welcome to IILM University
          </span>

          <h1 className={styles.heading}>
            Shaping the Future
            <br />
            of <span className={styles.headingHighlight}>Education</span>
          </h1>

          <p className={styles.subtext}>
            A unified platform to explore courses, connect with faculty, and
            stay updated with university events.
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryBtn}>
              Get Started
              <svg
                className={styles.btnIcon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
            <button className={styles.secondaryBtn}>Explore Events</button>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>25+</span>
              <span className={styles.statLabel}>Programs</span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.statItem}>
              <span className={styles.statValue}>50+</span>
              <span className={styles.statLabel}>Faculty</span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.statItem}>
              <span className={styles.statValue}>5000+</span>
              <span className={styles.statLabel}>Students</span>
            </div>
          </div>
        </div>

        {/* ── Right: Campus Image ── */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image
              src={heroBg}
              alt="IILM University Campus Building"
              fill
              priority
              placeholder="blur"
              quality={90}
              className={styles.campusImage}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            {/* Accent border frame */}
            <div className={styles.imageFrame} aria-hidden="true" />
          </div>

          {/* Floating accent card */}
          <div className={styles.floatingCard}>
            <div className={styles.floatingCardIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#a12a2f"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 2L12.09 7.26L18 8.27L13.5 12.14L14.82 18.02L10 15.27L5.18 18.02L6.5 12.14L2 8.27L7.91 7.26L10 2Z" />
              </svg>
            </div>
            <div className={styles.floatingCardText}>
              <span className={styles.floatingCardTitle}>NAAC Accredited</span>
              <span className={styles.floatingCardSub}>A+ Grade</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}