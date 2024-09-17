const params = new URLSearchParams(window.location.search);
const username = params.get('username');
let nonveg=document.getElementById("nonVEG");

const userElement = document.getElementById('nav-item5');
const myCart=document.getElementById("nav-item3");
const myoders=document.getElementById("nav-item6");
const myprofile=document.getElementById("nav-item1");
const signout=document.getElementById("nav-item4");

window.onload = function() {
  if (username) {
    initializeCartCount(); 
    return;
  } else {
    window.location.href = 'signIn.html';
  }
}; 

const users = JSON.parse(localStorage.getItem('users')) || [];

const userIndex = users.findIndex(user => user.email === username);
const User = users[userIndex];
console.log(User)
let USERNAME = User.email;
let localstorage = USERNAME + 'cartItems';
let cartCountKey = USERNAME + 'cartCount';  // Key to store cart count in local storage
console.log(localstorage)
if (userIndex >= 0) {
  // If user exists, retrieve user data
  const userName = User.fName;  // Assuming 'fName' is the user's first name property
  
  // Update the text content of the element
  userElement.innerHTML = `<i class="fa-regular fa-user"></i> ${userName}!`;
} else {
  console.error("User not found in localStorage.");
  userElement.textContent = "Welcome, Guest!";  // Provide a fallback
}

myCart.onclick=function(){
  window.location.href='myCart.html?username=' + encodeURIComponent(User.email);
}

myoders.onclick=function(){
  window.location.href='myorders.html?username=' + encodeURIComponent(User.email);
}

myprofile.onclick=function(){
  window.location.href='profile.html?username=' + encodeURIComponent(User.email);
}

signout.onclick=function(){
 
  window.location.replace('intro.html'); 
  // history.pushState( 'intro.html','signIN.html');
}




nonveg.onclick=function(){
  window.location.href='myCart.html?username=' + encodeURIComponent(USERNAME);
}


const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');
const totalValue = document.querySelector('.total-price');
const cartCountBadge = document.querySelector('.badge'); // Badge element

btnCart.addEventListener('click', () => {
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
  loadCartFromLocalStorage(); // Load cart items from local storage on page load
  loadContent();
}

function loadContent() {
  let btnRemove = document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn) => {
    btn.addEventListener('click', removeItem);
  });

  let qtyElements = document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input) => {
    input.addEventListener('change', changeQty);
  });

  let cartBtns = document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', addCart);
  });

  updateTotal();
}

// Remove Item
function removeItem() {
  let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
  
  // Remove the item from the itemList array
  itemList = itemList.filter(el => el.title !== title);
  
  // Remove the item from the DOM
  this.parentElement.remove();
  
  // Load updated content
  loadContent();
  
  // Update local storage after removal
  saveCartToLocalStorage();
  
  // Decrement cart count when an item is removed
  updateCartCount(-1);
}

// Change Quantity
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  
  // Find the item in the itemList array and update its quantity
  let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
  let item = itemList.find(el => el.title === title);
  if (item) {
    item.quantity = parseInt(this.value); // Update quantity in itemList
  }

  loadContent();
  saveCartToLocalStorage(); // Update local storage after quantity change
}

let itemList = [];

// Add to Cart
// Add to Cart
function addCart() {
  let food1 = this.parentElement;
  let food = food1.parentElement;
  let title = food.querySelector('.food-title').innerHTML;
  let price = food.querySelector('.food-price').innerHTML;
  let imgSrc = food.querySelector('.ems-img').src;
  let quantity = 1; // Default quantity is 1 when added


  console.log(title, price, imgSrc);

  let newProduct = { title, price, imgSrc, quantity};

  // Check if the product already exists in the cart
  if (itemList.find((el) => el.title === newProduct.title)) {
    // Display a message under the product card if it's already in the cart
    displayAlreadyInCartMessage(food);
    return;
  } else {
    itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement('div');
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector('.cart-content');
  cartBasket.append(element);
  loadContent();

  // Store updated cart items in local storage
  localStorage.setItem(localstorage, JSON.stringify(itemList));

  // Update the cart count
  updateCartCount(1);
}

// Function to display a message under the product card if it's already in the cart
function displayAlreadyInCartMessage(food) {
  // Remove any existing message
  let existingMessage = food.querySelector('.already-in-cart-msg');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create a new message element
  let message = document.createElement('div');
  message.className = 'already-in-cart-msg text-danger mt-2';
  message.innerText = 'This item is already in the cart.';

  // Append the message under the product card
  food.appendChild(message);

  // Automatically remove the message after 3 seconds
  setTimeout(() => {
    message.remove();
  }, 3000);
}


function createCartProduct(title, price, imgSrc, quantity = 1) {
  return `
  <div class="cart-box">
    <img src="${imgSrc}" class="cart-img">
    <div class="detail-box">
      <div class="cart-food-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amt">${price}</div>
      </div>
      <input type="number" value="${quantity}" class="cart-quantity">
    </div>
    <i class="fa-solid fa-trash cart-remove"></i>
  </div>
  `;
}

function updateTotal() {
  const cartItems = document.querySelectorAll('.cart-box');
  let total = 0;

  cartItems.forEach(product => {
    let priceElement = product.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
    let qty = product.querySelector('.cart-quantity').value;
    total += (price * qty);
    product.querySelector('.cart-amt').innerText = "Rs." + (price * qty);
  });

  totalValue.innerHTML = 'Rs.' + total;
}

// Save Cart to Local Storage
function saveCartToLocalStorage() {
  localStorage.setItem(localstorage, JSON.stringify(itemList));
}

// Load Cart from Local Storage
function loadCartFromLocalStorage() {
  const storedCartItems = localStorage.getItem(localstorage);
  if (storedCartItems) {
    itemList = JSON.parse(storedCartItems);
    itemList.forEach(item => {
      let newProductElement = createCartProduct(item.title, item.price, item.imgSrc, item.quantity);
      let element = document.createElement('div');
      element.innerHTML = newProductElement;
      let cartBasket = document.querySelector('.cart-content');
      cartBasket.append(element);
    });
    loadContent();
  }
}

// Initialize cart count from local storage on page load
function initializeCartCount() {
  const storedCartItems = localStorage.getItem(localstorage);
  let cartCount = 0;
  if (storedCartItems) {
    const cartItems = JSON.parse(storedCartItems);
    cartCount = cartItems.length; // Set cart count to the number of items in the cart
  }
  updateCartBadge(cartCount);
  localStorage.setItem(cartCountKey, cartCount); // Save updated cart count to local storage
}

// Update the cart badge
function updateCartBadge(count) {
  cartCountBadge.textContent = count;
}

// Update Cart Count and store in local storage
function updateCartCount(amount) {
  const storedCartCount = localStorage.getItem(cartCountKey);
  let cartCount = storedCartCount ? parseInt(storedCartCount) : 0;
  cartCount += amount;  // Increment or decrement based on the amount passed
  updateCartBadge(cartCount);
  localStorage.setItem(cartCountKey, cartCount); // Save updated cart count to local storage
}
