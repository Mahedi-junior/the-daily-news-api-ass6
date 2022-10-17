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
        newsDiv.classList.add("row", "border", "p-3", "mb-5", "bg-light");


        newsDiv.innerHTML = `
        <div class="col-md-4">
            <img src=${news.image_url} class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
           <div class="card-body px-2">
               <h5 class="card-title mb-3 mt-1">${news.title}</h5>
               <p class="fst-norma">${news.details.slice(0, 200)}.</p>
               <p>${news.details.slice(200, 300)}....see more.</p>

               <div class="d-flex align-items-center justify-content-between text-muted">
                   <div class="d-flex align-items-center">
                     <img src=${news.author.img} width="50" height="50" class="rounded-circle align-items-center">
                     <div class="px-2 ">
                       <span class="fw-semibold">${news.author.name}</span><br>
                       <span>${news.author.published_date}</span>
                     </div>
                   </div>
                   <div>
                      <span class="fw-semibold"><i class="fa-solid fa-eye mx-1"></i> ${news.total_view}M </span>
                   </div>
                   <div>
                   <span><i class="fa-solid fa-star"></i></span>
                   <span><i class="fa-solid fa-star"></i></span>
                   <span><i class="fa-solid fa-star"></i></span>
                   <span><i class="fa-solid fa-star"></i></span>
                   <i class="fa-regular fa-star-half-stroke"></i>
                   </div>

                   <div>
                   <span><i class="fa-solid fa-arrow-right text-primary"></i><span>
                   </div>
               </div>
            </div>
        </div>
        
        `;
        newsContainer.appendChild(newsDiv);

    }
}

loadNews('01');




loadCategory();