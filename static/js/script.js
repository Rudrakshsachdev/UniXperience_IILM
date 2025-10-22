document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 1000);
  });

  // Particle.js initialization
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#00AEEF", "#FFD700", "#FFFFFF"],
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00AEEF",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  });

  // Header scroll effect
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Back to top button
  const backToTop = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: "power2.inOut",
    });
  });

  // Animations for feature cards
  gsap.utils.toArray(".feature-card").forEach((card) => {
    gsap.to(card, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // Animations for news cards
  gsap.utils.toArray(".news-card").forEach((card) => {
    gsap.to(card, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // Animations for access cards
  gsap.utils.toArray(".access-card").forEach((card) => {
    gsap.to(card, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // Animations for partner cards
  gsap.utils.toArray(".partner-card").forEach((card) => {
    gsap.to(card, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });



//   const filterButtons = document.querySelectorAll(".filter-btn");
//   const newsCards = document.querySelectorAll(".news-card");

//   filterButtons.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const filter = btn.getAttribute("data-filter").toLowerCase();

//     newsCards.forEach((card) => {
//       const tagEl = card.querySelector(".news-tag");
//       if (!tagEl) return; // skip if no tag
//       const tag = tagEl.textContent.trim().toLowerCase();

//       if (filter === "all" || tag === filter) {
//         card.style.display = "block";
//       } else {
//         card.style.display = "none";
//       }
//     });

//     filterButtons.forEach((b) => b.classList.remove("active"));
//     btn.classList.add("active");
//   });
// });





  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavClose = document.querySelector(".mobile-nav-close");
  const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");

  function openMobileMenu() {
    mobileNav.classList.add("active");
    mobileNavOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileNav.classList.remove("active");
    mobileNavOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  mobileMenuBtn.addEventListener("click", openMobileMenu);
  mobileNavClose.addEventListener("click", closeMobileMenu);
  mobileNavOverlay.addEventListener("click", closeMobileMenu);

  // Button hover effects
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-3px)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)";
    });
  });

  // Hero section animation
  gsap.from(".hero-text", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
  });

  gsap.from(".hero-image", {
    duration: 1,
    x: 50,
    opacity: 0,
    delay: 0.5,
    ease: "power3.out",
  });

  // Add subtle animations to section headings
  gsap.utils.toArray(".section-heading").forEach((section) => {
    gsap.from(section, {
      duration: 1,
      y: 30,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
});
