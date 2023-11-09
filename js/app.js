'use strict';
const productNames = ['bag', 'boots', 'banana', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
const leftProductImage = document.querySelector('section img:first-child');
const centerProductImage = document.querySelector('section img:nth-child(2)');
const rightProductImage = document.querySelector('section img:nth-child(3');
const viewResults = document.getElementById('viewResults');
const ulElem = document.querySelector('ul');
const productStorageKey = 'product-storage-key';

let workingProducts = [];
let clickCtr = 0;
const maxClicks = 25;
let leftProduct = null;
let centerProduct = null;
let rightProduct = null;
const allProducts = [];

function Product(name, src, views = 0, clicks = 0) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
  allProducts.push(this);
}
function Selector(arr, limit = 3) {
  this.allItems = arr;
  this.workingItems = [];
  this.previousRound = [];
  this.limit = limit;
}

Selector.prototype.shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

Selector.prototype.select = function () {
  let nextRound = [];

  if (this.workingItems.length >= this.limit) {

    while (nextRound.length < this.limit) {
      nextRound.push(this.workingItems.pop());
    }
  } else {
    nextRound = this.workingItems.slice();

    const rejects = nextRound.concat(this.previousRound);

    const goodItems = [];
    for (let value of this.allItems) {
      if (!rejects.includes(value)) {
        goodItems.push(value);
      }
    }
    this.shuffle(goodItems);

    while (nextRound.length < this.limit) {
      nextRound.push(goodItems.pop());
    }
    this.workingItems = goodItems.concat(rejects);
  }
  this.previousRound = nextRound;
  return nextRound;
}


function createProducts() {
  for (let i = 0; i < productNames.length; i++) {
    const productName = productNames[i];
    const productInstance = new Product(productName, `./img/${productName}.jpg`);
  }
}
createProducts();

let selector = new Selector(allProducts)

function renderProducts() {
  if (clickCtr === maxClicks) {
    endVoting();
    return;
  }
  let products = selector.select()
  leftProduct = products[0]
  centerProduct = products[1]
  rightProduct = products[2]


  leftProduct.views += 1;
  rightProduct.views += 1;
  centerProduct.views += 1;

  leftProductImage.setAttribute('src', leftProduct.src);
  leftProductImage.setAttribute('alt', leftProduct.name)
  rightProductImage.setAttribute('src', rightProduct.src);
  rightProductImage.setAttribute('alt', rightProduct.name)
  centerProductImage.setAttribute('src', centerProduct.src);
  centerProductImage.setAttribute('alt', centerProduct.name)
}

function handleProductClick(event) {
  let productName = event.target.alt
  console.log(event.target.src)
  for (let i = 0; i < allProducts.length; i++) {
    if (productName === allProducts[i].name) {
      allProducts[i].clicks++;
      console.log(allProducts)
    }
  }
  clickCtr += 1;
  renderProducts();
}
// creating storage//

function loadProducts (){
  const storedProductsText = localStorage.getItem(productStorageKey);

  if (storedProductsText){
    parseStoredProducts(storedProductsText);
  } else {
    createProducts();
  }
  selector = new Selector (allProducts, 3);
  }

function parseStoredProducts(storedProductsText){
  const storedProductsObjects = JSON.parse(storedProductsText);

  allProducts.length = 0;
for (let productObject of storedProductsObjects ){
  const currentProduct = new Product(productObject.name, productObject.src, productObject.views, productObject.clicks );
  allProducts.push(currentProduct);
}
}
////

function endVoting() {
  leftProductImage.removeEventListener('click', handleProductClick);
  centerProductImage.removeEventListener('click', handleProductClick);
  rightProductImage.removeEventListener('click', handleProductClick);

  viewResults.hidden = false;
  viewResults.addEventListener('click', renderResults);

  saveProducts();
}
function saveProducts(){
  localStorage.setItem(productStorageKey, JSON.stringify(allProducts));
}

function renderResults() {
  ulElem.innerHTML = '';
  for (const product of allProducts) {
    const result = `${product.name} had ${product.views} views and was clicked ${product.clicks} times.`;
    const liElem = document.createElement('li');
    liElem.textContent = result;
    ulElem.appendChild(liElem);
  }
  renderChart()
}
renderProducts();


leftProductImage.addEventListener('click', handleProductClick);
rightProductImage.addEventListener('click', handleProductClick);
centerProductImage.addEventListener('click', handleProductClick);

saveProducts();


const productClicks = [];
const productNameChart = [];
const productViewsChart = [];

let myChart;

function renderChart() {
  const productNames = [];
  const productClicks = [];
  const productViews = [];

  productClicks.length = 0
  for (let i = 0; i < allProducts.length; i++) {
    const currentProduct = allProducts[i];
    const productName = currentProduct.name;
    const productClickCount = currentProduct.clicks;
    const productViewCount = currentProduct.views;

    productNames.push(productName);
    productClicks.push(productClickCount);
    productViews.push(productViewCount);
  }
  const data = {
    labels: productNames,
    datasets: [{
      label: 'Clicks',
      data: productClicks,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: productViews,
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  let canvasChart = document.getElementById('myChart');
  myChart = new Chart(canvasChart, config);
}