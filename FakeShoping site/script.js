// async function getdata() {
//   const response = await fetch("https://fakestoreapi.com/products");
//   const alldata = await response.json();


//   const productsDiv = document.getElementById("products");
//   productsDiv.innerHTML = "";

//   alldata.forEach((ele) => {
//     const card = document.createElement("div");
//     card.className = "card";

//     card.innerHTML = `
//       <img src="${ele.image}" alt="">
//       <div class="title">${ele.title}</div>
//       <div class="price">₹ ${ele.price * 85}</div>
       
//       <div class="discription">${ele.description}</div>

//       <div class="btn-group">
//         <button class="btn btn-primary">Add to Cart</button>
//         <a href="Checkout.html" class="btn btn-secondary">Buy Now</a>
//       </div>
//     `;

//     productsDiv.appendChild(card);
//   });
// }

// getdata();