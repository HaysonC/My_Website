document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("h2");
    const wheel = document.createElement("div");
    wheel.classList.add("section-wheel");
    document.body.appendChild(wheel);

    sections.forEach((section, index) => {
        const link = document.createElement("a");
        link.href = `#section-${index}`;
        link.textContent = section.textContent;
        section.id = `section-${index}`;
        link.dataset.index = index;
        wheel.appendChild(link);
    });

    function updatePositionAndHighlight() {
        const lastElement = sections[sections.length - 1];
        const rect = lastElement.getBoundingClientRect();

        if (rect.bottom <= window.innerHeight) {
            // Move upwards when last section is visible
            wheel.style.top = "10px";
        } else {
            // Default middle-right position
            wheel.style.top = "50%";
            wheel.style.transform = "translateY(-50%)";
        }

        // Highlight logic
        let currentActive = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
                currentActive = index;
            }
        });

        document.querySelectorAll(".section-wheel a").forEach((link) => {
            link.classList.remove("active");
        });

        const activeLink = document.querySelector(`.section-wheel a[data-index="${currentActive}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }

    window.addEventListener("scroll", updatePositionAndHighlight);
    updatePositionAndHighlight(); // Run once to set initial state
});
