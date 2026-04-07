const products = [
    { id: 1, name: "Oraimo Watch 4 Plus", price: 4500, oldPrice: 6000, category: "Electronics", img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b", promo: true },
    { id: 2, name: "Wireless Earbuds Pro", price: 2800, oldPrice: 3500, category: "Electronics", img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad", promo: false },
    { id: 3, name: "Casual Sneakers XL", price: 3200, oldPrice: 4500, category: "Fashion", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", promo: true },
    { id: 4, name: "Smart LED Bulb RGB", price: 1200, oldPrice: 1800, category: "Home", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853", promo: false },
    { id: 5, name: "Power Bank 30k mAh", price: 3500, oldPrice: 5000, category: "Electronics", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90", promo: true },
    { id: 6, name: "Designer Summer Dress", price: 2500, oldPrice: 3500, category: "Fashion", img: "https://images.unsplash.com/photo-1572804013307-f9a8a97ee04b", promo: false }
];

let cart = JSON.parse(localStorage.getItem('apex_cart')) || [];
let currentCategory = "All";

function init() {
    renderProducts(products);
    updateCartCount();
    startTimer();
}

function startTimer() {
    let time = 7200; // 2 hours
    setInterval(() => {
        let m = Math.floor(time / 60);
        let s = time % 60;
        document.getElementById('timer').innerText = `${m}m ${s}s`;
        time--;
    }, 1000);
}

function renderProducts(list) {
    const container = document.getElementById('products');
    container.innerHTML = "";
    list.forEach((p, index) => {
        const off = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
        container.innerHTML += `
            <div class="card" style="animation-delay: ${index * 0.05}s">
                ${p.promo ? `<div class="badge">-${off}% OFF</div>` : ''}
                <img src="${p.img}" alt="${p.name}">
                <div class="card-body">
                    <h3>${p.name}</h3>
                    <div>
                        <span class="price-tag">KSh ${p.price.toLocaleString()}</span>
                        <span class="old-price">KSh ${p.oldPrice.toLocaleString()}</span>
                    </div>
                    <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });
}

function handleSearch(term) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) && 
        (currentCategory === "All" || p.category === currentCategory)
    );
    renderProducts(filtered);
}

function filterCat(cat, el) {
    currentCategory = cat;
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    handleSearch(document.querySelector('.search-box').value);
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    const inCart = cart.find(c => c.id === id);
    if(inCart) inCart.qty++; else cart.push({...item, qty: 1});
    
    localStorage.setItem('apex_cart', JSON.stringify(cart));
    updateCartCount();
    alert(`✅ ${item.name} added!`);
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.reduce((a, b) => a + b.qty, 0);
}

function openCart() {
    document.getElementById('cartModal').style.display = "block";
    const list = document.getElementById('cart-list');
    list.innerHTML = cart.length ? "" : "Cart is empty.";
    let total = 0;
    
    cart.forEach((item, i) => {
        total += (item.price * item.qty);
        list.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; background:#0f172a; padding:10px; border-radius:10px;">
                <span>${item.name} (x${item.qty})</span>
                <span>KSh ${item.price * item.qty} <button onclick="remove(${i})" style="color:red; background:none; border:none; margin-left:5px;">✕</button></span>
            </div>
        `;
    });
    document.getElementById('total-amt').innerText = total.toLocaleString();
}

function remove(i) {
    cart.splice(i, 1);
    localStorage.setItem('apex_cart', JSON.stringify(cart));
    updateCartCount();
    openCart();
}

function sendWhatsApp() {
    const name = document.getElementById('name').value;
    const loc = document.getElementById('loc').value;
    if(!name || !loc || cart.length === 0) return alert("Fill details & add items!");

    let text = `*NEW ORDER - APEX DEALS*\n--------------------------\n`;
    text += `👤 *Customer:* ${name}\n📍 *Location:* ${loc}\n--------------------------\n`;
    cart.forEach(i => text += `• ${i.name} (x${i.qty}) - KSh ${i.price * i.qty}\n`);
    text += `--------------------------\n*Total: KSh ${document.getElementById('total-amt').innerText}*`;

    window.open(`https://wa.me/254102776096?text=${encodeURIComponent(text)}`);
}

window.onclick = (e) => { if(e.target.className === 'modal') e.target.style.display = "none"; }
init();
