document.addEventListener("DOMContentLoaded", () => {
  // Create section wheel navigation
  const sections = document.querySelectorAll("h2")
  if (sections.length > 0) {
    const wheel = document.createElement("div")
    wheel.classList.add("section-wheel")
    document.body.appendChild(wheel)

    sections.forEach((section, index) => {
      // Skip creating navigation for acknowledgment section if it's the first h2
      if (index === 0 && section.closest(".acknowledgment")) {
        return
      }

      const link = document.createElement("a")
      link.href = `#section-${index}`
      link.textContent = section.textContent
      section.id = `section-${index}`
      link.dataset.index = index
      wheel.appendChild(link)
    })

    // Add animation to section wheel
    wheel.style.opacity = "0"
    wheel.style.transform = "translateY(-50%) translateX(50px)"
    setTimeout(() => {
      wheel.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      wheel.style.opacity = "1"
      wheel.style.transform = "translateY(-50%) translateX(0)"
    }, 500)

    function updatePositionAndHighlight() {
      const lastElement = sections[sections.length - 1]
      const rect = lastElement.getBoundingClientRect()

      if (rect.bottom <= window.innerHeight) {
        // Move upwards when last section is visible
        wheel.style.top = "10px"
        wheel.style.transform = "translateY(0)"
      } else {
        // Default middle-right position
        wheel.style.top = "50%"
        wheel.style.transform = "translateY(-50%)"
      }

      // Highlight logic
      let currentActive = 0
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2) {
          currentActive = index
        }
      })

      document.querySelectorAll(".section-wheel a").forEach((link) => {
        link.classList.remove("active")
      })

      const activeLink = document.querySelector(`.section-wheel a[data-index="${currentActive}"]`)
      if (activeLink) {
        activeLink.classList.add("active")

        // Add a subtle animation to the active link
        activeLink.style.transition = "transform 0.3s ease"
        activeLink.style.transform = "translateX(5px)"
        setTimeout(() => {
          activeLink.style.transform = "translateX(0)"
        }, 300)
      }
    }

    // Add smooth scrolling to section links
    wheel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 20,
            behavior: "smooth",
          })

          // Update URL without page reload
          history.pushState(null, null, targetId)
        }
      })
    })

    // Add scroll event listener
    window.addEventListener("scroll", updatePositionAndHighlight)

    // Initial call to set position and highlight
    updatePositionAndHighlight()
  }

  // Add animation to images - FIXED: removed mouseenter/mouseleave events that could cause issues
  const images = document.querySelectorAll(".image-container img, img")
  images.forEach((img) => {
    // Skip small icons or logos
    if (img.width < 100 || img.height < 100) return

    // Add container if not already in one
    if (!img.parentElement.classList.contains("image-container")) {
      const container = document.createElement("div")
      container.classList.add("image-container")
      img.parentNode.insertBefore(container, img)
      container.appendChild(img)
    }
  })

  // Add animation to code blocks - FIXED: removed mouseenter/mouseleave events
  const codeBlocks = document.querySelectorAll("pre, code")

  // Add animation to headings - FIXED: removed mouseenter/mouseleave events
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")

  // Add animation to content sections - FIXED: simplified animation logic
  const contentSections = document.querySelectorAll(".content, .suggested-reading, .acknowledgment, .blog-post-content")
  contentSections.forEach((section) => {
    // Create observer for animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        })
      },
      { threshold: 0.1 },
    )

    // Add initial styles
    section.style.opacity = "0"
    section.style.transform = "translateY(20px)"
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease"

    // Observe section
    observer.observe(section)
  })

  // Check if there's a hash in the URL and scroll to that section
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash)
    if (targetSection) {
      setTimeout(() => {
        window.scrollTo({
          top: targetSection.offsetTop - 20,
          behavior: "smooth",
        })
      }, 300)
    }
  }
})
