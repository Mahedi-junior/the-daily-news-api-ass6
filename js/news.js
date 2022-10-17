const loadCategory = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = categories => {

    // console.log(categories.length);
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
    // start spinner
}

loadCategory();

const loadNews = async (id) => {
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
    // spinner
}

const displayNews = (allNews) => {
    // -------------------------
    console.log(allNews);
    const categoryLength = document.getElementById("categories-length");
    categoryLength.innerHTML = `
    <h3><span class="text-primary">${allNews.length}</span> items found for category Entertainment</h3>
    `

    // no news found
    const noNews = document.getElementById("no-news-found");
    if (allNews.length === 0) {
        noNews.classList.remove("d-none")
    }
    else {
        noNews.classList.add("d-none")
    }

    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = '';
    for (const news of allNews) {

        // console.log(news);
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("row", "border", "p-3", "mb-5", "bg-white");
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
                       <span class="fw-semibold">${news.author.name ? news.author.name : "No found Name"}</span><br>
                       <span>${news.author.published_date}</span>
                     </div>
                   </div>
                   <div class="">
                      <span class="fw-semibold d-none d-sm-block"><i class="fa-solid fa-eye mx-1"></i> ${news.total_view ? news.total_view : "no data"}M </span>
                   </div>
                   <div class="d-none d-sm-block">
                   <span><i class="fa-solid fa-star"></i></span>
                   <span><i class="fa-solid fa-star"></i></span>
                   <span><i class="fa-solid fa-star"></i></span>
                   <span><i class="fa-solid fa-star"></i></span>
                   <i class="fa-regular fa-star-half-stroke"></i>
                   </div>

                   <div>
                   <span><i class="fa-solid fa-arrow-right text-primary mx-2"></i><span>

                   <button onclick="loadNewsDetails('${news._id}')" class="btn btn-primary px-4 fs-4 py-1" data-bs-toggle="modal" data-bs-target="#newsDetailModal">details</button>
                   </div>
               </div>
            </div>
        </div>
        
        `;
        newsContainer.appendChild(newsDiv);
    }
    //  stop spinner
    toggleSpinner(false);
}

// loadNews('01');

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("spinner");
    if (isLoading) {
        loaderSection.classList.remove("d-none");
    }
    else {
        loaderSection.classList.add("d-none")
    }
}

loadNews('01');

const loadNewsDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}

const displayNewsDetails = news => {
    console.log(news);
    const title = document.getElementById("newsDetailModalLabel");
    const newsDetails = document.getElementById("newsDetails");
    newsDetails.innerHTML = `
    <h3>author: ${news.author.name ? news.author.name : "No found Name"}</h3>
    <img src="${news.author.img}"width="300" height="300">
    <h4>badge: ${news.rating.badge}</h4>
    <h4>ratting: ${news.rating.number}</h4>
    <h4>publish: ${news.author.published_date}</h4>
    <h4>View: ${news.total_view ? news.total_view : "no found data"}M</h4>
    
    `
}

// loadCategory();