document.addEventListener('DOMContentLoaded', loadCart);

const params = new URLSearchParams(window.location.search);
const username = params.get('username');

window.onload = function () {
  if (username) {
    return;
  } else {
    window.location.href = 'signIn.html';
  }
};

const users = JSON.parse(localStorage.getItem('users')) || [];
const userIndex = users.findIndex(user => user.email === username);
const User = users[userIndex];
console.log(User);
let USERNAME = User.email;
let localstorage = USERNAME + 'cartItems';
console.log(localstorage);

let itemList = JSON.parse(localStorage.getItem(localstorage)) || []; // Retrieve from local storage
const cartItemsContainer = document.getElementById('cart-items');
const totalItemsElement = document.getElementById('total-items');
const totalPriceElement = document.getElementById('total-price');
const checkout = document.getElementById("CheckOut");

// Disable the checkout button initially if there are no items in the cart
checkout.disabled = true;

checkout.onclick = function () {
  window.location.href = 'chechkout.html?username=' + encodeURIComponent(USERNAME);
};

// Load Cart from Local Storage
function loadCart() {
  // Check if local storage key exists and has items
  if (!localStorage.getItem(localstorage) || itemList.length === 0) {
    displayEmptyCartMessage();
    checkout.disabled = true; // Disable checkout button
  } else {
    itemList.forEach(item => {
      addItemToCart(item);
    });
    updateCartSummary();
    checkout.disabled = false; // Enable checkout button
  }
}

// Display a message when the cart is empty
function displayEmptyCartMessage() {
  const emptyCartMessage = document.createElement('div');
  emptyCartMessage.classList.add('alert', 'alert-warning', 'text-center', 'mt-3');
  emptyCartMessage.textContent = 'No items in your cart.';
  cartItemsContainer.appendChild(emptyCartMessage);
}

// Add item to cart UI
function addItemToCart(item) {
  const itemElement = document.createElement('div');
  itemElement.classList.add('row', 'cart-item', 'align-items-center', 'shadow-lg');
  itemElement.innerHTML = `
        <div class="col-md-2 col-12 imgcenter">
            <img src="${item.imgSrc}" alt="${item.title}" class="img-fluid">
        </div>
        <div class="col-md-4 col-4 cart-item-title">${item.title}</div>
        <div class="col-md-2 col-3 cart-item-price">${item.price}</div>
        
        <div class="col-md-2 col-3  cart-item-quantity ">
            <input type="number" value="${item.quantity}" min="1" class="form-control quantity-input">
        </div>
        <div class="col-md-2 col-2 ">
            <i class="fas fa-trash-alt cart-remove"></i>
        </div>
    `;
  cartItemsContainer.appendChild(itemElement);

  // Add event listeners
  itemElement.querySelector('.quantity-input').addEventListener('change', (e) => updateQuantity(item.title, e.target.value));
  itemElement.querySelector('.cart-remove').addEventListener('click', () => removeItem(item.title));
}

// Update quantity in cart
function updateQuantity(title, newQuantity) {
  let item = itemList.find(i => i.title === title);
  if (item) {
    item.quantity = parseInt(newQuantity);
    saveCart(); // Save changes to local storage
    updateCartSummary();
  }
}

// Remove item from cart
function removeItem(title) {
  itemList = itemList.filter(i => i.title !== title);
  saveCart(); // Save changes to local storage
  loadCartUI(); // Reload UI
}

// Reload cart UI
function loadCartUI() {
  cartItemsContainer.innerHTML = '';
  if (!localStorage.getItem(localstorage) || itemList.length === 0) { // Check again after removal
    displayEmptyCartMessage();
    checkout.disabled = true; // Disable checkout button
  } else {
    itemList.forEach(item => addItemToCart(item));
    updateCartSummary();
    checkout.disabled = false; // Enable checkout button
  }
}

// Update cart summary
function updateCartSummary() {
  let totalItems = 0;
  let totalPrice = 0;

  itemList.forEach(item => {
    totalItems += item.quantity;
    totalPrice += parseFloat(item.price.replace("Rs.", "")) * item.quantity;
  });

  totalItemsElement.innerText = totalItems;
  totalPriceElement.innerText = 'Rs.' + totalPrice.toFixed(2);
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem(localstorage, JSON.stringify(itemList));
}
