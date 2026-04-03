"use client";

import React, { useState, useEffect } from "react";
import styles from "./ClassSchedule.module.css";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function ClassSchedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [activeDay, setActiveDay] = useState("Monday");
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");

  const YEARS = ["All", "Year 1", "Year 2", "Year 3", "Year 4"];
  const SEMESTERS = ["All", "Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

  useEffect(() => {
    // Determine the current day of the week to set as default active tab
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday...
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      setActiveDay(DAYS[dayOfWeek - 1]);
    }

    // Fetch schedule
    const fetchSchedule = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/schedule");
        const json = await res.json();
        if (json.status === "success") {
          setScheduleData(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Filter out the active day's classes and apply year/semester filters
  const activeDayData = scheduleData.find((d) => d.day === activeDay)?.classes || [];
  const activeClasses = activeDayData.filter((cls) => {
    const matchYear = selectedYear === "All" || cls.year === selectedYear;
    const matchSemester = selectedSemester === "All" || cls.semester === selectedSemester;
    return matchYear && matchSemester;
  });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.maxW}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Class Schedule</h1>
          <p className={styles.subtitle}>
            Stay on top of your daily goals with your personalized timeline.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <label htmlFor="yearFilter">Year:</label>
            <select
              id="yearFilter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={styles.filterSelect}
            >
              {YEARS.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="semesterFilter">Semester:</label>
            <select
              id="semesterFilter"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className={styles.filterSelect}
            >
              {SEMESTERS.map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Day Navigator */}
        <div className={styles.daySelector}>
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`${styles.dayBtn} ${
                activeDay === day ? styles.activeDay : ""
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timeline View */}
        {loading ? (
          <div className={styles.loading}>Loading schedule...</div>
        ) : (
          <div className={styles.timeline}>
            {activeClasses.length > 0 ? (
              activeClasses.map((cls) => (
                <div key={cls.id} className={styles.timelineItem}>
                  <div className={styles.timeCol}>
                    <span className={styles.timeText}>{cls.time.split(" - ")[0]}</span>
                    <div className={styles.dot}></div>
                  </div>
                  <div className={styles.card}>
                    <div className={styles.cardHeader}>
                      <div className={styles.courseWrap}>
                        <h3 className={styles.courseName}>{cls.course}</h3>
                        <span
                          className={`${styles.typeBadge} ${
                            cls.type === "Lecture"
                              ? styles.badgeLecture
                              : cls.type === "Lab"
                              ? styles.badgeLab
                              : styles.badgeSeminar
                          }`}
                        >
                          {cls.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.cardDetails}>
                      <div className={styles.detailItem}>
                        <svg
                          className={styles.detailIcon}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                          <path d="M12 14v4" />
                          <path d="M10 16h4" />
                        </svg>
                        {cls.time}
                      </div>

                      <div className={styles.detailItem}>
                        <svg
                          className={styles.detailIcon}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {cls.room}
                      </div>

                      <div className={styles.detailItem}>
                        <svg
                          className={styles.detailIcon}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        {cls.professor}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>You have no classes scheduled for {activeDay}. Enjoy your day!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
