function getRating(rating) {
  let res = "";
  let star_count = 0;

  let full_star = parseInt(rating);
  let rest_star = rating - full_star;

  star_count = full_star;

  res = Array(full_star).fill("<img src='../images/star-fill.svg'>").join("");

  if (0.25 <= rest_star && rest_star < 0.75) {
    star_count++;
    res += "<img src='../images/star-half.svg'>";
  }

  if (0.75 <= rest_star) {
    star_count++;
    res += "<img src='../images/star-fill.svg'>";
  }

  free_star = 5 - star_count;

  res += Array(free_star).fill("<img src='../images/star.svg'>").join("");

  return res;
}

// product card
function getProductCard(
  { id, name, category, description, price, rating, discount, image },
  which
) {
  let checkFavorite = favoriteProducts.find((el) => el.id === id);
  let checkCart = cartProducts.find((el) => el.id === id);
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
          <div class="d-flex justify-content-between">          
            <button onclick="addToCart(${id}, '${which}')" href="#" class="btn ${
    checkCart ? "btn-success" : "btn-primary"
  }">Add to cart ${id}</button>
            <button onclick="addToFavourite(${id}, '${which}')" class="btn ${
    checkFavorite ? "btn-danger" : "btn-outline-danger"
  }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart" viewBox="0 0 16 16">
                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// add to favourite
function addToFavourite(id, which) {
  let checkFavorite = favoriteProducts.find((el) => el.id === id);
  let product = products.find((el) => el.id === id);
  if (checkFavorite) {
    favoriteProducts = favoriteProducts.filter((el) => el.id !== id);
  } else {
    favoriteProducts.push(product);
  }
  localStorage.setItem(FAVORITE, JSON.stringify(favoriteProducts));
  if (which === "all") {
    getProducts();
  } else if (which === "favorite") {
    getFavoriteProducts();
  } else if (which === "cart") {
    getCartProducts();
  }
  getFavoriteNumber();
}

function addToCart(id, which) {
  let product = products.find((pr) => pr.id === id);
  let check = cartProducts.find((pr) => pr.id === id);
  if (check) {
    cartProducts = cartProducts.map((pr) => {
      // if (pr.id === id) {
      //   pr.quantity++;
      // }
      pr.id === id && pr.quantity++;
      return pr;
    });
  } else {
    product.quantity = 1;
    cartProducts.push(product);
  }
  localStorage.setItem(CART, JSON.stringify(cartProducts));
  if (which === "all") {
    getProducts();
  } else if (which === "favorite") {
    getFavoriteProducts();
  }
  getCartNumber();
}
