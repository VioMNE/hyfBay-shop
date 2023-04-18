// @ts-nocheck
console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

let filterProduct = products;

function renderProducts(products) {
  const ulList = document.querySelector("#products_list");
  ulList.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    const liList = document.createElement("li");
    const h2product = document.createElement("h2");
    const pPrice = document.createElement("p");
    const pRating = document.createElement("p");
    h2product.innerHTML = products[i].name;
    pPrice.innerHTML = `price: ${products[i].price}`;
    pRating.innerHTML = `Rating: ${products[i].rating}`;
    liList.appendChild(h2product);
    liList.appendChild(pPrice);
    liList.appendChild(pRating);
    ulList.appendChild(liList);
  }
}

renderProducts(products);

// Filter products
const search = document.querySelector("#search_field");

search.addEventListener("input", (searchProduct) => {
  filterProduct = products.filter((product) =>
    product.name.toLowerCase().includes(search.value.toLowerCase())
  );
  sortProducts(filterProduct);
  renderProducts(filterProduct);
});

// Filter products based on max price

const maxPrice = document.querySelector("#max_price");

maxPrice.addEventListener("input", (findCheapProducts) => {
  filterProduct = products.filter(
    (product) => product.price < maxPrice.value || maxPrice.value === ""
  );
  sortProducts(filterProduct);
  renderProducts(filterProduct);
});

// Sort the products (by rating, price and name)
const sort = document.querySelector("#sort");
sort.addEventListener("click", function () {
  sortProducts(filterProduct);
  renderProducts(filterProduct);
});

function sortProducts(sortBy) {
  if (sort.value === "price") {
    sortBy.sort((a, b) => a.price - b.price);
  } else if (sort.value === "rating") {
    sortBy.sort((a, b) => a.rating - b.rating);
  } else if (sort.value === "name") {
    sortBy.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}