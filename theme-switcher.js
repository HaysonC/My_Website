document.addEventListener("DOMContentLoaded", () => {
  // Create theme toggle button
  const themeToggle = document.createElement("button")
  themeToggle.id = "theme-toggle"
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  themeToggle.setAttribute("aria-label", "Toggle dark/light mode")
  document.body.appendChild(themeToggle)

  // Check for saved theme preference or use device preference
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  const currentTheme = localStorage.getItem("theme")

  if (currentTheme === "light" || (!currentTheme && !prefersDarkScheme.matches)) {
    document.documentElement.setAttribute("data-theme", "light")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  } else {
    document.documentElement.setAttribute("data-theme", "dark")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark"

    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    } else {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    }
  })
})
