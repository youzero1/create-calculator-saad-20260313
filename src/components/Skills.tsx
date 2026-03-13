import styles from "./Skills.module.css";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React / Next.js", level: 95, color: "#6c63ff" },
      { name: "TypeScript", level: 90, color: "#38b2f5" },
      { name: "CSS / Tailwind", level: 88, color: "#ff6584" },
      { name: "Vue.js", level: 75, color: "#43e97b" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js / Express", level: 92, color: "#43e97b" },
      { name: "Python / FastAPI", level: 82, color: "#ffa551" },
      { name: "PostgreSQL", level: 85, color: "#38b2f5" },
      { name: "GraphQL", level: 78, color: "#ff6584" },
    ],
  },
  {
    category: "DevOps & Tools",
    icon: "🔧",
    skills: [
      { name: "Docker / K8s", level: 80, color: "#38b2f5" },
      { name: "AWS / GCP", level: 78, color: "#ffa551" },
      { name: "Git / CI/CD", level: 90, color: "#6c63ff" },
      { name: "Linux", level: 85, color: "#43e97b" },
    ],
  },
];

const techBadges = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Python", "PostgreSQL", "MongoDB", "Redis", "Docker",
  "AWS", "GraphQL", "REST APIs", "Git", "Figma",
  "Tailwind CSS", "Jest", "Cypress",
];

export default function Skills() {
  return (
    <section className={`section ${styles.skills}`} id="skills">
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Expertise</p>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical skills and the tools I use
            to build exceptional products.
          </p>
        </div>
        <div className={styles.grid}>
          {skillCategories.map((cat) => (
            <div key={cat.category} className={`card ${styles.card}`}>
              <div className={styles.catHeader}>
                <span className={styles.catIcon}>{cat.icon}</span>
                <h3 className={styles.catTitle}>{cat.category}</h3>
              </div>
              <div className={styles.skillList}>
                {cat.skills.map((skill) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillTop}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel} style={{ color: skill.color }}>{skill.level}%</span>
                    </div>
                    <div className={styles.bar}>
                      <div
                        className={styles.barFill}
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.badgesSection}>
          <h3 className={styles.badgesTitle}>Also experienced with</h3>
          <div className={styles.badges}>
            {techBadges.map((tech) => (
              <span key={tech} className={styles.badge}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
