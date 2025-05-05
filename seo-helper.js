// Simple SEO helper script
document.addEventListener("DOMContentLoaded", () => {
  // Check if page has proper meta tags
  const metaTags = {
    description: document.querySelector('meta[name="description"]'),
    keywords: document.querySelector('meta[name="keywords"]'),
    robots: document.querySelector('meta[name="robots"]'),
  }

  // Check heading structure
  const headings = {
    h1: document.querySelectorAll("h1"),
    h2: document.querySelectorAll("h2"),
    h3: document.querySelectorAll("h3"),
  }

  // Log SEO status to console (for development)
  console.log("SEO Status:", {
    "Has Description": !!metaTags.description,
    "Has Keywords": !!metaTags.keywords,
    "Has Robots": !!metaTags.robots,
    "H1 Count": headings.h1.length,
    "H2 Count": headings.h2.length,
    "H3 Count": headings.h3.length,
  })

  // Check for broken links
  const links = document.querySelectorAll("a")
  links.forEach((link) => {
    if (link.href && link.href.startsWith(window.location.origin)) {
      const img = new Image()
      img.src = link.href
      img.onerror = () => {
        console.warn("Potential broken link:", link.href)
      }
    }
  })
})
