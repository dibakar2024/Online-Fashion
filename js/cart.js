// cart.js

// Function to retrieve cart items from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  // Function to save cart items to localStorage
  function saveCartItems(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Function to render the cart
  function renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    const cartItems = getCartItems();
  
    if (cartItems.length === 0) {
      cartContainer.innerHTML = `
        <div class="text-center">
          <p>Your cart is empty.</p>
          <a href="shop.html" class="btn btn-primary">Return to Shop</a>
        </div>
      `;
      return;
    }
  
    let cartHTML = `
      <table class="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    let total = 0;
  
    cartItems.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        const subtotal = product.price * item.quantity;
        total += subtotal;
  
        cartHTML += `
          <tr>
            <td><img src="${product.image}" alt="${product.name}" width="50"></td>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
              <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${product.id}, -1)">-</button>
              ${item.quantity}
              <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${product.id}, 1)">+</button>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${product.id})">&times;</button></td>
          </tr>
        `;
      }
    });
  
    cartHTML += `
        </tbody>
      </table>
      <div class="text-end">
        <h4>Total: $${total.toFixed(2)}</h4>
        <a href="checkout.html" class="btn btn-success">Proceed to Checkout</a>
      </div>
    `;
  
    cartContainer.innerHTML = cartHTML;
  }
  
  // Function to update quantity
  function updateQuantity(productId, change) {
    const cartItems = getCartItems();
    const item = cartItems.find(i => i.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        saveCartItems(cartItems);
        renderCart();
      }
    }
  }
  
  // Function to remove item from cart
  function removeFromCart(productId) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.id !== productId);
    saveCartItems(cartItems);
    renderCart();
  }
  
  // Initialize cart on page load
  document.addEventListener('DOMContentLoaded', renderCart);
  