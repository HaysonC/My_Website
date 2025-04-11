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

  // Function to highlight active section based on scroll position
  function highlightActiveSection() {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    const scrollBottom = scrollPosition + windowHeight * 0.5 // Use middle of viewport

    // Get all sections and h3 headings
    const sections = document.querySelectorAll(".blog-section")
    const h3Headings = document.querySelectorAll(".blog-section h3[id]")

    // Check if we're in a main section
    let activeMainSection = null
    let activeMainSectionElement = null

    // First pass: find the active main section
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionBottom = sectionTop + section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeMainSection = sectionId
        activeMainSectionElement = section
      }
    })

    // If no section is active based on scroll position, find the closest one
    if (!activeMainSection && sections.length > 0) {
      let closestSection = sections[0]
      let closestDistance = Math.abs(scrollPosition - closestSection.offsetTop)

      sections.forEach((section) => {
        const distance = Math.abs(scrollPosition - section.offsetTop)
        if (distance < closestDistance) {
          closestDistance = distance
          closestSection = section
        }
      })

      activeMainSection = closestSection.getAttribute("id")
      activeMainSectionElement = closestSection
    }

    // Update main navigation
    if (activeMainSection) {
      // Remove active class from all main links and their parent li
      mainNavLinks.forEach((link) => {
        link.classList.remove("active")
        link.parentElement.classList.remove("active")
      })

      // Add active class to corresponding main link
      const activeLink = document.querySelector(`.sidebar-nav .main-link[href="#${activeMainSection}"]`)
      if (activeLink) {
        activeLink.classList.add("active")
        activeLink.parentElement.classList.add("active")
      }
    }

    // Reset all sub-links
    subNavLinks.forEach((link) => link.classList.remove("active"))

    // If we're in a main section, check for h3 headings
    if (activeMainSectionElement) {
      // Find all h3 headings in the active section
      const sectionH3s = activeMainSectionElement.querySelectorAll("h3[id]")

      // Find the active h3 heading
      let activeSubHeading = null
      let lastVisibleHeading = null

      sectionH3s.forEach((heading) => {
        const headingTop = heading.offsetTop - 120
        const headingId = heading.getAttribute("id")

        // Check if we've scrolled past this heading
        if (scrollPosition >= headingTop) {
          lastVisibleHeading = headingId
        }
      })

      // Use the last visible heading as the active one
      activeSubHeading = lastVisibleHeading

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

  // Smooth scroll to section when page loads with hash
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash)
    if (targetSection) {
      setTimeout(() => {
        window.scrollTo({
          top: targetSection.offsetTop - 20,
          behavior: "smooth",
        })
      }, 100)
    }
  }
})
