var storedData=JSON.parse(localStorage.getItem("signUpData"));

    document.querySelector("#submit").addEventListener("click",check);

    function check(){
        var enter=document.querySelector("#enter").value;
        
        let flag=false;

        for(let i=0;i<storedData.length;i++){
            if(storedData[i].email===enter || storedData[i].mobile===enter){
                flag=true;
            }
        }
        if(flag==true){
            alert("Login Successful!!");
            window.location.href="index.html";
        }else{
            alert("Login Failed!");
        }
    }
