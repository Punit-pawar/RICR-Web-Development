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