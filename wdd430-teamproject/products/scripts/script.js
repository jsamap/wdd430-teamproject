// PRODUCT DATA
const products = [
  {
    id: 1,
    name: "Wooden Bowl",
    price: 25,
    image: "images/product1.jpg",
    alt: "Wooden bowl",
    description:
      "This handcrafted wooden bowl is made from natural wood and is perfect for serving, decorating, or gifting.",
    optionLabel: "Size:",
    options: ["Small", "Medium", "Large"]
  },
  {
    id: 2,
    name: "Ceramic Mug",
    price: 18,
    image: "images/product2.jpg",
    alt: "Ceramic mug",
    description:
      "A handcrafted ceramic mug designed for comfort, warmth, and everyday use.",
    optionLabel: "Color:",
    options: ["Blue", "White", "Natural"]
  },
  {
    id: 3,
    name: "Handwoven Basket",
    price: 30,
    image: "images/product3.jpg",
    alt: "Handwoven basket",
    description:
      "This handwoven basket is ideal for storage, home styling, and natural décor.",
    optionLabel: "Size:",
    options: ["Small", "Medium", "Large"]
  }
];

// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("show");
  });
}

// SEARCH + FILTER
const searchInput = document.getElementById("searchInput");
const priceFilter = document.getElementById("priceFilter");
const productCards = document.querySelectorAll(".product-card");

function filterProducts() {
  const searchText = searchInput ? searchInput.value.toLowerCase() : "";
  const priceValue = priceFilter ? priceFilter.value : "all";

  productCards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const price = parseFloat(card.dataset.price);

    let matchesSearch = name.includes(searchText);
    let matchesPrice = true;

    if (priceValue === "under20") {
      matchesPrice = price < 20;
    } else if (priceValue === "under30") {
      matchesPrice = price < 30;
    } else if (priceValue === "30andup") {
      matchesPrice = price >= 30;
    }

    card.style.display = matchesSearch && matchesPrice ? "flex" : "none";
  });
}

if (searchInput) {
  searchInput.addEventListener("input", filterProducts);
}

if (priceFilter) {
  priceFilter.addEventListener("change", filterProducts);
}

// CART FUNCTIONS
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElements = document.querySelectorAll("#cart-count");

  cartCountElements.forEach((element) => {
    element.textContent = count;
  });
}

function addToCartByProduct(product, quantity = 1, selectedOption = "") {
  const cart = getCart();

  const existingItem = cart.find(
    (item) => item.name === product.name && item.selectedOption === selectedOption
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      selectedOption: selectedOption
    });
  }

  saveCart(cart);
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// ADD TO CART FROM PRODUCT LIST PAGE
const addCartButtons = document.querySelectorAll(".add-cart-btn");

addCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = Number(button.dataset.id);
    const product = products.find((item) => item.id === productId);

    if (product) {
      addToCartByProduct(product, 1);
    }
  });
});

// DYNAMIC PRODUCT DETAILS PAGE
function loadProductDetails() {
  const titleElement = document.getElementById("product-title");
  const imageElement = document.getElementById("product-image");
  const priceElement = document.getElementById("product-price");
  const descriptionElement = document.getElementById("product-description");
  const optionLabelElement = document.getElementById("option-label");
  const optionSelectElement = document.getElementById("product-option");
  const addToCartButton = document.getElementById("detailsAddToCartBtn");

  if (
    !titleElement ||
    !imageElement ||
    !priceElement ||
    !descriptionElement ||
    !optionLabelElement ||
    !optionSelectElement ||
    !addToCartButton
  ) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id"));
  const product = products.find((item) => item.id === productId);

  if (!product) {
    document.title = "Product Not Found | Handcrafted Haven";
    titleElement.textContent = "Product Not Found";
    descriptionElement.textContent = "Sorry, that product does not exist.";

    imageElement.src = "";
    imageElement.alt = "Product not found";
    imageElement.style.display = "none";

    priceElement.textContent = "Unavailable";

    optionLabelElement.style.display = "none";
    optionSelectElement.style.display = "none";

    addToCartButton.textContent = "Unavailable";
    addToCartButton.disabled = true;

    return;
  }

  document.title = `${product.name} | Handcrafted Haven`;
  titleElement.textContent = product.name;
  imageElement.src = product.image;
  imageElement.alt = product.alt;
  imageElement.style.display = "block";
  priceElement.textContent = `$${product.price.toFixed(2)}`;
  descriptionElement.textContent = product.description;
  optionLabelElement.textContent = product.optionLabel;
  optionLabelElement.style.display = "block";
  optionSelectElement.style.display = "block";
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.disabled = false;

  optionSelectElement.innerHTML = "";
  product.options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    optionSelectElement.appendChild(optionElement);
  });

  addToCartButton.onclick = () => {
    const quantityInput = document.getElementById("quantity");
    const quantity = quantityInput ? Number(quantityInput.value) : 1;
    const selectedOption = optionSelectElement.value;

    addToCartByProduct(product, quantity, selectedOption);
  };
}

// DISPLAY CART PAGE
function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotal) return;

  const cart = getCart();
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: $0.00";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <h3>${item.name}</h3>
      <p>Option: ${item.selectedOption || "Default"}</p>
      <p>Price: $${item.price.toFixed(2)}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Subtotal: $${itemTotal.toFixed(2)}</p>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

const clearCartBtn = document.getElementById("clearCartBtn");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    displayCart();
    updateCartCount();
  });
}

const themeToggle = document.getElementById("themeToggle");

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) {
      themeToggle.textContent = "☀️";
    }
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    }
  });
}

loadTheme();

updateCartCount();
loadProductDetails();
displayCart();