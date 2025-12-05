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


Document.getElementById("c1").addEventListener("mouseenter", ()=>{
    fillcolor("red")
});

Document.getElementById("c1").addEventListener("mosueleave", ()=>{
    fillcolor("white")
});

Document.getElementById("c2").addEventListener("mosueenter", ()=>{
    fillcolor("green")
});

Document.getElementById("c2").addEventListener("mosueleave", ()=>{
    fillcolor("white")
});

Document.getElementById("c3").addEventListener("mosueenter", ()=>{
    fillcolor("blue")
});

Document.getElementById("c3").addEventListener("mosueleave", ()=>{
    fillcolor("white")
});

Document.getElementById("c4").addEventListener("mosueenter", ()=>{
    fillcolor("black")
});

Document.getElementById("c4").addEventListener("mosueleave", ()=>{
    fillcolor("white")
});

Document.getElementById("c5").addEventListener("mosueenter", ()=>{
    fillcolor("purple")
});

Document.getElementById("c5").addEventListener("mosueleave", ()=>{
    fillcolor("white")
});

Document.getElementById("c6").addEventListener("mosueenter", ()=>{
    fillcolor("gray")
});

Document.getElementById("c6").addEventListener("mosueleave", ()=>{
    fillcolor("white")
});

Document.getElementById("c7").addEventListener("mosueenter", ()=>{
    fillcolor("violet")
});

Document.getElementById("c7").addEventListener("mosueleave", ()=>{
    fillcolor("white")
});

function fillcolor(color)
{
    document.getElementById("hoverbulb").style.backgroundColor = color;
}