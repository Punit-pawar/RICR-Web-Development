// let inputnumber = Math.floor(Math.random() * 10) + 1;
let inputnumber = 7;

function Guessnumber() {
    let guess = Number(document.getElementById("number").value);

    if (guess < inputnumber) {
        alert("OOPS! SORRY!!! TRY A SMALLER NUMBER.");
    } 
    else if (guess > inputnumber) {
        alert("OOPS! SORRY!!! TRY A LARGER NUMBER.");
    } 
    else {
        alert("Congratulations! You guessed it right!");
    }
}