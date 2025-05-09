// Mobile navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  // Create mobile navigation toggle button if it doesn't exist
  if (!document.querySelector(".mobile-nav-toggle")) {
    const navToggle = document.createElement("button")
    navToggle.className = "mobile-nav-toggle"
    navToggle.innerHTML = '<i class="fas fa-bars"></i>'
    navToggle.setAttribute("aria-label", "Toggle Navigation")
    document.body.appendChild(navToggle)

    // Create mobile navigation menu
    const mobileNav = document.createElement("div")
    mobileNav.className = "mobile-nav"

    // Add close button
    const closeBtn = document.createElement("span")
    closeBtn.className = "mobile-nav-close"
    closeBtn.innerHTML = '<i class="fas fa-times"></i>'
    mobileNav.appendChild(closeBtn)

    // Get all main navigation links
    const mainLinks = []

    // Check if we're on the home page
    if (document.querySelector(".nav-buttons")) {
      const navButtons = document.querySelectorAll(".nav-buttons a")
      navButtons.forEach((link) => {
        mainLinks.push({
          text: link.textContent.trim(),
          href: link.getAttribute("href"),
        })
      })
    }

    // If no links were found, add default links
    if (mainLinks.length === 0) {
      mainLinks.push(
        { text: "Home", href: "/index.html" },
        { text: "CV", href: "/CV/index.html" },
        { text: "Projects", href: "/ProjectPosts/index.html" },
        { text: "Notes", href: "/github-viewer.html" },
      )
    }

    // Add links to mobile navigation
    mainLinks.forEach((link) => {
      const a = document.createElement("a")
      a.textContent = link.text
      a.href = link.href
      mobileNav.appendChild(a)
    })

    document.body.appendChild(mobileNav)

    // Toggle mobile navigation
    navToggle.addEventListener("click", () => {
      mobileNav.classList.add("active")
      document.body.style.overflow = "hidden" // Prevent scrolling when menu is open
    })

    // Close mobile navigation
    closeBtn.addEventListener("click", () => {
      mobileNav.classList.remove("active")
      document.body.style.overflow = "" // Restore scrolling
    })

    // Close mobile navigation when a link is clicked
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active")
        document.body.style.overflow = "" // Restore scrolling
      })
    })
  }

  // Touch-friendly improvements
  const makeElementsTouchFriendly = () => {
    // Increase touch target size for small buttons and links
    const smallClickables = document.querySelectorAll(".social-icon, .file-tree a, .tag, .webring-arrow")
    smallClickables.forEach((el) => {
      if (window.innerWidth <= 768) {
        el.style.padding = el.classList.contains("tag") ? "6px 12px" : "10px"
        el.style.margin = "2px"
      }
    })

    // Add active state for touch feedback
    const allClickables = document.querySelectorAll("a, button, .cyber-button, .social-icon")
    allClickables.forEach((el) => {
      el.addEventListener("touchstart", function () {
        this.classList.add("touch-active")
      })
      el.addEventListener("touchend", function () {
        this.classList.remove("touch-active")
      })
    })
  }

  makeElementsTouchFriendly()

  // Handle orientation changes
  window.addEventListener("orientationchange", () => {
    // Small delay to ensure the orientation change is complete
    setTimeout(() => {
      makeElementsTouchFriendly()
    }, 300)
  })

  // Optimize images for mobile
  const optimizeImagesForMobile = () => {
    if (window.innerWidth <= 768) {
      const images = document.querySelectorAll("img:not([data-mobile-optimized])")
      images.forEach((img) => {
        // Save original src for potential high-res display later
        if (!img.getAttribute("data-original-src")) {
          img.setAttribute("data-original-src", img.src)
        }

        // Mark as optimized to avoid reprocessing
        img.setAttribute("data-mobile-optimized", "true")

        // Add loading="lazy" for better performance
        img.setAttribute("loading", "lazy")
      })
    }
  }

  optimizeImagesForMobile()

  // Detect swipe gestures for navigation
  let touchStartX = 0
  let touchEndX = 0

  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
    },
    false,
  )

  document.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    },
    false,
  )

  const handleSwipe = () => {
    const swipeThreshold = 100 // Minimum distance for a swipe

    if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right - go back
      const backBtn = document.querySelector(".back-home-btn")
      if (backBtn) backBtn.click()
    } else if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left - could be used for forward navigation if needed
    }
  }
})
