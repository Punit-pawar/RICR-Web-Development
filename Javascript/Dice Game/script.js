function start() {
    console.log("Game started");

    document.getElementById("diceone").disabled = false;
    document.getElementById("dicetwo").disabled = false;    
    document.getElementById("restart").disabled = false;
    document.getElementById("start").disabled = true;
}

function restart() {
    window.location.reload();

}

function p1play() {
    console.log("Player1Playing");

    let score = Number(document.getElementById("ponesc").innerText);

    const DF = Math.floor(Math.random()*6)+1;

    score = score + DF;

    document.getElementById("ponesc").innerText = score;

    switch (DF) {

        case 1:{
            (document.getElementById("diceone").src="");
            break; 
        }

        case 2:{
            (document.getElementById("diceone").src="");
            break; 
        }

        case 3:{
            (document.getElementById("diceone").src="");
            break; 
        }

        case 4:{
            (document.getElementById("diceone").src="");
            break; 
        }

        case 5:{
            (document.getElementById("diceone").src="");
            break; 
        }

        case 6:{
            (document.getElementById("diceone").src="");
            break; 
        }

    }

    if(DF === 6) {
        document.getElementById("diceone").disabled = true;
        document.getElementById("dicetwo").disabled = false;
    }
    else{
        score = score + DF;
        document.getElementById("ponesc").innerText = score;
    }
    
}

function p2play() {
    console.log("Player2Playing");

    let score = Number(document.getElementById("ptwosc").innerText);

    const DF = Math.floor(Math.random()*6)+1;

    document.getElementById("dicetwo").src = ``;

    if(DF === 6) {
        document.getElementById("diceone").disabled = false;
        document.getElementById("dicetwo").disabled = true;
    }
    else{
        score = score + DF;
        document.getElementById("ptwosc").innerText = score;
    }    


}
