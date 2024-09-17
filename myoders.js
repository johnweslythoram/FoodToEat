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

// Check if user data exists
if (userIndex === -1 || !users[userIndex]) {
    displayNoUserDataMessage(); // Display message if user data is missing
} else {
    const User = users[userIndex];
    console.log(User);
    let USERNAME = User.email;
    let localstorage = USERNAME + 'cartItems';
    let SavedAddress = USERNAME + 'address';
    let myOrdersStorage = USERNAME + 'myOrders';
    let confirmedOrdersStorage = USERNAME + 'confirmedOrders'; // New storage for confirmed orders

    document.addEventListener('DOMContentLoaded', loadOrders);

    function loadOrders() {
        const ordersContainer = document.getElementById('orders-container');
        const orders = JSON.parse(localStorage.getItem(confirmedOrdersStorage)) || [];

        // Debug: Check the retrieved data
        console.log('Orders:', orders);

        if (!Array.isArray(orders) || orders.length === 0) {
            displayNoOrdersMessage(); // Display message when no orders are found
            return; // Exit the function if 'orders' is not a valid array or empty
        }

        orders.forEach((order) => {
            console.log('Processing order:', order); // Debug each order item

            // Create order card or similar HTML structure for displaying the order
            const orderElement = document.createElement('div');
            orderElement.classList.add('col-12', 'col-md-6', 'mb-4'); // Add 'mb-4' for margin bottom
            let price = parseFloat(order.price.replace("Rs.", "")) * order.quantity;
            orderElement.innerHTML = `
                <div class="order-card p-3 bg-white">
                    <div class="order-header bg-light p-2 mb-2">Ordered Date - ${order.date}</div>
                    <div class="order-item d-flex align-items-center mb-2">
                        <img src="${order.imgSrc}" alt="${order.title}" class="img-fluid" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px;">
                        <div>
                            <div class="order-item-title font-weight-bold">${order.title}</div>
                            <div class="order-item-price">${order.price}</div>
                            <div class="order-item-quantity">Quantity: ${order.quantity}</div>
                        </div>
                    </div>
                    <div class="order-total mt-3">
                        <strong>Total Price: Rs. ${price.toFixed(2)}</strong>
                    </div>
                </div>
            `;
            ordersContainer.appendChild(orderElement);
        });
    }

    // Display a message when there are no confirmed orders
    function displayNoOrdersMessage() {
        const ordersContainer = document.getElementById('orders-container');
        const noOrdersMessage = document.createElement('div');
        noOrdersMessage.classList.add('alert', 'alert-warning', 'text-center', 'mt-3','col-12');
        noOrdersMessage.textContent = 'No confirmed orders found.';
        ordersContainer.appendChild(noOrdersMessage);
    }
}

// Display a message when no user data is found
function displayNoUserDataMessage() {
    const ordersContainer = document.getElementById('orders-container');
    const noUserDataMessage = document.createElement('div');
    noUserDataMessage.classList.add('alert', 'alert-danger', 'text-center', 'mt-3');
    noUserDataMessage.textContent = 'No user data found. Please sign in to view your orders.';
    ordersContainer.appendChild(noUserDataMessage);
}
