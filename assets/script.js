document.addEventListener("DOMContentLoaded", function () {
  // Accessible mobile navigation: click, keyboard, Escape, outside-click, and resize.
  const setupNavbar = () => {
    const navbar = document.querySelector("nav");
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");
    const sideNav = document.getElementById("side-nav");
    if (!navbar || !toggle || !menu) return;

    // Existing markup uses a focusable div rather than a native button.
    toggle.setAttribute("role", "button");
    toggle.setAttribute("tabindex", "0");
    toggle.setAttribute("aria-controls", "mobile-menu");

    const isOpen = () => menu.classList.contains("active");
    const setOpen = (open, restoreFocus = false) => {
      menu.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      // Keep the original menu visible while it is open so it can be closed.
      toggle.style.display = window.innerWidth > 1024 ? "none" : "flex";
      if (open) sideNav?.classList.add("hidden");
      if (restoreFocus) toggle.focus();
    };

    const handleScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
      if (window.innerWidth <= 1024 && !isOpen()) {
        sideNav?.classList.toggle("hidden", window.scrollY <= 200);
      }
    };

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setOpen(!isOpen());
    });
    toggle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(!isOpen());
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) setOpen(false, true);
    });
    document.addEventListener("click", (event) => {
      if (isOpen() && !menu.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024 && isOpen()) setOpen(false);
      toggle.style.display = window.innerWidth > 1024 ? "none" : "flex";
      handleScroll();
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    setOpen(false);
    handleScroll();
  };

  setupNavbar();

  // Side nav and back-to-top scroll behavior
  const backToTopButton = document.getElementById("back-to-top");
  const sideNav = document.getElementById("side-nav");

  if (backToTopButton && sideNav) {
    backToTopButton.classList.add("hidden");
    sideNav.classList.add("hidden");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        backToTopButton.classList.remove("hidden");
        if (window.innerWidth > 1024) {
          sideNav.classList.remove("hidden");
        }
      } else {
        backToTopButton.classList.add("hidden");
        if (window.innerWidth > 1024) {
          sideNav.classList.add("hidden");
        }
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Example account forms are not connected to an authentication backend.
  // Prevent accidental submission and never log credentials or personal data.
  ["account-form", "account-create-form"].forEach((id) => {
    document.getElementById(id)?.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });

  // Lazy load background image
  const lazySections = document.querySelectorAll(".join-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.backgroundImage =
            'url("https://res.cloudinary.com/dnptzisuf/image/upload/f_avif,q_auto,w_3600,fl_lossy,c_fill/v1736226778/join-img_vhu2bg.avif")';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  lazySections.forEach((section) => observer.observe(section));

  // Tooltip hover and click support
  document.querySelectorAll(".tooltip").forEach((tooltip) => {
    const tip = tooltip.querySelector(".tooltip-text");
    const h4 = tooltip.querySelector("h4");
    if (!tip || !h4) return;

    let timeout;

    const showTip = () => {
      document.querySelectorAll(".tooltip-text").forEach((el) => {
        el.style.visibility = "hidden";
        el.style.opacity = "0";
      });

      tip.style.visibility = "visible";
      tip.style.opacity = "1";
      h4.style.color = "white";
      h4.style.fontSize = "1.5rem";
      h4.style.textShadow =
        "0.5em 0.5em 1em rgba(11,214,226,0.8), 0.125em 0.125em 0.5em rgba(11,214,226,0.6), 0.375em 0.375em 1.25em rgba(11,214,226,0.4)";

      clearTimeout(timeout);
      timeout = setTimeout(hideTip, 3000);
    };

    const hideTip = () => {
      tip.style.visibility = "hidden";
      tip.style.opacity = "0";
      h4.style.color = "#a6a6a6";
      h4.style.fontSize = "1.2rem";
      h4.style.textShadow = "none";
    };

    h4.addEventListener("mouseenter", showTip);
    h4.addEventListener("mouseleave", hideTip);
    h4.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = tip.style.visibility === "visible";
      isVisible ? hideTip() : showTip();
    });

    document.body.addEventListener("click", (e) => {
      if (!tooltip.contains(e.target)) hideTip();
    });
  });
});