document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
    calculateTotals();
    setupEventListeners();
    loadAddresses();
});

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
let SavedAddress = USERNAME + 'address';
let myOrdersStorage = USERNAME + 'myOrders'; // New local storage key for orders

function displayOrderSummary() {
    const orderSummaryContainer = document.getElementById('order-summary');
    const storedCartItems = localStorage.getItem(localstorage);

    if (!storedCartItems || JSON.parse(storedCartItems).length === 0) {
        // Redirect to index page if there are no items in the cart
        window.location.href = 'index.html?username=' + encodeURIComponent(USERNAME);
        return; // Stop further execution
    }

    const itemList = JSON.parse(storedCartItems);
    itemList.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'd-flex justify-content-between align-items-center';

        const itemDetails = `
            <div class="d-flex align-items-center mb-3">
                <img src="${item.imgSrc}" alt="${item.title}" class="img-fluid mr-3">
                <div>
                    <h6>${item.title}</h6>
                    <p>Qty: ${item.quantity}</p>
                </div>
            </div>
            <div>
                <p>${item.price}</p>
            </div>
        `;

        itemRow.innerHTML = itemDetails;
        orderSummaryContainer.appendChild(itemRow);
    });
}


function calculateTotals() {
    const storedCartItems = localStorage.getItem(localstorage);
    let subtotal = 0;
    const gstRate = 0.18;

    if (storedCartItems) {
        const itemList = JSON.parse(storedCartItems);
        itemList.forEach(item => {
            subtotal += parseFloat(item.price.replace('Rs.', '')) * item.quantity;
        });

        const gst = subtotal * gstRate;
        const total = subtotal + gst;

        document.getElementById('subtotal').textContent = `Rs. ${subtotal.toFixed(2)}`;
        document.getElementById('gst').textContent = `Rs. ${gst.toFixed(2)}`;
        document.getElementById('total-amount').textContent = `Rs. ${total.toFixed(2)}`;
    }
}

function setupEventListeners() {
    document.getElementById('add-address-btn').addEventListener('click', showAddressForm);
    document.getElementById('cancel-address-btn').addEventListener('click', hideAddressForm);
    document.getElementById('address-form-body').addEventListener('submit', addNewAddress);

    const placeOrderBtn = document.getElementById('place-order-btn');
    const addressList = document.getElementById('address-list');

    // Enable Place Order button when an address is selected
    addressList.addEventListener('change', () => {
        const selectedAddress = document.querySelector('input[name="address"]:checked');
        placeOrderBtn.disabled = !selectedAddress;
    });

    // Place Order logic
    placeOrderBtn.addEventListener('click', () => {
        saveOrder(); // Save order to local storage
        showOrderSuccessModal();

    });
}

function showAddressForm() {
    document.getElementById('address-form').classList.remove('d-none');
}

function hideAddressForm() {
    document.getElementById('address-form').classList.add('d-none');
}

function addNewAddress(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const postalCode = document.getElementById('postal-code').value;

    const newAddress = `${name}, ${street}, ${city}, ${country}, ${postalCode}`;
    saveAddress(newAddress);
    hideAddressForm();
}

function saveAddress(address) {
    const savedAddresses = JSON.parse(localStorage.getItem(SavedAddress)) || [];
    if (!savedAddresses.includes(address)) {
        savedAddresses.push(address);
        localStorage.setItem(SavedAddress, JSON.stringify(savedAddresses));
        loadAddresses();
    }
}

function loadAddresses() {
    const savedAddresses = JSON.parse(localStorage.getItem(SavedAddress)) || [];
    const addressList = document.getElementById('address-list');

    addressList.innerHTML = ''; // Clear existing addresses

    savedAddresses.forEach(address => {
        const addressOption = document.createElement('div');
        addressOption.className = 'address-option mb-3';
        addressOption.innerHTML = `
            <input type="radio" name="address" id="${address.replace(/\s+/g, '-').toLowerCase()}" value="${address}">
            <label for="${address.replace(/\s+/g, '-').toLowerCase()}">${address}</label>
        `;
        addressList.appendChild(addressOption);
    });
}

function showOrderSuccessModal() {
    const modal = document.getElementById('order-success-modal');
    modal.style.display = 'block';

    setTimeout(() => {
        modal.style.display = 'none';
        window.location.href = 'orderConf.html?username=' + encodeURIComponent(USERNAME); // Adjust the URL as needed
    }, 2000);
}

// New function to save the order to local storage
function saveOrder() {
    const storedCartItems = localStorage.getItem(localstorage);
    if (storedCartItems) {
        const itemList = JSON.parse(storedCartItems);
        const selectedAddress = document.querySelector('input[name="address"]:checked').value; // Get selected address
        const currentDate = new Date().toLocaleDateString(); // Get the current date in a readable format

        // Add the selected address and current date to each item in the order
        const orderWithAddressAndDate = itemList.map(item => {
            return {
                ...item, // Spread the existing item properties
                address: selectedAddress, // Add the selected address
                date: currentDate // Add the current date
            };
        });

        // Save the updated order list to local storage under myOrdersStorage
        localStorage.setItem(myOrdersStorage, JSON.stringify(orderWithAddressAndDate));

        // Clear cart items after placing the order
        localStorage.removeItem(localstorage);
    }
}




