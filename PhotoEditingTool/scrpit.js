let 
b=1, 
c=1, 
g=0, 
s=0, 
sa=1,
i=0;

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

// function applyFilter(){
//   document.getElementById("image").style.filter = ` Brightness(${b})
//                                                     Contrast(${c})
//                                                     grayscale(${g}%)
//                                                     Sepia(${s}%)
//                                                     Saturate(${sa})
//                                                     invert(${i}%)`
// }


function changeBrightness(){
    const value =  document.getElementById("Brightness").value;
    document.getElementById("image").style.filter=`brightness(${value*2/100})`
}


function changeContrast(){
    const value =  document.getElementById("Contrast").value;
    document.getElementById("image").style.filter=`contrast(${value*2/100})`
}

function changegrayscale(){
    const value =  document.getElementById("grayscale").value;
    document.getElementById("image").style.filter=`grayscale(${value}%)`
}

function changeSepia(){
    const value =  document.getElementById("Sepia").value;
    document.getElementById("image").style.filter=`Sepia(${value}%)`
}

function changeSaturate(){
    const value =  document.getElementById("Saturate").value;
    document.getElementById("image").style.filter=`Saturate(${value*2/100})`
}

function changehuerotate(){
    const value =  document.getElementById("hue-rotate").value;
    document.getElementById("image").style.filter=`hue-rotate(${value*2/100})`
}

function changeinvert(){
    const value =  document.getElementById("invert").value;
    document.getElementById("image").style.filter=`invert(${value*2/100})`
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

