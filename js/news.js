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
        // console.log(category);
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
    displayNews(data.data);
}

const displayNews = (allNews) => {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = '';

    for (const news of allNews) {
        console.log(news);
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("row");
        newsDiv.innerHTML = `
        <div class="col-md-4">
            <img src=${news.image_url} class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
           <div class="card-body">
               <h5 class="card-title">${news.title}</h5>
               <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.p>
               <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
        
        `;
        newsContainer.appendChild(newsDiv);

    }
}

// loadNews();




loadCategory();