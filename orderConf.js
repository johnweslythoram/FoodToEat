document.addEventListener('DOMContentLoaded', loadOrderDetails);

const params = new URLSearchParams(window.location.search);
const username = params.get('username');
let myorders=document.getElementById("myorders");
window.onload = function () {
    if (username) {
        return;
    } else {
        window.location.href = 'signIn.html';
    }
};
myorders.onclick=function(){
    window.location.href='myorders.html?username=' + encodeURIComponent(USERNAME);
    saveConfirmedOrders();
    localStorage.removeItem(myOrdersStorage);
  }

const users = JSON.parse(localStorage.getItem('users')) || [];
const userIndex = users.findIndex(user => user.email === username);
const User = users[userIndex];
console.log(User);
let USERNAME = User.email;
let localstorage = USERNAME + 'cartItems';
let SavedAddress = USERNAME + 'address';
let myOrdersStorage = USERNAME + 'myOrders';
let confirmedOrdersStorage = USERNAME + 'confirmedOrders'; // New storage for confirmed orders
const orderItems = JSON.parse(localStorage.getItem(myOrdersStorage));

// Remove address from each item and store in confirmed orders
function saveConfirmedOrders() {
    const confirmedOrders = orderItems.map(item => {
        const { address, ...rest } = item; // Destructure and remove address
        return rest; // Return item without address
    });

    // Get existing confirmed orders or create a new array
    let existingConfirmedOrders = JSON.parse(localStorage.getItem(confirmedOrdersStorage)) || [];

    // Add the new confirmed orders
    existingConfirmedOrders.push(...confirmedOrders);

    // Save updated confirmed orders to local storage
    localStorage.setItem(confirmedOrdersStorage, JSON.stringify(existingConfirmedOrders));
    
}



function loadOrderDetails() {
    const username = User.fName;
    const orderId = localStorage.getItem('orderId') || '#123456';
    const orderItems = JSON.parse(localStorage.getItem(myOrdersStorage)) || [];
    
    // Check if there are no order items, redirect to index page
    if (orderItems.length === 0) {
        window.location.href = 'index.html?username=' + encodeURIComponent(USERNAME);
        return; // Stop further execution
    }

    // Assuming all items have the same address, retrieve it from the first item
    const deliveryAddress = orderItems.length > 0 ? orderItems[0].address : 'No address available';

    document.getElementById('username').innerText = username;
    document.getElementById('order-id').innerText = orderId;
    document.getElementById('delivery-address').innerText = deliveryAddress;

    const orderItemsContainer = document.getElementById('order-items');
    let totalItems = 0;
    let totalPrice = 0;

    orderItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('order-item', 'd-flex', 'align-items-center', 'shadow-lg');
        itemElement.innerHTML = `
            <div class="col-4">
                <img src="${item.imgSrc}" alt="${item.title}" class="img-fluid">
            </div>
            <div class="col-4 order-item-title">${item.title} (${item.quantity})</div>
            <div class="col-4 order-item-price">${item.price}</div>
        `;
        orderItemsContainer.appendChild(itemElement);

        totalItems += item.quantity;
        totalPrice += parseFloat(item.price.replace("Rs.", "")) * item.quantity;
    });

    document.getElementById('total-items').innerText = totalItems;
    document.getElementById('total-price').innerText = 'Rs.' + totalPrice.toFixed(2);
}
