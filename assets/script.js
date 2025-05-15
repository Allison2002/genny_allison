document.addEventListener("DOMContentLoaded", function () {
  // Load components dynamically
  const loadComponent = (url, elementId) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then((data) => {
        document.getElementById(elementId).innerHTML = data;
        if (elementId === "nav") {
          setupNavbar();
          initializeMenus();
        }
      })
      .catch((error) => console.error("Error loading component:", error));
  };

  loadComponent("/assets/nav.html", "nav");
  loadComponent("/assets/footer.html", "footer");

  // Navbar toggle and scroll
  const setupNavbar = () => {
    const navbar = document.querySelector("nav");
    const hamburgerIcon = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (!hamburgerIcon || !navMenu) return;

    const handleScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    };

    const updateHamburgerVisibility = () => {
      hamburgerIcon.style.display =
        window.innerWidth > 1024 || navMenu.classList.contains("active")
          ? "none"
          : "flex";
    };

    hamburgerIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      updateHamburgerVisibility();
    });

    window.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !hamburgerIcon.contains(e.target)) {
        navMenu.classList.remove("active");
        updateHamburgerVisibility();
      }
    });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHamburgerVisibility);
    updateHamburgerVisibility();
    hamburgerIcon.setAttribute("aria-expanded", "false");
  };

  // Hamburger menu toggle
  const initializeMenus = () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const hamburgerNavLinks = document.querySelector(".hamburger-nav-links");

    if (menuToggle && hamburgerNavLinks) {
      menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburgerNavLinks.classList.toggle("active");
      });

      document.body.addEventListener("click", (e) => {
        if (!hamburgerNavLinks.contains(e.target) && !menuToggle.contains(e.target)) {
          hamburgerNavLinks.classList.remove("active");
        }
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          hamburgerNavLinks.classList.remove("active");
        }
      });
    }
  };

  // Side nav and back-to-top scroll behavior
  const backToTopButton = document.getElementById("back-to-top");
  const sideNav = document.getElementById("side-nav");

  if (backToTopButton && sideNav) {
    backToTopButton.classList.add("hidden");
    sideNav.classList.add("hidden");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        backToTopButton.classList.remove("hidden");
        sideNav.classList.remove("hidden"); // ← now works on all screen sizes
      } else {
        backToTopButton.classList.add("hidden");
        sideNav.classList.add("hidden");
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Login form
  const loginForm = document.getElementById("account-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Login:", {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      });
    });
  }

  // Account form
  const accountForm = document.getElementById("account-create-form");
  if (accountForm) {
    accountForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Account Created:", {
        fullName: document.getElementById("full-name").value,
        dob: document.getElementById("dob").value,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      });
    });
  }

  // Lazy load background image
  const lazySections = document.querySelectorAll(".join-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.backgroundImage =
            'url("https://res.cloudinary.com/dnptzisuf/image/upload/f_avif,q_auto,w_3600,fl_lossy,c_fill,/v1736226778/join-img_vhu2bg.avif")';
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
