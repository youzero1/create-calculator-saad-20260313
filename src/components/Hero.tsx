import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
        <div className={styles.grid} />
      </div>
      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Available for work
        </div>
        <h1 className={styles.title}>
          Hi, I&apos;m{" "}
          <span className={styles.name}>Alex Carter</span>
          <br />
          <span className={styles.role}>Full Stack Developer</span>
        </h1>
        <p className={styles.subtitle}>
          I craft beautiful, performant web applications with modern technologies.
          Passionate about clean code, great UX, and scalable architecture.
        </p>
        <div className={styles.actions}>
          <a href="#projects" className={`btn btn-primary ${styles.btnPrimary}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            View My Work
          </a>
          <a href="#contact" className={`btn btn-outline ${styles.btnOutline}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Get In Touch
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>5+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>50+</span>
            <span className={styles.statLabel}>Projects Done</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>30+</span>
            <span className={styles.statLabel}>Happy Clients</span>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
