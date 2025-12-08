function adddata() {
  const Site = document.getElementById("siteName").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const DataPacket = {
    website: Site,
    username: username,
    username: password,
  };

  console.log(DataPacket);

  // if(localStorage.getItem("PasswordManager")){
  //     const data = JSON.parse(localStorage.getItem("PasswordManager"));
  // }

  const data = JSON.parse(localStorage.getItem("PasswordManager")) || [];

  data.push(DataPacket);

  localStorage.setItem("PasswordManager", JSON.stringify(DataPacket));

  document.getElementById("siteName").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function downloadfile() {
  const data = JSON.parse(localStorage.getItem("PasswordManager")) || [];

  if (data.length <= 0) {
    alert("No Data Found");
    return;
  }

  const headers = Object.keys(data[0]).join(",") + "\n";

  const rows = data.map((item) => Object.values(item).join(",")).join("\n");

    const CSVContent = headers + rows;

    const blob = new Blob([CSVContent], {type : "text/csv"});

    const anchorTag = document.createElement("a");

    anchorTag.href = URL.createObjectURL(blob);
    anchorTag.download = "data.csv";
    anchorTag.click();

    localStorage.removeItem("PasswordManager");
}
