import styles from "./Projects.module.css";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  color: string;
  icon: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-featured online store with real-time inventory, payment processing, and admin dashboard built with Next.js and Stripe.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    color: "#6c63ff",
    icon: "🛒",
    link: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates, drag-and-drop interface, and team collaboration features.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    color: "#ff6584",
    icon: "📋",
    link: "#",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Beautiful data visualization dashboard with interactive charts, real-time metrics, and customizable widgets.",
    tags: ["React", "D3.js", "Express", "Redis"],
    color: "#43e97b",
    icon: "📊",
    link: "#",
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "GPT-powered content generation platform with templates, history management, and export capabilities.",
    tags: ["Next.js", "OpenAI", "Prisma", "TailwindCSS"],
    color: "#ffa551",
    icon: "🤖",
    link: "#",
  },
  {
    id: 5,
    title: "Social Media API",
    description: "RESTful API service with authentication, rate limiting, media uploads, and comprehensive documentation.",
    tags: ["Node.js", "Express", "JWT", "AWS S3"],
    color: "#38b2f5",
    icon: "🌐",
    link: "#",
  },
  {
    id: 6,
    title: "Mobile Banking UI",
    description: "Pixel-perfect mobile banking interface with smooth animations, biometric auth, and transaction history.",
    tags: ["React Native", "TypeScript", "Expo", "Firebase"],
    color: "#b06bff",
    icon: "💳",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section className={`section ${styles.projects}`} id="projects">
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>My Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of projects I&apos;ve built, ranging from full-stack web apps
            to mobile experiences and API services.
          </p>
        </div>
        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.card}>
              <div
                className={styles.cardTop}
                style={{ background: `radial-gradient(circle at 30% 30%, ${project.color}20, transparent 70%), var(--bg-card)` }}
              >
                <div className={styles.cardIcon} style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}>
                  <span>{project.icon}</span>
                </div>
                <div className={styles.cardNumber}>0{project.id}</div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.cardFooter}>
                  <a href={project.link} className={styles.cardLink} style={{ color: project.color }}>
                    View Project
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href={project.link} className={styles.cardGithub}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className={styles.cardGlow} style={{ background: `radial-gradient(circle, ${project.color}20, transparent 70%)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
