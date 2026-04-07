const products = [
  {
    name: "Oraimo Smart Watch",
    price: 2500,
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Wireless Earbuds",
    price: 1800,
    image: "https://via.placeholder.com/300",
  }
];

const container = document.getElementById("products");

products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";

  div.innerHTML = `
    <img src="${product.image}">
    <h2>${product.name}</h2>
    <p>Ksh ${product.price}</p>
    <button onclick="order('${product.name}', ${product.price})">
      Order on WhatsApp
    </button>
  `;

  container.appendChild(div);
});

function order(name, price) {
  const number = "254102776096"; // your number
  const message = `Hello, I want to order ${name} for Ksh ${price}`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}
