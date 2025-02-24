document.addEventListener("DOMContentLoaded", function () {
    // Get the tag from the URL
    const params = new URLSearchParams(window.location.search);
    const selectedTag = params.get("tag");

    if (!selectedTag) {
        document.getElementById("filtered-articles").innerHTML = "<p>No tag selected.</p>";
        return;
    }

    // Set the title for the page header
    document.getElementById("tag-title").innerText = selectedTag;

    // Fetch all articles from the 'ProjectPosts' directory
    fetch("ProjectPosts/articles.json") // Ensure the JSON file is in the correct path
        .then(response => response.json())
        .then(articles => {
            // Filter articles that contain the selected tag
            const filteredArticles = articles.filter(article => article.tags.includes(selectedTag));

            if (filteredArticles.length === 0) {
                document.getElementById("filtered-articles").innerHTML = `<p>No articles found for '${selectedTag}'.</p>`;
                return;
            }

            // Generate the article HTML
            document.getElementById("filtered-articles").innerHTML = filteredArticles.map(article => `
                <article class="blog-post">
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <div class="tags">
                        ${article.tags.map(tag => `<a href="article-tag?tag=${encodeURIComponent(tag)}"><span class="tag">${tag}</span></a>`).join("")}
                    </div>
                    <a href="${article.link}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </article>
            `).join("");
        })
        .catch(error => console.error("Error fetching articles:", error));
});
