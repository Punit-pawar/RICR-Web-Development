function submit(){

    console.log("submit Button Clicked")

    const fullname = document.getElementById("fullname").value;
    console.log(fullname)
    document.getElementById("fullname").value = "";

    alert("name");
}