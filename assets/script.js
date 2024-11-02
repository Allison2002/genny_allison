document.addEventListener("DOMContentLoaded", function () {
    // Function to load external HTML components
    const loadComponent = (url, elementId) => {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            })
            .catch(error => console.error('Error loading component:', error));
    };

    // Load the navbar and footer
    loadComponent('/assets/nav.html', 'nav');
    loadComponent('/assets/footer.html', 'footer');

    // Back to Top Button
    const topButton = document.getElementById("back-to-top");

    // Show Back to Top Button on Scroll
    window.onscroll = function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    };

    // Scroll to Top on Click
    topButton.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Project Navigation Toggle Functionality
    const projectNavToggle = document.querySelector('.menu-toggle');
    const projectNav = document.getElementById('project-nav');

    if (projectNavToggle && projectNav) {
        projectNavToggle.onclick = function () {
            if (window.innerWidth < 1024) {
                projectNav.classList.toggle('hidden'); // Toggle project-nav on small screens
            }
        };
    }

    // Ensure project-nav is visible on resize for larger screens
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            projectNav.classList.remove('hidden'); // Show project-nav on large screens
        } else {
            projectNav.classList.add('hidden'); // Hide project-nav on smaller screens
        }
    });
});
