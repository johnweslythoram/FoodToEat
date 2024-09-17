let emailSignin=document.getElementById("emailSignin");
let passwordSignin=document.getElementById("passwordSignin");
let submitSignin=document.getElementById("submitSignin");
let fullNameSignup=document.getElementById("fullNameSignup");
let emailSignup=document.getElementById("emailSignup");
let passwordSignup=document.getElementById("passwordSignup");
let confirmPasswordSignup=document.getElementById("confirmPasswordSignup");
let submitSignup=document.getElementById("submitSignup");

// user=GetUsers()


// function checkPasswordStrength(password) {
//     // Initialize variables for strength checks
//     let strength = 0;
  
//     // Criteria checks
//     if (password.length >= 8) {
//       strength += 1; // Minimum length of 8 characters
//     }
  
//     if (/[A-Z]/.test(password)) {
//       strength += 1; // Contains at least one uppercase letter
//     }
  
//     if (/[a-z]/.test(password)) {
//       strength += 1; // Contains at least one lowercase letter
//     }
  
//     if (/[0-9]/.test(password)) {
//       strength += 1; // Contains at least one digit
//     }
  
//     if (/[\W_]/.test(password)) {
//       strength += 1; // Contains at least one special character
//     }
  
//     let result = '';
//     switch (strength) {
//       case 0:
//       case 1:
//         result = "Very Weak";
//         break;
//       case 2:
//         result = "Weak";
//         break;
//       case 3:
//         result = "Moderate";
//         break;
//       case 4:
//         result = "Strong";
//         break;
//       case 5:
//         result = "Very Strong";
//         break;
//     }
    
//     return result;
//   }

  
  

submitSignin.onclick=function(event){
    event.preventDefault();
        window.location.href = 'index.html?username=' + encodeURIComponent(emailSignin.value);
    
    
    
}  




// submitSignup.addEventListener("click",function(event){
//     event.preventDefault();
//     for(let i of user){
//         if(i.mail===emailSignup.value){
//             alert("hjakfhsk")
//             return;
//         }
//     }
//         if(checkPasswordStrength(passwordSignup.value)!=="Very Strong"){
//             alert("strength")
//         }
//         if(passwordSignup.value!==confirmPasswordSignup.value){
//             alert("pass")
//         }

    
// }
// )



// function GetUsers(){
//     let stringfylist=localStorage.getItem("Users");
//     let parsedlist=JSON.parse(stringfylist);
//     if(parsedlist===null){
//         return [];
//     }
//     else{
//         return parsedlist;
//     }
// }








