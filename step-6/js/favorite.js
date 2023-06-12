const favoriteRow = document.querySelector(".favorite-row");

function getFavoriteProducts() {
  favoriteRow.innerHTML = "";
  if (favoriteProducts.length !== 0) {
    favoriteProducts.forEach((pr) => {
      favoriteRow.innerHTML += getProductCard(pr, "favorite");
    });
  } else {
    favoriteRow.innerHTML = `
      <div class="alert alert-info" role="alert">
        No favorite products !
      </div>
    `;
  }
}

getFavoriteProducts();
