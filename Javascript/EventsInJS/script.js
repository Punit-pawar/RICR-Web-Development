function on()
{
    document.getElementById("bulb").style.backgroundColor = "yellow";
}

function off()
{
    document.getElementById("bulb").style.backgroundColor = "white"; 
    
}

function blue()
{
    document.getElementById("bulb").style.backgroundColor = "blue";
}

function black()
{
    document.getElementById("bulb").style.backgroundColor = "black"; 
    
}

function red()
{
    document.getElementById("bulb").style.backgroundColor = "red";
}

const usercolor = document.getElementById("color");
usercolor.addEventListener("change", () => changebulbcolor(usercolor.value));

function changebulbcolor(color)
{
    document.getElementById("bulb").style.backgroundColor = color;
}


function SB_control()
{
    const btn = document.getElementById("SB_btn");
    
    if (btn.innerText === "n")
    {
        document.getElementById("SB_btn").innerText = "off";
        document.getElementById("smartbulb").classList.add("on");
    }
    else
    {
        document.getElementById("SB_btn").innerText = "on";
        document.getElementById("smartbulb").classList.remove("on");
    }

}

document.getElementById("c1").addEventListener("mouseenter", ()=>{
    fillcolor("red")
});

document.getElementById("c1").addEventListener("mouseleave", ()=>{
    fillcolor("white")
});

document.getElementById("c2").addEventListener("mouseenter", ()=>{
    fillcolor("green")
});

document.getElementById("c2").addEventListener("mouseleave", ()=>{
    fillcolor("white")
});

document.getElementById("c3").addEventListener("mouseenter", ()=>{
    fillcolor("blue")
});

document.getElementById("c3").addEventListener("mouseleave", ()=>{
    fillcolor("white")
});

document.getElementById("c4").addEventListener("mouseenter", ()=>{
    fillcolor("black")
});

document.getElementById("c4").addEventListener("mouseleave", ()=>{
    fillcolor("white")
});

document.getElementById("c5").addEventListener("mouseenter", ()=>{
    fillcolor("purpule")
});

document.getElementById("c5").addEventListener("mouseleave", ()=>{
    fillcolor("white")
});

document.getElementById("c6").addEventListener("mouseenter", ()=>{
    fillcolor("gray")
});

document.getElementById("c6").addEventListener("mouseleave", ()=>{
    fillcolor("white")
});

document.getElementById("c7").addEventListener("mouseenter", ()=>{
    fillcolor("violet")
});

document.getElementById("c7").addEventListener("mouseleave", ()=>{
    fillcolor("white")
});


function fillcolor(color)
{
    document.getElementById("hoverbulb").style.backgroundColor = color;
}