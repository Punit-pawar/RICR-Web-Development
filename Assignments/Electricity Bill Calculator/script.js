function calculateBill() {
    const units = parseInt(document.getElementById("units").value);

    if (isNaN (units) || units < 0) {
        alert("Please enter a valid positive number of units.");
        return; }

    let remaining = units;
    let slab1Units = Math.min(50, remaining);
    remaining -= slab1Units ;

    let slab2Units = Math.min(150, Math.max(remaining, 0));
    remaining -= slab2Units ;

    let slab3Units = Math.min(250, Math.max(remaining, 0));
    remaining -= slab3Units ;

    let slab4Units = Math.max(remaining, 0);

    let slab1Charge = slab1Units*0.50;
    let slab2Charge = slab2Units*0.75;
    let slab3Charge = slab3Units* 1.20;
    let slab4Charge = slab4Units*1.50;

    let subtotal = slab1Charge + slab2Charge + slab3Charge + slab4Charge;
    let surcharge = subtotal * 0.20;
    let Finalbill = subtotal + surcharge;

    document.getElementById("slab1").textContent = 
    `₹${slab1Charge.toFixed(2)}`;

    document.getElementById("slab2").textContent = 
    `₹${slab2Charge.toFixed(2)}`;

    document.getElementById("slab3").textContent = 
    `₹${slab3Charge.toFixed(2)}`;

    document.getElementById("slab4").textContent = 
    `₹${slab4Charge.toFixed(2)}`;

    document.getElementById("subtotal").textContent = 
    `₹${subtotal.toFixed(2)}`;

    document.getElementById("surcharge").textContent = 
    `₹${surcharge.toFixed(2)}`;

    document.getElementById("Finalbill").textContent = 
    `₹${Finalbill.toFixed(2)}`;

    document.getElementById("billsec").classList.remove("d-none");
}

function resetCalculator() {
    document.getElementById("units").value = "";
    document.getElementById("billsec").classList.add("d-none");
}
