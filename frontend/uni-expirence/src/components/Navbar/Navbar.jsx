"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import logoimg from "../../public/iilm-logo.png";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/events", label: "Events" },
  { href: "/faculty", label: "Faculty" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Scroll-aware shadow enhancement ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  const navCls = [styles.navbar, scrolled ? styles.navbarScrolled : ""]
    .filter(Boolean)
    .join(" ");

  const panelCls = [styles.panel, menuOpen ? styles.panelOpen : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={navCls}>
      <nav className={styles.navContainer} aria-label="Primary navigation">
        {/* ── Left: Brand ── */}
        <Link
          href="/"
          className={styles.navLogo}
          aria-label="IILM University — UniXperience home"
          onClick={closeMenu}
        >
          <Image
            src={logoimg}
            alt="IILM University Logo"
            width={140}
            height={44}
            className={styles.logoImage}
            style={{ width: "auto", height: "auto" }}
            priority
          />
          <span className={styles.logoSeparator} aria-hidden="true">
            |
          </span>
          <span className={styles.logoText}>UniXperience</span>
        </Link>

        {/* ── Center: Navigation links (desktop) ── */}
        <div className={styles.navLinks}>
          {NAV_LINKS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* ── Right: Auth buttons (desktop) ── */}
        <div className={styles.authButtons}>
          <Link href="/login" className={styles.loginBtn}>
            Log In
          </Link>
          <Link href="/register" className={styles.registerBtn}>
            Register
          </Link>
        </div>

        {/* ── Hamburger button (mobile) ── */}
        <button
          type="button"
          className={`${styles.menuBtn} ${
            menuOpen ? styles.menuBtnOpen : ""
          }`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </span>
        </button>
      </nav>

      {/* ── Mobile panel ── */}
      <div id="mobile-navigation" className={panelCls}>
        <div
          className={styles.overlay}
          aria-hidden="true"
          onClick={closeMenu}
        />
        <div className={styles.panelInner}>
          {/* Close button inside drawer */}
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>

          <ul className={styles.mobileLinks} role="list">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.mobileLink} ${
                      isActive ? styles.mobileLinkActive : ""
                    }`}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.mobileAuth}>
            <Link
              href="/login"
              className={styles.loginBtn}
              onClick={closeMenu}
            >
              Log In
            </Link>
            <Link
              href="/register"
              className={styles.registerBtn}
              onClick={closeMenu}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
