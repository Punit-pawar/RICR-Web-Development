function pizzaorder(){
    console.log("Submit Button Clicked")

    const name = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("Email").value;
    const num = document.getElementById("Number").value;   
    const deliverydate = document.getElementById("deliverydate").value;
    const small = document.getElementById("small").value;
    const medium = document.getElementById("medium").value;
    const large = document.getElementById("large").value;       
    
    console.log(name)
    console.log(lastname)
    console.log(email)
    console.log(num)
    console.log(deliverydate)
    console.log(small)
    console.log(medium)
    console.log(large)

    alert("registration Done")
    

    // This is for empty a data like reset when you click on login button

    // document.getElementById("regname").value = "";
    // document.getElementById("regemail").value = "";
    // document.getElementById("regpassword").value = "";
    // document.getElementById("regconfirmpassword").value = "";


}