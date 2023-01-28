document.querySelector("#submit").addEventListener("click",register);

var signUp=JSON.parse(localStorage.getItem("signUpData"))||[];

function register(e){
   e.preventDefault();
   
   var obj={
       mobile:document.querySelector("#mobileNo").value,
       email:document.querySelector("#email").value,
       firstName:document.querySelector("#Fname").value,
       lastName:document.querySelector("#Lname").value,
       password:document.querySelector("#password").value,
       verifyPassword:document.querySelector("#verifyPass").value,
       gender:document.querySelector("#radio").value,
   }
   
   

   // for checking passwords match
   let password=document.querySelector("#password");
   let verifyPassword=document.querySelector("#verifyPass");
   if(password.value != verifyPassword.value){
       alert("Passwords do not match!!");
       document.querySelector("#password").value="";
       document.querySelector("#verifyPass").value="";
       return;
   }else{
       alert("Welcome to CrystaLine!!");
       window.location.href="login.html";
       
   }

   // for checking the length of mobile number
   let mobile=document.querySelector("#mobileNo")
   if (mobile.value.length !=10){
       alert("Invalid Mobile Number!!");
       document.querySelector("#mobileNo").value="";
       return;
   }

   
   
   signUp.push(obj);
   
   localStorage.setItem("signUpData",JSON.stringify(signUp));
   

  
}
