"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

// SVG Icons for Contact Details
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.contactIcon}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.contactIcon}
  >
    <path d="m22 16.92-3.46-1.73a2 2 0 0 0-2.3.43l-1.84 2.2a14.7 14.7 0 0 1-6.8-6.8l2.2-1.84a2 2 0 0 0 .43-2.3L8.5 3.42A2 2 0 0 0 6.64 2 2 2 0 0 0 4.6 3.8 20.08 20.08 0 0 0 20.2 19.4a2 2 0 0 0 2.2-2.06 2 2 0 0 0-1.42-1.86" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.contactIcon}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// SVG Icons for Social Media
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Subtle Background Accent */}
      <div className={styles.bgGlow} />

      <div className={styles.container}>
        {/* Main Footer Links */}
        <div className={styles.topGrid}>
          {/* Column 1: Brand Info */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLogo} aria-label="IILM University Home">
              {/* If an SVG logo exists, place it here, otherwise use styled text */}
              <span className={styles.logoText}>IILM University</span>
            </Link>
            <p className={styles.brandDescription}>
              Fostering a dynamic academic community where innovation meets
              tradition. Empowering the architects of tomorrow through quality
              education.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/admissions" className={styles.footerLink}>
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/events" className={styles.footerLink}>
                  Campus Events
                </Link>
              </li>
              <li>
                <Link href="/careers" className={styles.footerLink}>
                  Careers at IILM
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.footerLink}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className={styles.columnTitle}>Resources</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/academics" className={styles.footerLink}>
                  Academic Programs
                </Link>
              </li>
              <li>
                <Link href="/library" className={styles.footerLink}>
                  Digital Library
                </Link>
              </li>
              <li>
                <Link href="/student-portal" className={styles.footerLink}>
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/alumni" className={styles.footerLink}>
                  Alumni Network
                </Link>
              </li>
              <li>
                <Link href="/news" className={styles.footerLink}>
                  News & Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className={styles.columnTitle}>Contact Info</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <LocationIcon />
                <span>
                  1 Knowledge Park II, <br />
                  Greater Noida, UP 201306, India
                </span>
              </li>
              <li className={styles.contactItem}>
                <PhoneIcon />
                <span>+91 123 456 7890</span>
              </li>
              <li className={styles.contactItem}>
                <MailIcon />
                <span>info@iilm.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} IILM University. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.legalLink}>
              Terms of Service
            </Link>
            <Link href="/accessibility" className={styles.legalLink}>
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
