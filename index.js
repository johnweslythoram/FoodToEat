const params = new URLSearchParams(window.location.search);
const username = params.get('username');
console.log(username)
const userElement = document.getElementById('nav-item5');
const nonVeg=document.getElementById("nonveg"); 
const veg=document.getElementById("veg");
const myCart=document.getElementById("nav-item3");
const menu=document.getElementById("nav-item2");
const myoders=document.getElementById("nav-item6");
const soup=document.getElementById("soup");
const menuCart=document.getElementById("menu");
const order=document.getElementById("order");
const delivary=document.getElementById("delivary");
const clean=document.getElementById("clean");
const prof=document.getElementById("nav-item1")
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

nonVeg.onclick=function(){
    window.location.href='nonVeg.html?username=' + encodeURIComponent(User.email);
}

prof.onclick=function(){
    window.location.href='profile.html?username=' + encodeURIComponent(User.email);
}

veg.onclick=function(){
    window.location.href='Veg.html?username=' + encodeURIComponent(User.email);
}

soup.onclick=function(){
    window.location.href='soups.html?username=' + encodeURIComponent(User.email);
}

myCart.onclick=function(){
    window.location.href='myCart.html?username=' + encodeURIComponent(User.email);
}

myoders.onclick=function(){
    window.location.href='myorders.html?username=' + encodeURIComponent(User.email);
}

menu.onclick=function(){
    window.location.href='ems.html?username=' + encodeURIComponent(User.email);
}

menuCart.onclick=function(){
    window.location.href='ems.html?username=' + encodeURIComponent(User.email);
}

order.onclick=function(){
    window.location.href='myCart.html?username=' + encodeURIComponent(User.email);
}

delivary.onclick=function(){
    window.location.href='myCart.html?username=' + encodeURIComponent(User.email);
}

clean.onclick=function(){
    window.location.href='ems.html?username=' + encodeURIComponent(User.email);
}




window.onload = function() {
    if (username) {
        return;
    } else {
        window.location.href = 'intro.html';
    }
}; 