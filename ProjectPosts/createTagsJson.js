const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Read the HTML file
const htmlFilePath = "ProjectPosts/index.html";
const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");

// Parse the HTML with jsdom
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

let articles = [];

document.querySelectorAll(".blog-post").forEach((article) => {
    let title = article.querySelector("h2")?.textContent || "Untitled";
    let description = article.querySelector("p")?.textContent || "No description";
    let link = article.querySelector(".read-more")?.getAttribute("href") || "#";

    let tags = [];
    article.querySelectorAll(".tags .tag").forEach((tag) => {
        tags.push(tag.textContent);
    });

    articles.push({ title, description, tags, link });
});

// Convert to JSON
const jsonData = JSON.stringify(articles, null, 2);

// Ensure the 'ProjectPosts' directory exists
const outputDir = "ProjectPosts";
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Write the JSON file
fs.writeFileSync(`${outputDir}/articles.json`, jsonData, "utf-8");

console.log("✅ Articles JSON generated successfully in ProjectPosts/articles.json");
