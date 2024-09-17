document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
    loadAddresses();
});

const params = new URLSearchParams(window.location.search);
const username = params.get('username');

window.onload = function () {
    if (!username) {
        window.location.href = 'signIn.html';
    }
};

let users = JSON.parse(localStorage.getItem('users')) || [];
let userIndex = users.findIndex(user => user.email === username);
let User = users[userIndex];
const USERNAME = User.email;
const SavedAddress = USERNAME + 'address';

function loadProfile() {
    const personalDetailsContainer = document.getElementById('personal-details');
    personalDetailsContainer.innerHTML = `
        <p><strong>Name:</strong> ${User.fName}</p>
        <p><strong>Email:</strong> ${User.email}</p>
    `;
}

function loadAddresses() {
    const savedAddresses = JSON.parse(localStorage.getItem(SavedAddress)) || [];
    const addressList = document.getElementById('address-list');
    addressList.innerHTML = '';

    if (savedAddresses.length === 0) {
        addressList.innerHTML = '<p>No addresses saved.</p>';
    } else {
        savedAddresses.forEach((address, index) => {
            addressList.innerHTML += `
                <div class="address-item">
                    <span>${address}</span>
                    <span class="remove-btn" onclick="removeAddress(${index})">Remove</span>
                </div>
            `;
        });
    }
}

function removeAddress(index) {
    let addresses = JSON.parse(localStorage.getItem(SavedAddress)) || [];
    addresses.splice(index, 1);
    localStorage.setItem(SavedAddress, JSON.stringify(addresses));
    loadAddresses();
}

document.getElementById('edit-name-btn').addEventListener('click', () => {
    document.getElementById('personal-details').classList.add('d-none');
    document.getElementById('edit-name-form').classList.remove('d-none');
});



document.getElementById('cancel-name-edit-btn').addEventListener('click', () => {
    document.getElementById('edit-name-form').classList.add('d-none');
    document.getElementById('personal-details').classList.remove('d-none');
});



document.getElementById('edit-name-form-body').addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = document.getElementById('edit-name').value;
    User.fName = newName;

    // Update user data in local storage
    users[userIndex] = User;
    localStorage.setItem('users', JSON.stringify(users));

    // Reload the profile details
    loadProfile();
    document.getElementById('edit-name-form').classList.add('d-none');
    document.getElementById('personal-details').classList.remove('d-none');
});


document.getElementById('add-address-btn').addEventListener('click', () => {
    document.getElementById('address-form').classList.remove('d-none');
});

document.getElementById('cancel-address-btn').addEventListener('click', () => {
    document.getElementById('address-form').classList.add('d-none');
});

document.getElementById('address-form-body').addEventListener('submit', (e) => {
    e.preventDefault();
    const address = `
        ${document.getElementById('address-name').value}, 
        ${document.getElementById('street').value}, 
        ${document.getElementById('city').value}, 
        ${document.getElementById('country').value}, 
        ${document.getElementById('postal-code').value}
    `;
    let addresses = JSON.parse(localStorage.getItem(SavedAddress)) || [];
    addresses.push(address);
    localStorage.setItem(SavedAddress, JSON.stringify(addresses));
    document.getElementById('address-form').classList.add('d-none');
    loadAddresses();
});
