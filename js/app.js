'use strict';

const productNames = ['bag', 'boots', 'banana', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

const leftProductImage = document.querySelector('section img:first-child');
const centerProductImage = document.querySelector('section img:nth-child(2)');
const rightProductImage = document.querySelector('section img:nth-child(3');
const viewResults = document.getElementById('viewResults');
const ulElem = document.querySelector('ul');

let workingProducts = [];
let clickCtr = 0;
const maxClicks = 25;
let leftProduct = null;
let centerProduct = null;
let rightProduct = null;
const allProducts = [];

class Product {
  constructor(name, src, views = 0, clicks = 0) {
    this.name = name;
    this.src = src;
    this.views = views;
    this.clicks = clicks;
    allProducts.push(this);
  }
}

function createProducts() {
  for (let i = 0; i < productNames.length; i++) {
    const productName = productNames[i];
    const productInstance = new Product(productName, `./img/${productName}.jpg`);
  }
}
createProducts();

function renderProducts() {
  if (clickCtr === maxClicks) {
    endVoting();
    return;
  }
  if (workingProducts.length <= 3) {
    workingProducts = [...allProducts];
    shuffleArray(workingProducts);
  }

  leftProduct = workingProducts.pop();
  rightProduct = workingProducts.pop();
  centerProduct = workingProducts.pop();

  leftProduct.views += 1;
  rightProduct.views += 1;
  centerProduct.views += 1;

  leftProductImage.setAttribute('src', leftProduct.src);
  rightProductImage.setAttribute('src', rightProduct.src);
  centerProductImage.setAttribute('src', centerProduct.src);
}

function handleProductClick(product) {
  product.clicks += 1;
  clickCtr += 1;
  renderProducts();
}

leftProductImage.addEventListener('click', () => handleProductClick(leftProduct));
rightProductImage.addEventListener('click', () => handleProductClick(rightProduct));
centerProductImage.addEventListener('click', () => handleProductClick(centerProduct));

function endVoting() {
  leftProductImage.removeEventListener('click', handleProductClick);
  centerProductImage.removeEventListener('click', handleProductClick);
  rightProductImage.removeEventListener('click', handleProductClick);

  viewResults.hidden = false;
  viewResults.addEventListener('click', renderResults);
}

function renderResults() {
  ulElem.innerHTML = ''; // Clear previous results
  for (const product of allProducts) {
    const result = `${product.name} had ${product.views} views and was clicked ${product.clicks} times.`;
    const liElem = document.createElement('li');
    liElem.textContent = result;
    ulElem.appendChild(liElem);
  }
  renderChart();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderChart() {
  const productNames = allProducts.map((product) => product.name);
  const productViews = allProducts.map((product) => product.views);
  const productClicks = allProducts.map((product) => product.clicks);

  // Chart rendering logic here
}

renderProducts();
