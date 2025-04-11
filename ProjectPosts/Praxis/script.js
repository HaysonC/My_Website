document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const sidebar = document.querySelector(".sidebar")
  const content = document.querySelector(".content")
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const mainNavLinks = document.querySelectorAll(".sidebar-nav .main-link")
  const subNavLinks = document.querySelectorAll(".sidebar-nav .sub-link")
  const citationLinks = document.querySelectorAll(".citation-link")
  const dropdowns = document.querySelectorAll(".dropdown")

  // Set initial state
  if (window.innerWidth <= 768) {
    sidebar.classList.add("collapsed")
    content.classList.add("expanded")
  }

  // Toggle sidebar
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed")
    content.classList.toggle("expanded")
  })

  // Highlight active section on scroll
  window.addEventListener("scroll", highlightActiveSection)

  // Toggle sub-navigation when clicking main links
  mainNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)
      const parentLi = this.parentElement

      if (targetSection) {
        // Smooth scroll to target section
        window.scrollTo({
          top: targetSection.offsetTop - 20,
          behavior: "smooth",
        })

        // Toggle active state for parent li
        const isActive = parentLi.classList.contains("active")

        // Close all other sub-navs
        document.querySelectorAll(".sidebar-nav > li").forEach((li) => {
          if (li !== parentLi) li.classList.remove("active")
        })

        // Toggle current sub-nav
        if (!isActive) {
          parentLi.classList.add("active")
        }

        // Update active link
        mainNavLinks.forEach((link) => link.classList.remove("active"))
        this.classList.add("active")

        // Close sidebar on mobile after clicking
        if (window.innerWidth <= 768) {
          sidebar.classList.add("collapsed")
          content.classList.add("expanded")
        }
      }
    })
  })

  // Smooth scroll for sub-navigation links
  subNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        // Smooth scroll to target section
        window.scrollTo({
          top: targetSection.offsetTop - 20,
          behavior: "smooth",
        })

        // Update active link
        subNavLinks.forEach((link) => link.classList.remove("active"))
        this.classList.add("active")

        // Close sidebar on mobile after clicking
        if (window.innerWidth <= 768) {
          sidebar.classList.add("collapsed")
          content.classList.add("expanded")
        }
      }
    })
  })

  // Citation link smooth scroll with highlight
  citationLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetRef = document.querySelector(targetId)

      if (targetRef) {
        // Smooth scroll to reference
        window.scrollTo({
          top: targetRef.offsetTop - 50,
          behavior: "smooth",
        })

        // Add highlight effect
        targetRef.classList.add("highlight")

        // Remove highlight after 2 seconds
        setTimeout(() => {
          targetRef.classList.remove("highlight")
        }, 2000)
      }
    })
  })

  // Dropdown functionality
  dropdowns.forEach((dropdown) => {
    const header = dropdown.querySelector(".dropdown-header")
    const content = dropdown.querySelector(".dropdown-content")

    header.addEventListener("click", () => {
      // Toggle active class
      dropdown.classList.toggle("active")

      // Update aria-expanded attribute
      const isExpanded = dropdown.classList.contains("active")
      header.setAttribute("aria-expanded", isExpanded)
    })
  })

  // Mobile sidebar toggle
  if (window.innerWidth <= 576) {
    const mobileToggle = document.createElement("button")
    mobileToggle.id = "mobile-toggle"
    mobileToggle.innerHTML = "<span></span>"
    mobileToggle.style.cssText = `
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 20;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `

    document.body.appendChild(mobileToggle)

    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
    })
  }

  // Function to highlight active section based on scroll position
  function highlightActiveSection() {
    const scrollPosition = window.scrollY

    // Get all sections and h3 headings
    const sections = document.querySelectorAll(".blog-section")
    const h3Headings = document.querySelectorAll(".blog-section h3[id]")

    // Check if we're in a main section
    let activeMainSection = null
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all main links
        mainNavLinks.forEach((link) => link.classList.remove("active"))

        // Add active class to corresponding main link
        const activeLink = document.querySelector(`.sidebar-nav .main-link[href="#${sectionId}"]`)
        if (activeLink) {
          activeLink.classList.add("active")
          activeMainSection = sectionId

          // Open the sub-nav for this section
          const parentLi = activeLink.parentElement
          document.querySelectorAll(".sidebar-nav > li").forEach((li) => {
            li.classList.remove("active")
          })
          parentLi.classList.add("active")
        }
      }
    })

    // If we're in a main section, check for h3 headings
    if (activeMainSection) {
      // Reset all sub-links
      subNavLinks.forEach((link) => link.classList.remove("active"))

      // Find the active h3 heading
      let activeSubHeading = null
      h3Headings.forEach((heading) => {
        const headingTop = heading.offsetTop - 120
        const headingId = heading.getAttribute("id")

        // Check if this heading is in the active main section
        const headingSection = heading.closest(".blog-section")
        if (headingSection && headingSection.id === activeMainSection) {
          // Check if we've scrolled past this heading
          if (scrollPosition >= headingTop) {
            activeSubHeading = headingId
          }
        }
      })

      // Highlight the active sub-link
      if (activeSubHeading) {
        const activeSubLink = document.querySelector(`.sidebar-nav .sub-link[href="#${activeSubHeading}"]`)
        if (activeSubLink) {
          activeSubLink.classList.add("active")
        }
      }
    }
  }

  // Initial call to highlight active section
  highlightActiveSection()

  // Close sidebar when clicking outside on mobile/tablet
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 768 &&
      !sidebar.contains(e.target) &&
      e.target !== sidebarToggle &&
      !sidebarToggle.contains(e.target)
    ) {
      sidebar.classList.add("collapsed")
      content.classList.add("expanded")
    }
  })
})
