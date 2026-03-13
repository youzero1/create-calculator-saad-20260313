import styles from "./About.module.css";

const highlights = [
  { icon: "🚀", label: "Performance", desc: "Building fast, optimized apps" },
  { icon: "🎨", label: "Design", desc: "Pixel-perfect UI implementation" },
  { icon: "🔧", label: "Architecture", desc: "Scalable, maintainable code" },
  { icon: "📱", label: "Responsive", desc: "Mobile-first development" },
];

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.imageWrap}>
              <div className={styles.imagePlaceholder}>
                <div className={styles.avatarInner}>
                  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
                    <circle cx="100" cy="70" r="40" fill="url(#avatarGrad)" />
                    <ellipse cx="100" cy="160" rx="60" ry="40" fill="url(#avatarGrad)" />
                    <defs>
                      <linearGradient id="avatarGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6c63ff" />
                        <stop offset="1" stopColor="#ff6584" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className={styles.imageGlow} />
              <div className={styles.imageBadge}>
                <span>5+</span>
                <small>Years Exp.</small>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <p className={styles.eyebrow}>About Me</p>
            <h2 className="section-title">Crafting Digital Experiences</h2>
            <p className={styles.bio}>
              I&apos;m a passionate full-stack developer with over 5 years of experience
              building web applications that make a difference. I specialize in React,
              Next.js, Node.js, and cloud technologies, with a strong eye for design
              and user experience.
            </p>
            <p className={styles.bio}>
              When I&apos;m not coding, you&apos;ll find me exploring new technologies,
              contributing to open-source projects, or sharing my knowledge through
              blog posts and community events.
            </p>
            <div className={styles.highlights}>
              {highlights.map((h) => (
                <div key={h.label} className={styles.highlight}>
                  <div className={styles.highlightIcon}>{h.icon}</div>
                  <div>
                    <div className={styles.highlightLabel}>{h.label}</div>
                    <div className={styles.highlightDesc}>{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.actions}>
              <a href="#contact" className="btn btn-primary">Let&apos;s Talk</a>
              <a href="#projects" className="btn btn-outline">My Projects</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
