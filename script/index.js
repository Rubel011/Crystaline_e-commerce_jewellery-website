let signinDiv = document.getElementsByClassName("signinDiv")[0];
let signin = document.getElementsByClassName("signin")[0];

let adminbtn=document.getElementById("admin")
let sign_up_btn=document.getElementById("sign_up")

adminbtn.addEventListener("click",()=>{
  window.location.href="admin.html"
})
sign_up_btn.addEventListener("click",()=>{
  window.location.href="signup.html"
})

signinDiv.addEventListener("mouseover", function(){
  signin.style.display = "block";
});

signinDiv.addEventListener("mouseout", function(){
  signin.style.display = "none";
});
