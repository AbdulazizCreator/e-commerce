const productsRow = document.querySelector(".products-row");
const searchInput = document.querySelector(".search input");
const productsNumber = document.querySelector(".products-number .badge");

let search = "";

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
          <p class="card-text">${rating}</p>
          <p class="card-text">
           ${description}
          </p>
          <a href="#" class="btn btn-primary">Add to cart ${id}</a>
        </div>
      </div>
    </div>
  `;
}

function getProducts() {
  productsRow.innerHTML = "";
  let searchProducts = products.filter((pr) =>
    pr.name.toLowerCase().includes(search)
  );
  searchProducts.forEach((product) => {
    let card = getProductCard(product);
    productsRow.innerHTML += card;
  });

  productsNumber.textContent = searchProducts.length;
}

getProducts();

searchInput.addEventListener("keyup", function () {
  search = this.value.trim().toLowerCase();
  getProducts();
});
