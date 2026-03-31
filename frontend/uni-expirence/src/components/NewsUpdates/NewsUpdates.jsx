"use client";

import styles from "./NewsUpdates.module.css";

// Dummy Data for News & Updates
const NEWS_ITEMS = [
  {
    id: 1,
    isFeatured: true,
    date: "March 24, 2024",
    category: "Announcements",
    title: "IILM University Launches Center of Excellence in Artificial Intelligence",
    description:
      "In collaboration with global tech leaders, IILM unveils a state-of-the-art AI center aimed at fostering innovation, funding student tech startups, and equipping our community with future-ready skills. The new facility will house advanced computing clusters and robotics labs.",
    // Using a CSS gradient placeholder for robust rendering without external images
    imageGradient: "linear-gradient(135deg, #1e3a5f 0%, #2a5286 50%, #a12a2f 100%)",
  },
  {
    id: 2,
    isFeatured: false,
    date: "March 18, 2024",
    category: "Events",
    title: "Annual Cultural Fest 'Ignite' Dates Announced",
    description:
      "Get ready for the biggest event of the year! Join us for a week of cultural celebrations, competitions, and live performances by renowned artists.",
    imageGradient: "linear-gradient(135deg, #1e3a5f 0%, #0f1c2e 100%)",
  },
  {
    id: 3,
    isFeatured: false,
    date: "March 12, 2024",
    category: "Academics",
    title: "Global Guest Lecture Series: The Future of Finance",
    description:
      "Top industry experts from Fortune 500 companies will discuss the impact of fintech, AI, and blockchain on global markets.",
    imageGradient: "linear-gradient(135deg, #a12a2f 0%, #5c181b 100%)",
  },
];

// Reusable News Card Component
function NewsCard({ item }) {
  const cardClass = item.isFeatured
    ? `${styles.card} ${styles.featuredCard}`
    : `${styles.card} ${styles.standardCard}`;

  return (
    <article className={cardClass}>
      {/* Thumbnail Wrapper */}
      <div className={styles.imageWrapper}>
        <div
          className={styles.imagePlaceholder}
          style={{ background: item.imageGradient }}
          aria-label={`Thumbnail for ${item.title}`}
        />
      </div>

      {/* Content Wrapper */}
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{item.category}</span>
          <span className={styles.date}>{item.date}</span>
        </div>

        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardDescription}>{item.description}</p>

        <button className={styles.readMoreBtn} aria-label={`Read more about ${item.title}`}>
          <span className={styles.btnOuterArea}>Read article</span>
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
    </article>
  );
}

export default function NewsUpdates() {
  const featuredItem = NEWS_ITEMS.find((item) => item.isFeatured);
  const regularItems = NEWS_ITEMS.filter((item) => !item.isFeatured);

  return (
    <section className={styles.section} id="news-updates">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Happenings</span>
          <h2 className={styles.title}>News & Updates</h2>
          <p className={styles.subtitle}>
            Stay informed with the latest announcements, campus events, and
            academic achievements from the IILM community.
          </p>
        </div>

        {/* Magazine-style Layout */}
        <div className={styles.magazineLayout}>
          {/* Left: Featured Large Card */}
          {featuredItem && (
            <div className={styles.featuredWrapper}>
              <NewsCard item={featuredItem} />
            </div>
          )}

          {/* Right: Stacked List of Smaller Cards */}
          <div className={styles.listWrapper}>
            <div className={styles.listHeader}>
              <h3>More Updates</h3>
              <a href="#" className={styles.viewAllBtn}>View All →</a>
            </div>
            <div className={styles.listContainer}>
              {regularItems.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
