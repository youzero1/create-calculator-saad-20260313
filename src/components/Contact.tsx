"use client";
import { useState } from "react";
import styles from "./Contact.module.css";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface SubmitState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState({ status: "loading", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setSubmitState({ status: "success", message: data.message || "Message sent successfully!" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setSubmitState({ status: "error", message: data.error || "Something went wrong. Please try again." });
      }
    } catch {
      setSubmitState({ status: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <div className={styles.header}>
          <p className={styles.eyebrow}>Contact</p>
          <h2 className="section-title">Let&apos;s Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
            Drop me a message and I&apos;ll get back to you as soon as possible.
          </p>
        </div>
        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>Email</div>
                  <div className={styles.infoValue}>alex@example.com</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>Location</div>
                  <div className={styles.infoValue}>San Francisco, CA</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>Response Time</div>
                  <div className={styles.infoValue}>Within 24 hours</div>
                </div>
              </div>
            </div>
            <div className={styles.availabilityCard}>
              <div className={styles.availDot} />
              <div>
                <div className={styles.availTitle}>Currently Available</div>
                <div className={styles.availDesc}>Open to full-time and freelance opportunities</div>
              </div>
            </div>
          </div>
          <div className={styles.formWrap}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className={styles.input}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or just say hi..."
                  required
                  rows={6}
                  className={styles.textarea}
                />
              </div>
              {submitState.status !== "idle" && (
                <div className={`${styles.alert} ${styles[submitState.status]}`}>
                  {submitState.status === "loading" && (
                    <div className={styles.spinner} />
                  )}
                  {submitState.status === "success" && "✅"}
                  {submitState.status === "error" && "❌"}
                  <span>{submitState.status === "loading" ? "Sending your message..." : submitState.message}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={submitState.status === "loading"}
                className={`btn btn-primary ${styles.submitBtn}`}
              >
                {submitState.status === "loading" ? (
                  <>
                    <div className={styles.spinnerSmall} />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22,2 15,22 11,13 2,9" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
