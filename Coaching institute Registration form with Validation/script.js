function submit(){

    console.log("submit Button Clicked")

    const fullname = document.getElementById("fullname").value;
    console.log(fullname)
    document.getElementById("fullname").value = "";


    let seletedbatchtiming=[];


    document
    const batch = document.querySelectorAll("input[name='batch']:checked");
    batch.forEach((element)=>{
        seletedbatchtiming.push(element.value)

    })

    console.log(seletedbatchtiming);
    
}