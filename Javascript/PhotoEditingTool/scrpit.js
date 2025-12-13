let b = 1,
  c = 1,
  g = 0,
  se = 0,
  s = 0,
  i = 0;

const img = document.getElementById("image");

console.log(img.src);

if (img.src === "http://127.0.0.1:5500/PhotoEditingTool/index.html") {
  document.getElementById("image").style.display = "none";
}


function uploadImage() {
  const file = document.getElementById("Upload").files[0];
  const fileURL = URL.createObjectURL(file);

  document.getElementById("image").src = fileURL;
  document.getElementById("image").style.display = "block";
  document.getElementById("uploadLabel").style.display = "none";
}

function applyFilter() {
  document.getElementById("image").style.filter = ` brightness(${b}) 
                                                    contrast(${c}) 
                                                    grayscale(${g}%) 
                                                    sepia(${se}%)
                                                    Saturate(${s}%)
                                                    invert(${i}%)`;
}


function changeBrightness(){
    const value =  document.getElementById("Brightness").value;
    b = (value * 2) / 100;
    applyFilter();
}


function changeContrast(){
    const value =  document.getElementById("Contrast").value;
    c = (value * 2) / 100;
    applyFilter();
}

function changegrayscale(){
    const value =  document.getElementById("grayscale").value;
    g = value;
    applyFilter();
}

function changeSepia(){
    const value =  document.getElementById("Sepia").value;
    se = value;
    applyFilter();
}

function changeSaturate(){
    const value =  document.getElementById("Saturate").value;
    s = (value * 2) / 100;
    applyFilter();
}


function changeinvert(){
    const value =  document.getElementById("invert").value;
    i = value;
    applyFilter();
}

function reset() {
  b = 1;
  c = 1;
  se = 0;
  s = 1;
  i = 0;
  g = 0;

  applyFilter();
  document.getElementById("Brightness").value = "50";
  document.getElementById("Contrast").value = "50";
  document.getElementById("Sepia").value = "0";
  document.getElementById("Saturate").value = "50";
  document.getElementById("Invert").value = "0";
  document.getElementById("Grayscale").value = "0";

}

function Download(){
    const image = document.getElementById("image");

if (img.src === "http://127.0.0.1:5500/PhotoEditingTool/index.html") {

  alert("Plese upload a Image first")

  }

  if(!img.complete){
    alert("image upload is in prograess. Please Wait.....")
  }

  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");

  canvas.width = img.naturalwidth;
  canvas.height = img.naturalheight;

  const filter = getComputedStyle(img).filter;

  ctx.filter = filter === "none"? "none" : filter;

  ctx.drawImage(img,0,0,canvas.width, canvas.height);

  const dataurl = canvas.toDataURL("imahe/png");

  const anchorTag = document.createElement("a");

  anchorTag.href = dataurl;

  anchorTag.download= "Editedimg.png";

  document.body.appendChild(anchorTag);
  anchorTag.click();

}

