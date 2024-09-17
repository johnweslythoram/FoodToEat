const params = new URLSearchParams(window.location.search);
const username = params.get('username');
console.log(username)
const userElement = document.getElementById('nav-item5');
const myCart=document.getElementById("nav-item3");
const myoders=document.getElementById("nav-item6");
    // Fetch users from localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user by email
const userIndex = users.findIndex(user => user.email === username);
const User = users[userIndex];
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
    window.location.href='profile.html?username=' + encodeURIComponent(User.email);
}


// window.onload = function() {
//     if (username) {
//         return;
//     } else {
//         window.location.href = 'signIn.html';
//     }
// }; 