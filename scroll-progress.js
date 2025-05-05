document.addEventListener("DOMContentLoaded", () => {
  // Create progress bar
  const progressBar = document.createElement("div")
  progressBar.id = "scroll-progress"
  document.body.appendChild(progressBar)

  // Update progress bar width on scroll
  window.addEventListener("scroll", () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (window.scrollY / windowHeight) * 100
    progressBar.style.width = scrolled + "%"
  })
})
