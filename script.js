const left = document.getElementById("left");
const right = document.getElementById("right");

// creating h1 empty
const h1 = document.createElement("h1");
h1.innerText = "Cart is Empty";
right.appendChild(h1);

let totalPrice = 0;

//  cart - 1
const Products = [
{ id: 1, name: "Product-1", price: 100, quantity: 0 },
{ id: 2, name: "Product-2", price: 200, quantity: 0 },
{ id: 3, name: "Product-3", price: 300, quantity: 0 },
];

// cart - 2
const addToCartProducts = [];

function showProducts(id, action) {
right.innerHTML = "";
totalPrice = 0;

const isPresent = addToCartProducts.some((val) => val.id == id);
if (isPresent) {
let demo = addToCartProducts.find((val) => val.id === id);
if (action === "plus") demo.quantity += 1;
else {
    demo.quantity -= 1;
    if (demo.quantity === 0) {
    for (let i = 0; i < addToCartProducts.length; i++) {
        if (demo.id === addToCartProducts[i].id) {
        addToCartProducts.splice(i, 1);
        break;
        }
    }
    }
}
} else {
let demo = Products.find((val) => val.id == id);
addToCartProducts.push({ ...demo });
}

addToCartProducts.map((val) => {
const div = document.createElement("div");
const h1 = document.createElement("h1");
h1.innerText = val.name;

const quantity = document.createElement("p");
quantity.innerText = `${val.quantity} x ${val.price}`;

div.appendChild(h1);
div.appendChild(quantity);
div.classList.add("right-div");

right.appendChild(div);
totalPrice += val.price * val.quantity;
});

if (addToCartProducts.length == 0) {
const h1 = document.createElement("h1");
h1.innerText = "Cart is Empty";
right.appendChild(h1);
}

const total = document.createElement("h1");
total.innerText = `Total Price : ${totalPrice}`;
right.appendChild(total);
}

function displayProduct() {
left.innerHTML = "";
Products.map((val) => {
const div = document.createElement("div");
const h1 = document.createElement("h1");
h1.innerText = val.name;

const price = document.createElement("p");
price.innerText = val.price;

const btnMin = document.createElement("button");
btnMin.classList.add("min");
btnMin.innerText = "-";

btnMin.addEventListener("click", (e) => {
    if (val.quantity === 0) return;
    val.quantity -= 1;
    displayProduct();
    showProducts(val.id, "minus");
});

const quantity = document.createElement("p");
quantity.innerText = val.quantity;

const btnPlus = document.createElement("button");
btnPlus.innerText = "+";
btnPlus.classList.add("plus");

btnPlus.addEventListener("click", (e) => {
    val.quantity += 1;
    displayProduct();
    showProducts(val.id, "plus");
});

div.appendChild(h1);
div.appendChild(price);
div.appendChild(btnMin);
div.appendChild(quantity);
div.appendChild(btnPlus);
div.classList.add("flex");
div.classList.add("left-div");

left.appendChild(div);
});
}

displayProduct();