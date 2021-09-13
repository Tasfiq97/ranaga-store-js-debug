const loadProducts = () => {
  const url=`https://fakestoreapi.com/products`
  fetch(url)
  .then(res=>res.json())
  .then(data=>showProducts(data))
  
};
loadProducts();

// show all product in UI 

const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="mt-3">${product.title}</h3>
      <p>Category: <span class="fw-bold">${product.category}</span></p>
      <p>Product ratings:<span class="fw-bold text-danger"> ${product.rating.rate}</span>
      </p>
      <p > Rated by <span class="fw-bold text-danger"> ${product.rating.count} </span> people</p>
      <h5>Price: $ ${product.price}</h5>
      <div class= "mt-1 d-flex justify-content-around">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class=" btn-color">add to cart</button>
      <button onclick="detailBtn('${product.id}')" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal2">
  Details
</button>
      </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// count and adding carts

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// input value  function 

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function

const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = parseFloat (convertedOldPrice) + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function

const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax

const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function

const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


// detail button function 

const detailBtn=(detailId)=>{
  const ulr2=`https://fakestoreapi.com/products/${detailId}`
  fetch(ulr2)
  .then(response=>response.json())
  .then(data=>showDetails(data));
}

// detail show in card function 

const showDetails=(detailInfo)=>{
  console.log(detailInfo);
  document.getElementById("show-detail").textContent="";
const div=document.createElement("div");

div.innerHTML=`
<div class="card" style="width: 26rem;">
  <img src="${detailInfo.image}" class="card-img-top img-fluid w-50" alt="...">
  <div class="card-body">
    <h5 class="card-title">${detailInfo.title}</h5>
    <p class="card-title">Category: ${detailInfo.category}</p>
    <p class="card-text">${detailInfo.description}</p>
   
  </div>
</div>

`
document.getElementById("show-detail").appendChild(div);

}

// show total in modal function

const showTotalInModal=()=>{
 const modalTotal= document.getElementById("total").innerText;
 console.log(modalTotal)
 if(modalTotal=="0"){
  document.getElementById("total-cost").innerHTML=`
  please add some products to the cart
  `;
 }
 else{
 document.getElementById("total-cost").innerHTML=`
 your total cost is :$ ${modalTotal}
 <p class="text-center">Thank you for purchasing!!</p>
 `;
 }
}



