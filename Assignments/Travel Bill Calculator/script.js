function calculateBill() 
{
    const Kms = document.getElementById("Kms");
    const errorMsg = document.getElementById("errorMsg");
    const billsection = document.getElementById("billsection");
    const breakdown = document.getElementById("breakdown");
    const Finalprice = document.getElementById("Finalprice");

    const km = parseFloat(Kms.value);

    if (Kms.value === "" || isNaN(km) || km < 0) {
        errorMsg.textContent = "Please enter a non-negative number of kilometres.";
        billsection.classList.add("d-none");
        return;
    }

    errorMsg.textContent = "";
    breakdown.innerHTML = "";

    let remaining = km;
    let total = 0;

    const Rate1 = 11;
    const Rate2 = 10;
    const Rate3 = 8;

    let slab1Km = Math.min(10, remaining);
    let slab1Cost = slab1Km * Rate1;
    remaining -= slab1Km;

    let slab2Km = Math.min(40, Math.max(remaining, 0));
    let slab2Cost = slab2Km * Rate2;
    remaining -= slab2Km;

    let slab3Km = Math.max(remaining, 0);
    let slab3Cost = slab3Km * Rate3;

    total = slab1Cost + slab2Cost + slab3Cost;

    addRow(`${slab1Km} km * Rs.${Rate1}`, slab1Cost);
    addRow(`${slab2Km} km * Rs.${Rate2}`, slab2Cost);
    addRow(`${slab3Km} km * Rs.${Rate3}`, slab3Cost);

    Finalprice.textContent = formatNumber(total.toFixed(2));
    billsection.classList.remove("d-none");
}

function addRow(text, amount) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<span>${text}</span><span>Rs. ${formatNumber(amount.toFixed(2))}</span>`;
    document.getElementById("breakdown").appendChild(li);
}

function formatNumber(num) {
    return Number(num).toLocaleString("en");
}
