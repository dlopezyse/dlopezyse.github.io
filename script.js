document.addEventListener("DOMContentLoaded", function () {
    const articleList = document.getElementById("article-list");
    const categoryFilter = document.getElementById("category-filter");

    fetch("articles.json")
        .then(response => response.json())
        .then(articles => {
            articles.sort((a, b) => new Date(b.date) - new Date(a.date));
            displayArticles(articles);

            categoryFilter.addEventListener("change", () => {
                const selectedCategory = categoryFilter.value;
                const filteredArticles = selectedCategory === "all" 
                    ? articles 
                    : articles.filter(article => article.category === selectedCategory);
                displayArticles(filteredArticles);
            });
        })
        .catch(error => console.error("Error loading articles:", error));

    function displayArticles(articles) {
        articleList.innerHTML = "";
        articles.forEach(article => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a> - ${article.date}`;
            articleList.appendChild(listItem);
        });
    }
});
