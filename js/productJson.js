// Sample JSON Data
const products = [
    { id: 1, title: "Best Women's Long Skirt", price: 64, originalPrice: 75, discount: "15%", img: "images/w1.png" },
    { id: 2, title: "Men's Winter Jacket", price: 54, discount: null, img: "images/m1.png" },
    { id: 3, title: "Women's Cargo Jacket", price: 70, discount: null, img: "images/w4.png" },
    { id: 4, title: "Official Men's Shirt", price: 68, originalPrice: 85, discount: "20%", img: "images/m2.png" },
    { id: 5, title: "Women’s Casual Skirt", price: 75, originalPrice: 64, discount: "15%", img: "images/w2.png" },
    { id: 6, title: "Men’s Casual Shirt", price: 34, discount: null, img: "images/m3.png" },
    { id: 7, title: "Women’s Hot Dress", price: 55, discount: null, img: "images/w3.png" },
    { id: 8, title: "Men’s Winter T-shirt", price: 50, originalPrice: 40, discount: "20%", img: "images/m4.png" },
    { id: 9, title: "Men-Women Combo", price: 102, originalPrice: 120, discount: "15%", img: "images/men-women-combo.png" },
    { id: 10, title: "Men’s Traditional", price: 44, discount: null, img: "images/men-ethnic1.png" },
    { id: 11, title: "Women’s Traditiona", price: 60, discount: null, img: "images/women-traditional1.png" },
    { id: 12, title: "Men’s Party Wear", price: 92, originalPrice: 115, discount: "20%", img: "images/men-party1.png" }
  ];
  
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  function updateCounters() {
    document.getElementById('wishlistCount').innerText = wishlist.length;
    document.getElementById('cartCount').innerText = cart.length;
  }
  
  function renderProducts() {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';
    products.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-md-3 mb-4';
  
      const isWished = wishlist.includes(p.id);
      const wishClass = isWished ? 'text-danger' : 'text-muted';
  
    col.innerHTML = `
        <div class="card product-card">
            <div class="position-relative cardTop">
            ${p.discount ? `<span class="badge-sale">${p.discount} off</span>` : ''}
            <img src="${p.img}" class="product-img card-img-top" alt="${p.title}">
            <div class="icon-wrapper d-flex justify-content-between px-2 position-absolute top-0 w-100">
                <span class="wishlist-icon ${wishClass}" onclick="toggleWishlist(${p.id})"><i class="bi bi-heart"></i></span>
                <span class="view-icon text-primary" onclick="goToDetails(${p.id})"><i class="bi bi-eye"></i></span>
            </div>
            <button class="btn btn-dark add-cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
            <div class="card-body">
            <h6 class="card-title" onclick="goToDetails(${p.id})" style="cursor:pointer">${p.title}</h6>
            <p class="card-text">
                ${p.originalPrice ? `<del class="text-muted me-1">$${p.originalPrice.toFixed(2)}</del>` : ''}
                <strong>$${p.price.toFixed(2)}</strong>
            </p>
            </div>
        </div>
        `;
  
      container.appendChild(col);
    });
  }
  
  function toggleWishlist(id) {
    const index = wishlist.indexOf(id);
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(id);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateCounters();
    renderProducts();
  }
  
  function addToCart(id) {
    if (!cart.includes(id)) {
      cart.push(id);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCounters();
    }
  }
  
  function goToDetails(id) {
    localStorage.setItem('selectedProductId', id);
    window.location.href = 'product-details.html';
  }
  
  // Initial load
  updateCounters();
  renderProducts();
  