"use client";

import Link from "next/link";
import styles from "./QuickAccess.module.css";

// SVG Icons tailored to Quick Access features
function CalendarIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function NotebookIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 6h4" />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M16 2v20" />
    </svg>
  );
}

function ContactBookIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <circle cx="12" cy="8" r="2.5" />
      <path d="M16.8 15.3A4.7 4.7 0 0 0 12 11.5a4.7 4.7 0 0 0-4.8 3.8" />
    </svg>
  );
}

const DASHBOARD_LINKS = [
  {
    id: 1,
    title: "Class Schedule",
    description: "Access your real-time daily timetable, classroom assignments, and upcoming lecture details.",
    icon: <CalendarIcon />,
    actionLabel: "View Schedule",
    href: "/class-schedule"
  },
  {
    id: 2,
    title: "Course Syllabus",
    description: "Browse detailed course outlines, learning objectives, and recommended study materials.",
    icon: <NotebookIcon />,
    actionLabel: "View Syllabus",
    href: "#"
  },
  {
    id: 3,
    title: "University Directory",
    description: "Connect with faculty, staff, and peers across the university through our centralized directory.",
    icon: <ContactBookIcon />,
    actionLabel: "View Directory",
    href: "#"
  },
];

export default function QuickAccess() {
  return (
    <section className={styles.section} id="quick-access">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Quick Access</h2>
          <p className={styles.subtitle}>
            Navigate essential academic resources instantly. Stay organized and connected
            with your centralized uni-experience dashboard.
          </p>
        </div>

        {/* Feature Grid */}
        <div className={styles.grid}>
          {DASHBOARD_LINKS.map((link) => (
            <div key={link.id} className={styles.card}>
              <div className={styles.iconBox} aria-hidden="true">
                {link.icon}
              </div>
              <h3 className={styles.cardTitle}>{link.title}</h3>
              <p className={styles.cardDescription}>{link.description}</p>
              
              <Link href={link.href} className={styles.actionBtn}>
                {link.actionLabel}
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
