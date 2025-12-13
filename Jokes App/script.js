async function getnewjoke(){

    const response = await fetch("https://official-joke-api.appspot.com/jokes/random");

    const data = await response.json();

    document.getElementById("setup").innerText = data.setup;
    document.getElementById("punchline").innerText = data.punchline;

}