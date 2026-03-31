"use client";

import styles from "./WhyChooseUs.module.css";

// Reusable SVG Icon Components
function BookIcon(props) {
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
    </svg>
  );
}

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
    </svg>
  );
}

function UsersGroupIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// Data array for the grid
const FEATURES = [
  {
    title: "Academic Resources",
    description: "Access schedules, timetables, syllabus, and study materials all in one place.",
    icon: <BookIcon />,
  },
  {
    title: "Event Management",
    description: "Stay updated with all campus events, hackathons, workshops, and seminars.",
    icon: <CalendarIcon />,
  },
  {
    title: "Campus Community",
    description: "Connect with peers, faculty, and industry professionals through our platform.",
    icon: <UsersGroupIcon />,
  },
];

// Reusable card component mapped inside the section
function FeatureCard({ title, description, icon }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox} aria-hidden="true">
        {icon}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <div className={styles.cardFooter}>
        <button className={styles.learnMoreBtn}>
          Learn More
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
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className={styles.section} id="why-choose-us">
      {/* Decorative Background Accents */}
      <div className={styles.decorLeft} aria-hidden="true" />
      <div className={styles.decorRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Our Advantage</span>
          <h2 className={styles.title}>Why Choose Us</h2>
          <p className={styles.subtitle}>
            Discover the IILM advantage. A legacy of excellence, modern
            infrastructure, and industry-aligned programs that set you up for
            success.
          </p>
        </div>

        {/* Feature Grid */}
        <div className={styles.grid}>
          {FEATURES.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
