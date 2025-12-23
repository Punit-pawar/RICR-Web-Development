async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");

    const data = await res.json();

    const productList = document.getElementById("productRow");

    data.forEach((element) => {
      const d = document.createElement("div");
      d.classList.add("col-3", "col-9" , "p-3");

      d.innerHTML = `
      <div class="row" id="productRow">

          <div class="col-3 border">
            <img src=${element.image} alt=${element.tital} class="w-100 h-100 object-fit-contain">
          </div>

          <div class="col-9 border colls">
            <div class="fw-bold fs-4">${element.title}</div> 
            <div class="fs-6">${element.description.slice(0, 80)}...</div>
            <div class="fw-bold fs-3">₹ ${element.price * 100}</div>  
            <div class="fw-semibold fs-5">₹ ${element.category}</div>
            <div>Rating: ${element.title.length > 50
            ? element.title.slice(0, 45) + "..."
            : element.title
            }</div>
          </div>
          

        </div>`

      productList.appendChild(d);
    });
  } catch (error) {
    console.log(error.message);
  }
}

getProducts();