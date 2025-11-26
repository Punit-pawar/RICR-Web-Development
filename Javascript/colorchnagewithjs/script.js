function chnagebackcolor(bgcolor) {
  document.getElementById("inbox").style.backgroundColor = bgcolor;
}

const backcolor = document.getElementById("bgcolor");
backcolor.addEventListener("change", () => chnagebackcolor(backcolor.value));

function chnageheadcolor(headcolor) {
  document.getElementById("heading").style.color = headcolor;
}

const headcolor = document.getElementById("headcolor");
headcolor.addEventListener("change", () => chnageheadcolor(headcolor.value));

function chnageprgcolor(paracolor) {
  document.getElementById("para").style.color = paracolor;
}

const prgcolor = document.getElementById("paracolor");
prgcolor.addEventListener("change", () => chnageprgcolor(prgcolor.value));
