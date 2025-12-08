const states = [
  { state: "Andhra Pradesh", 
    capital: "Amaravati", top: "68%", left: "37%" 
  },
  { state: "Arunachal Pradesh", 
    capital: "Itanagar", top: "26%", left: "85%" 
  },
  { state: "Assam", 
    capital: "Dispur", top: "32%", left: "80%" 
  },
  { state: "Bihar", 
    capital: "Patna", top: "35%", left: "59%" 
  },
  { state: "Chhattisgarh", 
    capital: "Raipur", top: "47%", left: "47%" 
  },
  { state: "Delhi", 
    capital: "New Delhi", top: "26%", left: "32%" 
  },
  { state: "Goa", 
    capital: "Panaji", top: "65.5%", left: "20%" 
  },
  { state: "Gujarat", 
    capital: "Gandhinagar", top: "42%", left: "15%" 
  },
  { state: "Haryana", 
    capital: "Chandigarh", top: "24%", left: "30%" 
  },
  { state: "Himachal Pradesh", 
    capital: "Shimla", top: "16%", left: "34%" 
  },
  { state: "Jammu & Kashmir",
    capital: "Srinagar/Jammu", top: "10%", left: "27%",
  },
  { state: "Jharkhand", 
    capital: "Ranchi", top: "41%", left: "57%" 
  },
  { state: "Karnataka", 
    capital: "Bengaluru", top: "68%", left: "26%" 
  },
  { state: "Kerala", 
    capital: "Thiruvananthapuram", top: "83%", left: "28%" 
  },
  { state: "Ladakh",
    capital: "Leh", top: "7%", left: "32%" 
  },
  { state: "Madhya Pradesh", 
    capital: "Bhopal", top: "42%", left: "35%" 
  },
  { state: "Maharashtra", 
    capital: "Mumbai", top: "53%", left: "25%" 
  },
  { state: "Manipur", 
    capital: "Imphal", top: "37%", left: "84%" 
  },
  { state: "Meghalaya", 
    capital: "Shillong", top: "34.5%", left: "75%" 
  },
  { state: "Mizoram", 
    capital: "Aizawl", top: "42%", left: "81%" 
  },
  { state: "Nagaland", 
    capital: "Kohima", top: "32%", left: "86%" 
  },
  { state: "Odisha", 
    capital: "Bhubaneswar", top: "50%", left: "50%" 
  },
  { state: "Punjab", 
    capital: "Chandigarh", top: "18%", left: "27%" 
  },
  { state: "Rajasthan", 
    capital: "Jaipur", top: "30%", left: "20%" 
  },
  { state: "Sikkim", 
    capital: "Gangtok", top: "30%", left: "66.8%" 
  },
  { state: "Tamil Nadu", 
    capital: "Chennai", top: "80%", left: "35%" 
  },
  { state: "Telangana",
    capital: "Hyderabad", top: "58%", left: "37%" 
  },
  { state: "Tripura", 
    capital: "Agartala", top: "40%", left: "77%" 
  },
  { state: "Uttar Pradesh", 
    capital: "Lucknow", top: "32%", left: "43%" 
  },
  { state: "Uttarakhand", 
    capital: "Dehradun", top: "21%", left: "39%" 
  },
  { state: "West Bengal", 
    capital: "Kolkata", top: "41%", left: "65%" 
  },
];

function Search() {
  const text = document.getElementById("state").value;
  const img = document.getElementById("div");
  const div = document.createElement("div");
  const w = window.innerWidth;

  div.innerText = "🚩";
  div.style.position = "absolute";

  div.style.cursor = "pointer";
  if (text === "Andhra Pradesh") {
    div.style.top = "68%";
    div.style.left = "37%";
    img.appendChild(div);
  }
  if (text === "Arunachal Pradesh") {
    div.style.top = "26%";
    div.style.left = "85%";
    img.appendChild(div);
  }
  if (text === "Assam") {
    div.style.top = "32%";
    div.style.left = "80%";
    img.appendChild(div);
  }
  if (text === "Bihar") {
    div.style.top = "35%";
    div.style.left = "59%";
    img.appendChild(div);
  }
  if (text === "Chhattisgarh") {
    div.style.top = "47%";
    div.style.left = "47%";
    img.appendChild(div);
  }
  if (text === "Delhi") {
    div.style.top = "26%";
    div.style.left = "32%";
    img.appendChild(div);
  }
  if (text === "Goa") {
    div.style.top = "65.5%";
    div.style.left = "20%";
    img.appendChild(div);
  }
  if (text === "Gujarat") {
    div.style.top = "42%";
    div.style.left = "15%";
    img.appendChild(div);
  }
  if (text === "Haryana") {
    div.style.top = "24%";
    div.style.left = "30%";
    img.appendChild(div);
  }
  if (text === "Himachal Pradesh") {
    div.style.top = "16%";
    div.style.left = "34%";
    img.appendChild(div);
  }
  if (text === "Jammu & Kashmir") {
    div.style.top = "10%";
    div.style.left = "27%";
    img.appendChild(div);
  }
  if (text === "Jharkhand") {
    div.style.top = "41%";
    div.style.left = "57%";
    img.appendChild(div);
  }
  if (text === "Karnataka") {
    div.style.top = "68%";
    div.style.left = "26%";
    img.appendChild(div);
  }
  if (text === "Kerala") {
    div.style.top = "83%";
    div.style.left = "28%";
    img.appendChild(div);
  }
  if (text === "Ladakh") {
    div.style.top = "7%";
    div.style.left = "32%";
    img.appendChild(div);
  }
  if (text === "Madhya Pradesh") {
    div.style.top = "42%";
    div.style.left = "35%";
    img.appendChild(div);
  }
  if (text === "Maharashtra") {
    div.style.top = "53%";
    div.style.left = "25%";
    img.appendChild(div);
  }
  if (text === "Manipur") {
    div.style.top = "37%";
    div.style.left = "84%";
    img.appendChild(div);
  }
  if (text === "Meghalaya") {
    div.style.top = "34.5%";
    div.style.left = "75%";
    img.appendChild(div);
  }
  if (text === "Mizoram") {
    div.style.top = "42%";
    div.style.left = "81%";
    img.appendChild(div);
  }
  if (text === "Nagaland") {
    div.style.top = "32%";
    div.style.left = "86%";
    img.appendChild(div);
  }
  if (text === "Odisha") {
    div.style.top = "50%";
    div.style.left = "50%";
    img.appendChild(div);
  }
  if (text === "Punjab") {
    div.style.top = "18%";
    div.style.left = "27%";
    img.appendChild(div);
  }
  if (text === "Rajasthan") {
    div.style.top = "30%";
    div.style.left = "20%";
    img.appendChild(div);
  }
  if (text === "Sikkim") {
    div.style.top = "30%";
    div.style.left = "66.8%";
    img.appendChild(div);
  }
  if (text === "Tamil Nadu") {
    div.style.top = "80%";
    div.style.left = "35%";
    img.appendChild(div);
  }
  if (text === "Telangana") {
    div.style.top = "58%";
    div.style.left = "37%";
    img.appendChild(div);
  }
  if (text === "Tripura") {
    div.style.top = "40%";
    div.style.left = "77%";
    img.appendChild(div);
  }
  if (text === "Uttar Pradesh") {
    div.style.top = "32%";
    div.style.left = "43%";
    img.appendChild(div);
  }
  if (text === "Uttarakhand") {
    div.style.top = "21%";
    div.style.left = "39%";
    img.appendChild(div);
  }
  if (text === "West Bengal") {
    div.style.top = "41%";
    div.style.left = "65%";
    img.appendChild(div);
  }
  const temp2 = document.createElement("p");

  states.map((item) => {
    if (item.state === text) {
      temp2.innerText = `Capital: ${item.capital}`;
      temp2.style.position = "absolute";
      temp2.style.zIndex = "1";
      temp2.style.bottom = "-55px";
      temp2.style.left = "0%";
      temp2.style.cursor = "pointer";
      temp2.style.width = "210px";
      temp2.style.zIndex = "99";
    }
  });

  if (
    text === "Arunachal Pradesh" ||
    text === "Nagaland" ||
    text === "Manipur" ||
    text === "Mizoram"
  ) {
    temp.style.left = "-80px";
    temp.style.width = "150px";
    temp2.style.left = "-80px";
  }

  div.addEventListener("mouseenter", () => {
    div.appendChild(temp);
    div.appendChild(temp2);
  });
  div.addEventListener("mouseleave", () => {
    div.removeChild(temp);
    div.removeChild(temp2);
  });
}


function Add() {
  const text = document.getElementById("state").value;
  const img = document.getElementById("div");
  states.map((item) => {
    const div = document.createElement("div");
    const w = window.innerWidth;
    div.innerText = "🚩";
    div.style.position = "absolute";
    if (w < 400) {
      div.style.fontSize = "small";
    }
    div.style.zIndex = "9999";
    div.style.cursor = "pointer";
    div.style.top = item.top;
    div.style.left = item.left;
    img.appendChild(div);
    const temp = document.createElement("p");
    temp.innerText = item.state;
    temp.style.position = "absolute";
    temp.style.zIndex = "1";
    temp.style.bottom = "-35px";
    temp.style.left = "0%";
    temp.style.cursor = "pointer";
    temp.style.width = "145px";
    temp.style.fontWeight = "bold";
    temp.style.zIndex = "999";

    const temp2 = document.createElement("p");
    temp2.innerText = `Capital: ${item.capital}`;
    temp2.style.position = "absolute";
    temp2.style.zIndex = "1";
    temp2.style.bottom = "-55px";
    temp2.style.left = "0%";
    temp2.style.cursor = "pointer";
    temp2.style.width = "210px";
    temp2.style.zIndex = "999";

    if (
      item.state === "Arunachal Pradesh" ||
      item.state === "Nagaland" ||
      item.state === "Manipur" ||
      item.state === "Mizoram"
    ) {
      temp.style.left = "-80px";
      temp.style.width = "150px";
      temp2.style.left = "-80px";
    }
    div.addEventListener("mouseenter", () => {
      div.appendChild(temp);
      div.appendChild(temp2);
    });
    div.addEventListener("mouseleave", () => {
      div.removeChild(temp);
      div.removeChild(temp2);
    });
  });
}

function clearall() {
  const DD = document.getElementById("div");
  if (DD.children.length === 1) return;
  while (DD.children.length > 1) {
    DD.removeChild(DD.lastChild);
  }

}
