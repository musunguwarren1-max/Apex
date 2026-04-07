const products = [
  { name: "Oraimo Watch", price: 2500, category: "Electronics", image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b" },
  { name: "Wireless Earbuds", price: 1800, category: "Electronics", image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad" },
  { name: "Bluetooth Speaker", price: 2200, category: "Electronics", image: "https://images.unsplash.com/photo-1589003077984-894e133dabab" },
  { name: "Power Bank 20000mAh", price: 1500, category: "Electronics", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90" },
  { name: "Men's T-Shirt", price: 1200, category: "Fashion", image: "https://images.unsplash.com/photo-1618354694324-41e3ec93f3e6" },
  { name: "Women's Dress", price: 2000, category: "Fashion", image: "https://images.unsplash.com/photo-1600185360269-8a1cda4c5fae" },
  { name: "LED Lamp", price: 1000, category: "Home", image: "https://images.unsplash.com/photo-1556909218-31f12d3c7075" },
  { name: "Cushion Set", price: 800, category: "Home", image: "https://images.unsplash.com/photo-1578898886786-9aa1b01c73ec" }
];

let cart = [];
let filteredProducts = [...products];

const container = document.getElementById("products");

// DISPLAY PRODUCTS
function displayProducts(items) {
  container.innerHTML = "";
  items.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}">
      <h2>${product.name}</h2>
      <p>Ksh ${product.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

displayProducts(filteredProducts);

// SEARCH FUNCTION
function searchProducts() {
  const search = document.getElementById("search").value.toLowerCase();
  filteredProducts = products.filter(p => p.name.toLowerCase().includes(search));
  displayProducts(filteredProducts);
}

// CATEGORY FILTER
function filterCategory(category) {
  if (category === "All") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(p => p.category === category);
  }
  displayProducts(filteredProducts);
}

// CART FUNCTIONS
function addToCart(index) {
  cart.push(filteredProducts[index]);
  document.getElementById("cartCount").innerText = cart.length;
  alert("Added to cart ✅");
}

function openCart() {
  document.getElementById("cartModal").style.display = "block";
  renderCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function renderCart() {
  const cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    cartDiv.innerHTML += `<p>${item.name} - Ksh ${item.price}</p>`;
  });
  document.getElementById("total").innerText = "Total: Ksh " + total;
}

function checkout() {
  let message = "Hello, I want to order:\n";
  cart.forEach(item => {
    message += `- ${item.name} (Ksh ${item.price})\n`;
  });
  const number = "254102776096"; // Replace with your WhatsApp number
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
  }
