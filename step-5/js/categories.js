let categoriesRow = document.querySelector(".categories-row");

function getCategoryCard({ name, image }) {
  return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div class="card">
        <img height="200" src=${image} class="object-fit-cover card-img-top" alt=${name} />
        <div class="card-body">
          <a href="pages/products.html" class="btn btn-primary" onclick="getCategory('${name}')">${name}</a>
        </div>
      </div>
    </div>
  `;
}

categories.forEach((category) => {
  categoriesRow.innerHTML += getCategoryCard(category);
});

function getCategory(name) {
  localStorage.setItem(CATEGORY, name);
}
