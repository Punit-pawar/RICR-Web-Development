function login(){
    console.log("Login Button Clicked")

    const em = document.getElementById("loginemail").value;
    const pm = document.getElementById("loginpassword").value;

    console.log(em)
    console.log(pm)

    alert("Login Done")

    // This is for empty a data like reset when you click on login button
    document.getElementById("loginemail").value = "";
    document.getElementById("loginpassword").value= "";

}

function registration(){
    console.log("registration Button Clicked")

    const rn = document.getElementById("regname").value;
    const rm = document.getElementById("regemail").value;
    const rp = document.getElementById("regpassword").value;
    const rcp = document.getElementById("regconfirmpassword").value;    
    
    console.log(rn)
    console.log(rm)
    console.log(rp)
    console.log(rcp)

    alert("registration Done")

    // This is for empty a data like reset when you click on login button

    document.getElementById("regname").value = "";
    document.getElementById("regemail").value = "";
    document.getElementById("regpassword").value = "";
    document.getElementById("regconfirmpassword").value = "";
        
}

