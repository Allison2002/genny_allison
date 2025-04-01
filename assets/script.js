document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.getElementById("nav");
    const footerContainer = document.getElementById("footer");
    const backToTopButton = document.getElementById("back-to-top");
    const sideNav = document.getElementById("side-nav");

    // Dynamically load navigation
    if (navContainer) {
        fetch("/assets/nav.html")
            .then(response => response.text())
            .then(data => {
                navContainer.innerHTML = data;
                initializeMenus(); // Initialize menus after loading
            })
            .catch(error => console.error("Error loading navigation:", error));
    }

    // Dynamically load footer
    if (footerContainer) {
        fetch("/assets/footer.html")
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error("Error loading footer:", error));
    }

    // Initialize menus
    function initializeMenus() {
        const menuToggle = document.querySelector(".menu-toggle");
        const hamburgerNavLinks = document.querySelector(".hamburger-nav-links");
        const navLinks = document.querySelector(".nav-links"); // Regular navbar links

        if (menuToggle && hamburgerNavLinks) {
            // Toggle hamburger menu on click
            menuToggle.addEventListener("click", function (event) {
                event.stopPropagation(); // Prevent click from propagating to body
                hamburgerNavLinks.classList.toggle("active"); // Toggle the 'active' class to show/hide the menu
            });

            // Close hamburger menu when clicking outside
            document.body.addEventListener("click", function (event) {
                if (!hamburgerNavLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                    hamburgerNavLinks.classList.remove("active");
                }
            });

            // Close the menu on page load by removing the 'active' class
            hamburgerNavLinks.classList.remove("active");

            // Ensure proper visibility on window resize
            window.addEventListener("resize", function () {
                if (window.innerWidth > 768) {
                    hamburgerNavLinks.classList.remove("active");
                }
            });
        }
    }

    // Show/Hide Back to Top and Side Navigation on scroll
    if (backToTopButton && sideNav) {
        // Initially hide both elements
        backToTopButton.classList.add("hidden");
        sideNav.classList.add("hidden");

        window.addEventListener("scroll", function () {
            if (window.scrollY > 200) {
                backToTopButton.classList.remove("hidden");
                if (window.innerWidth > 768) {
                    sideNav.classList.remove("hidden");
                }
            } else {
                backToTopButton.classList.add("hidden");
                sideNav.classList.add("hidden");
            }
        });

        // Scroll to top on click
        backToTopButton.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Tooltip functionality
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => {
            const tooltipText = tooltip.querySelector('.tooltip-text');
            const tooltipH4 = tooltip.querySelector('h4');

            tooltipH4.addEventListener('mouseenter', () => {
                // Show tooltip when hovering over h4
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            });

            tooltipH4.addEventListener('mouseleave', () => {
                // Hide tooltip when mouse leaves h4
                tooltipText.style.visibility = 'hidden';
                tooltipText.style.opacity = '0';
            });
        });
    });




});
