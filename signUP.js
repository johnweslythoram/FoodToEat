document.addEventListener('DOMContentLoaded', () => {
  const submitSignup = document.getElementById('submitSignup');

  // Get the input elements
  let fullNameSignup = document.getElementById("fullNameSignup");
  let emailSignup = document.getElementById("emailSignup");
  let passwordSignup = document.getElementById("passwordSignup");
  let confirmPasswordSignup = document.getElementById("confirmPasswordSignup");

  // Initialize alert elements
  const alert1 = document.getElementById('alert1');
  const alert2 = document.getElementById('alert2');
  const alert3 = document.getElementById('alert3');
  const alert4 = document.getElementById('alert4');

  // Fetch users from local storage
  let user = GetUsers();

  submitSignup.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission

      // Clear previous alerts
      alert2.textContent = '';
      alert3.textContent = '';
      alert4.textContent = '';

      // Validate form
      if (!check()) return;

      // Check if email already exists
      let emailExists = user.some(i => i.email === emailSignup.value);
      if (emailExists) {
          alert2.textContent = "Email already exists.";
          return;
      }

      // Check password strength
      let passwordStrength = checkPasswordStrength(passwordSignup.value);
      console.log(passwordStrength);
      if (passwordStrength !== "Very Strong") {
          alert3.textContent = "Password does not meet the requirements.";
          return;
      }

      // Check if passwords match
      if (passwordSignup.value !== confirmPasswordSignup.value) {
          alert4.textContent = "Password didn't match.";
          return;
      }

      // If all validations pass, store user in local storage
      storeUser({
          email: emailSignup.value,
          password: passwordSignup.value,
          fName: fullNameSignup.value
      });

      // Redirect to index page after successful signup
      showOrderSuccessModal(emailSignup.value,fullNameSignup.value);
      // window.location.href = 'index.html?username=' + encodeURIComponent(emailSignup.value);
  });

  function check() {
      let valid = true;

      if (fullNameSignup.value.length > 0) {
          alert1.textContent = "";
      } else {
          alert1.textContent = "Required";
          valid = false;
      }

      if (emailSignup.value.trim() === '') {
          alert2.textContent = "Required";
          valid = false;
      } else {
          alert2.textContent = "";
      }

      if (passwordSignup.value === '') {
          alert3.textContent = "Required";
          valid = false;
      } else {
          alert3.textContent = "";
      }

      if (confirmPasswordSignup.value === '') {
          alert4.textContent = "Required";
          valid = false;
      } else {
          alert4.textContent = "";
      }

      if (emailSignup.value.trim() !== '' && !validateEmail(emailSignup.value)) {
          alert2.textContent = "Missing @ or not a valid Gmail address";
          valid = false;
      }

      return valid;
  }

  function checkPasswordStrength(password) {
      // Initialize variables for strength checks
      let strength = 0;

      // Criteria checks
      if (password.length >= 8) {
          strength += 1; // Minimum length of 8 characters
      }

      if (/[A-Z]/.test(password)) {
          strength += 1; // Contains at least one uppercase letter
      }

      if (/[a-z]/.test(password)) {
          strength += 1; // Contains at least one lowercase letter
      }

      if (/[0-9]/.test(password)) {
          strength += 1; // Contains at least one digit
      }

      if (/[\W_]/.test(password)) {
          strength += 1; // Contains at least one special character
      }

      console.log(strength);
      let result = '';
      switch (strength) {
          case 0:
          case 1:
              result = "Very Weak";
              break;
          case 2:
              result = "Weak";
              break;
          case 3:
              result = "Moderate";
              break;
          case 4:
              result = "Strong";
              break;
          case 5:
              result = "Very Strong";
              break;
      }

      return result;
  }

  function validateEmail(email) {
      const re = /^[^\s@]+@gmail\.com$/;
      return re.test(email);
  }

  function GetUsers() {
      let stringfylist = localStorage.getItem("users");
      let parsedlist = JSON.parse(stringfylist);
      if (parsedlist === null) {
          return [];
      } else {
          return parsedlist;
      }
  }

  function storeUser(newUser) {
      user.push(newUser); // Add the new user to the users array
      localStorage.setItem("users", JSON.stringify(user)); // Update local storage
  }

  function showOrderSuccessModal(mail,username) {

    const modal = document.getElementById('welcomeModal');
    let modal1=document.getElementById('Modal')
    modal1.textContent=`Welcome, ${username}!`;
    modal.style.display = 'flex'; // Show the modal

    // Hide modal after 3 seconds
    setTimeout(() => {
        modal.style.display = 'none';
        window.location.href='index.html?username=' + encodeURIComponent(mail);
    }, 3000);
}
});
