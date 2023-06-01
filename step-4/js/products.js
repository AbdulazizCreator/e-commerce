const productsRow = document.querySelector(".products-row");
const searchInput = document.querySelector(".search input");
const productsNumber = document.querySelector(".products-number .badge");
const pagination = document.querySelector(".pagination");
const categoriesSelect = document.querySelector(".categories-select");

// variables
let category = localStorage.getItem(CATEGORY) || "all";
let search = "";
let limit = 10;
let page = 0;
let pages;

// product card
function getProductCard({
  id,
  name,
  category,
  description,
  price,
  rating,
  discount,
  image,
}) {
  return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div class="card product-card">
        <img style="height: 200px;" src=${image} class="w-100 object-fit-cover card-img-top" alt=${name} />
        <div class="card-body">
          <span class="badge text-bg-warning">${category}</span>
          <span class="badge text-bg-danger">${discount} %</span>
          <h5 class="card-title">${name} - ${price}$</h5>
          <p class="card-text">${getRating(rating)}</p>
          <p class="card-text">
           ${description}
          </p>
          <a href="#" class="btn btn-primary">Add to cart ${id}</a>
        </div>
      </div>
    </div>
  `;
}

// mapping
function getProducts() {
  productsRow.innerHTML = "";

  // searching by name and description
  let searchProducts = products.filter(
    (pr) =>
      pr.name.toLowerCase().includes(search) ||
      pr.description.toLowerCase().includes(search)
  );

  // filtering
  if (category !== "all") {
    searchProducts = searchProducts.filter((pr) => pr.category === category);
  }

  // pagination start and end
  let start = page * limit;
  let end = start + limit;

  searchProducts.slice(start, end).forEach((product) => {
    let card = getProductCard(product);
    productsRow.innerHTML += card;
  });

  productsNumber.textContent = searchProducts.length;

  // pagination

  pages = Math.ceil(searchProducts.length / limit);

  if (pages > 1) {
    pagination.innerHTML = `
      <li class="page-item ${page === 0 ? "disabled" : ""}">
        <span onclick="getPage('-')" class="page-link">Previous</span>
      </li>
    `;

    for (let i = 0; i < pages; i++) {
      let active = page == i ? "active" : "";
      pagination.innerHTML += `
        <li class="page-item">
          <span onclick="getPage(${i})" class="page-link ${active}">
            ${i + 1}
          </span>
        </li>
      `;
    }

    pagination.innerHTML += `
      <li class="page-item ${page === pages - 1 ? "disabled" : ""}">
        <span onclick="getPage('+')" class="page-link">Next</span>
      </li>
    `;
  } else {
    pagination.innerHTML = "";
  }
}

// calling at the beginning
getProducts();

// pagination elements changing
function getPage(p) {
  if (p == "+") {
    page++;
  } else if (p == "-") {
    page--;
  } else {
    page = p;
  }
  getProducts();
}

// searching
searchInput.addEventListener("keyup", function () {
  search = this.value.trim().toLowerCase();
  page = 0;
  getProducts();
});

// categories mapping
categoriesSelect.innerHTML = `<option value='all'>All</option>`;

categories.forEach(({ name }) => {
  // if (category === name) {
  //   categoriesSelect.innerHTML += `<option selected value=${name}>${name}</option>`;
  // } else {
  //   categoriesSelect.innerHTML += `<option value=${name}>${name}</option>`;
  // }
  categoriesSelect.innerHTML += `<option ${category === name ? 'selected' : ''} value=${name}>${name}</option>`;
});

categoriesSelect.addEventListener("change", function () {
  category = this.value;
  localStorage.setItem(CATEGORY, category);
  getProducts();
});
