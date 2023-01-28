var storedData=JSON.parse(localStorage.getItem("signUpData"));

    document.querySelector("#submit").addEventListener("click",check);

    function check(){
        var enter=document.querySelector("#enter").value;
        var password=document.querySelector("#password").value;
        let flag1=false;
        let flag2=false;

        for(let i=0;i<storedData.length;i++){
            if(storedData[i].email===enter  && storedData[i].password===password){
                flag1=true;
                flag2=true;
            }
            else if( storedData[i].mobile===enter && storedData[i].password===password){
                flag1=true;
                flag2=true;
            }
        }
        if(flag1==true && flag2==true){
            alert("Login Successful!!");
            window.location.href="index.html";
        }else{
            alert("Login Failed! Please Try Again!!");
        }
    }
