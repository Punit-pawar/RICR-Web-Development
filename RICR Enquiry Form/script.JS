function submit(){
    console.log("submit Button Clicked")

    const name = document.getElementById("firstname").value;
    console.log(name)
    document.getElementById("firstname").value = "";


    const cn = document.getElementById("ContactNumber").value;
    console.log(cn)
    document.getElementById("ContactNumber").value = "";


    const email = document.getElementById("email").value;
    console.log(email)
    document.getElementById("email").value = "";

    
    const Qualification = document.getElementById("Qualification").value;  
    console.log(Qualification)
    document.getElementById("Qualification").value = "";

    
    const collegename = document.getElementById("collegename").value;
    console.log(collegename)
    document.getElementById("collegename").value = "";  


    const year = document.getElementById("year").value;
    console.log(year)
    document.getElementById("year").value = "";


    const Branch = document.getElementById("Branch").value;
    console.log(Branch)
    document.getElementById("Branch").value = "";

    const Course = document.getElementById("Course").value;
    console.log(Course)
    document.getElementById("Course").value = "";    

    const source = document.getElementById("source").value;   
    console.log(source)
    document.getElementById("source").value = "";    

    alert("submit Done")


}