const favoriteNumber = document.querySelector(".favorite .badge");

let favoriteProductsJson = localStorage.getItem(FAVORITE);
let favoriteProducts = JSON.parse(favoriteProductsJson) || [];

function getFavoriteNumber() {
  favoriteNumber.textContent = favoriteProducts.length;
}

getFavoriteNumber();

const cartNumber = document.querySelector(".cart .badge");

let cartProductsJson = localStorage.getItem(CART);
let cartProducts = JSON.parse(cartProductsJson) || [];

function getCartNumber() {
  cartNumber.textContent = cartProducts.length;
}

getCartNumber();