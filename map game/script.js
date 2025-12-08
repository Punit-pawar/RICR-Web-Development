const statePositions = {
    "andhra pradesh": [40, 70],
    "arunachal pradesh": [89, 30],
        assam: [82, 36],
        bihar: [61, 40],
        chhattisgarh: [49, 54],
        goa: [23.5, 70],
        gujarat: [15, 48],
        haryana: [33, 28],
    "himachal pradesh": [37, 20],
        jharkhand: [59, 46],
        karnataka: [30, 73],
        kerala: [31, 86],
    "madhya pradesh": [38, 46  ],
        maharashtra: [30, 57],
        manipur: [87, 40],
        meghalaya: [80, 39],
        mizoram: [84, 47],
        nagaland: [89, 37.5],
        odisha: [58, 56],
        punjab: [31, 24],
        rajasthan: [26, 38],
        sikkim: [70, 33.5],
    "tamil nadu": [36, 86],
        telangana: [40, 63],
        tripura: [80, 44],
    "uttar pradesh": [48, 38],
        uttarakhand: [43, 26],
    "west bengal": [70, 48],
        delhi: [36, 31.5],
    "jammu & kashmir": [35, 12],
        ladakh: [30, 15],

};

const stateInfo = {
  "andhra pradesh": {
    capital: "Amaravati",
  },
  "arunachal pradesh": {
    capital: "Itanagar",
  },
  assam: { capital: "Dispur" },
  bihar: { capital: "Patna" },
  chhattisgarh: {
    capital: "Raipur",
  },
  goa: { capital: "Panaji" },
  gujarat: {
    capital: "Gandhinagar",
  },
  haryana: {
    capital: "Chandigarh",
  },
  "himachal pradesh": {
    capital: "Shimla",
  },
  jharkhand: { capital: "Ranchi" },
  karnataka: { capital: "Bengaluru" },
  kerala: {
    capital: "Thiruvananthapuram",
  },
  "madhya pradesh": {
    capital: "Bhopal",
  },
  maharashtra: { capital: "Mumbai" },
  manipur: { capital: "Imphal" },
  meghalaya: { capital: "Shillong" },
  mizoram: { capital: "Aizawl" },
  nagaland: { capital: "Kohima" },
  odisha: {
    capital: "Bhubaneswar",
  },
  punjab: { capital: "Chandigarh" },
  rajasthan: {
    capital: "Jaipur",
  },
  sikkim: { capital: "Gangtok" },
  "tamil nadu": { capital: "Chennai" },
  telangana: {
    capital: "Hyderabad",
  },
  tripura: { capital: "Agartala" },
  "uttar pradesh": {
    capital: "Lucknow",
  },
  uttarakhand: {
    capital: "Dehradun",
  },
  "west bengal": {
    capital: "Kolkata",
  },
  delhi: { capital: "New Delhi" },
  "jammu & kashmir": {
    capital: "Srinagar/Jammu",
  },
  ladakh: { capital: "Leh" },
  "andaman and nicobar islands": {
    capital: "Port Blair",
  },
  lakshadweep: {
    capital: "Kavaratti",
  },
};

const aliases = {
  tn: "tamil nadu",
  tamilnadu: "tamil nadu",
  ap: "andhra pradesh",
  andhra: "andhra pradesh",
  mp: "madhya pradesh",
  mh: "maharashtra",
  up: "uttar pradesh",
  uk: "uttarakhand",
  jk: "jammu & kashmir",
  wb: "west bengal",
  raj: "rajasthan",
};

const lookup = {};
Object.keys(statePositions).forEach((k) => (lookup[k] = k));
Object.keys(aliases).forEach((a) => (lookup[a] = aliases[a]));

const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const dropdown = document.getElementById("stateDropdown");
const mapWrap = document.getElementById("mapWrap");

const placed = new Set();

Object.keys(statePositions)
  .sort()
  .forEach((st) => {
    const opt = document.createElement("option");
    opt.value = st;
    opt.textContent = st.replace(/\b\w/g, (c) => c.toUpperCase());
    dropdown.appendChild(opt);
  });

dropdown.onchange = () => {
  if (dropdown.value) search(dropdown.value);
};
function normalize(s) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function placeFlag(state) {
  const [xp, yp] = statePositions[state];

  const marker = document.createElement("div");
  marker.className = "marker";
  marker.style.left = xp + "%";
  marker.style.top = yp + "%";

  const info = stateInfo[state];

  marker.innerHTML = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <rect x="2" y="2" width="2" height="200" fill="#333"/>
      <path d="M4 5c2-1 5-1 7 0 2 1 5 1 7 0v10c-2 1-5 1-7 0-2-1-5-1-7 0V5z" fill="#d10000"/>
    </svg>

    <div class="tooltip">
      <b>${state.replace(/\b\w/g, (c) => c.toUpperCase())}</b><br>
      Capital: ${info.capital}<br>
      
    </div>
  `;

  mapWrap.appendChild(marker);
}

function flash(state) {
  document.querySelectorAll(".marker").forEach((m) => {
    if (m.querySelector(".tooltip").innerHTML.toLowerCase().includes(state)) {
      m.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.3)" },
          { transform: "scale(1)" },
        ],
        { duration: 400 }
      );
    }
  });
}

function search(arg) {
  const raw = arg || input.value;
  const name = normalize(raw);
  if (!name) return alert("Enter a state!");

  let st = lookup[name];
  if (!st) {
    for (const k in lookup) {
      if (k.includes(name)) st = lookup[k];
    }
  }

  if (!st) return alert("Not found: " + raw);

  if (placed.has(st)) return flash(st);

  placeFlag(st);
  input.value = "";
}
function relode(){
  window.location.reload();
}