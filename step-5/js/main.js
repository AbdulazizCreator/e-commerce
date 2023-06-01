const favouriteNumber = document.querySelector(".favorite .badge");

let favoriteProductsJson = localStorage.getItem(FAVORITE);
let favoriteProducts = JSON.parse(favoriteProductsJson) || [];

function getFavoriteNumber() {
  favouriteNumber.textContent = favoriteProducts.length;
}

getFavoriteNumber();
