const params = new URLSearchParams(window.location.search);
const username = params.get('username');

const users = JSON.parse(localStorage.getItem('users')) || [];
const userElement = document.getElementById('nav-item5');
const myCart=document.getElementById("nav-item3");
const myoders=document.getElementById("nav-item6");
const myprofile=document.getElementById("nav-item1");
const signout=document.getElementById("nav-item4");
const userIndex = users.findIndex(user => user.email === username);
const User = users[userIndex];
let USERNAME = User.email;
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

let nonveg=document.getElementById("nonveg");
let veg=document.getElementById("veg");
let soups=document.getElementById("soups");
let fish=document.getElementById("Fish");
let biryani=document.getElementById("biryani");
let noodle=document.getElementById("noodle");
let salad=document.getElementById("salad");
let dessert=document.getElementById("dessert");

nonveg.onclick = function () {
    window.location.href = 'nonVeg.html?username=' + encodeURIComponent(USERNAME);
  };

veg.onclick = function () {
    window.location.href = 'Veg.html?username=' + encodeURIComponent(USERNAME);
  };

soups.onclick = function () {
    window.location.href = 'soups.html?username=' + encodeURIComponent(USERNAME);
  };

fish.onclick = function () {
    window.location.href = 'seefods.html?username=' + encodeURIComponent(USERNAME);
  };

biryani.onclick = function () {
    window.location.href = 'Biryani.html?username=' + encodeURIComponent(USERNAME);
  };

noodle.onclick = function () {
    window.location.href = 'noodle.html?username=' + encodeURIComponent(USERNAME);
  };

salad.onclick = function () {
    window.location.href = 'salads.html?username=' + encodeURIComponent(USERNAME);
  };

dessert.onclick = function () {
    window.location.href = 'Desserts.html?username=' + encodeURIComponent(USERNAME);
  };