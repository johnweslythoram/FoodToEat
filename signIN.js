document.addEventListener('DOMContentLoaded', () => {
    const submitSigninBtn = document.getElementById('submitSignin');
    submitSigninBtn.addEventListener('click', handleSignIn);
});

let alert1 = document.getElementById("alert1");
let alert2 = document.getElementById("alert2");
let Email = document.getElementById('emailSignin');
let password = document.getElementById('passwordSignin');
let modal=document.getElementById('Modal')

function check() {
    let valid = true;

    if (Email.value.trim() === '') {
        alert1.textContent = "Required";
        valid = false;
    } else {
        alert1.textContent = "";
    }

    if (password.value === '') {
        alert2.textContent = "Required";
        valid = false;
    } else {
        alert2.textContent = "";
    }

    if (Email.value.trim() !== '' && !validateEmail(Email.value)) {
        alert1.textContent = "Missing @ or not a valid Gmail address";
        valid = false;
    }

    return valid;
}

function handleSignIn(event) {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let User;
    let delItem = users.findIndex(
        function (item) {
            return item.email === Email.value;
        }
    );

    User = users[delItem];
    if (!check()) return;


    if (delItem === -1 && Email.value.length >= 1 && validateEmail(Email.value)) {
        alert1.textContent = "Email doesn't exist. Please sign Up!";
    } else {
        alert1.textContent = "";
    }

    if (delItem >= 0 && password.value !== User.password) {
        alert2.textContent = "Incorrect Password";
    } else if (delItem >= 0 && password.value === User.password) {
        alert2.textContent = "";
        let userName=User.fName;
        console.log(userName)
        modal.textContent=`Welcome, ${userName}!`;
        showOrderSuccessModal(User.email); // Show animation after successful login
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@gmail\.com$/;
    return re.test(email);
}

// Function to display the welcome modal
function showOrderSuccessModal(mail) {
    const modal = document.getElementById('welcomeModal');
    modal.style.display = 'flex'; // Show the modal

    // Hide modal after 3 seconds
    setTimeout(() => {
        modal.style.display = 'none';
        window.location.href='index.html?username=' + encodeURIComponent(mail);
    }, 3000);
}
