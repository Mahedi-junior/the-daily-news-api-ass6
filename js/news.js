const loadCategory = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = categories => {
    // console.log(categories);
    const categoriesContainer = document.getElementById("categories-container");
    categories.forEach(category => {
        console.log(category);
        const ulDiv = document.createElement("ul");
        ulDiv.classList.add("navbar-nav");
        ulDiv.innerHTML = `
        <li class="mx-2 fs-5 p-2 fw-semibold">
        <a onclick="loadNews('${category.category_id}')" class="nav-link" href="#">${category.category_name}</a>
        </li>
        `;
        categoriesContainer.appendChild(ulDiv);

    });
}

const loadNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data[0]);
}

const displayNews = (news) => {
    console.log(news);
}

// loadNews();




loadCategory();