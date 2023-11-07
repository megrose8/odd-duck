'use strict';

let workingProducts = [];
const productNames= ['bag','boots', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
const leftProductImage = document.querySelector('section img:first-child');
const centerProductImage = document.querySelector('section img:nth-child(2)');
const rightProductImage = document.querySelector('section img:nth-child(3)');
let clickCtr = 0;
const maxClicks = 25;
const viewResults = document.getElementById('viewResults');
let leftProduct = null;
let centerProduct = null;
let rightProduct = null;
const ulElem = document.querySelector('ul');
let leftProductInstance = leftProduct;
let rightProductInstance = rightProduct;
let centerProductInstance = centerProduct;
let allProducts =[]

function Products (name, src) {
    this.name = name;
    this.src = src;
    this.views = 0;
    this.clicks = 0;
    allProducts.push(this);
}

// Products.allProducts =[];
Products.workingProducts = [];

function createProducts(){
    for (let i = 0; i < productNames.length; i++){
    const productName = productNames[i];
    const productInstance = new Products(productName, `./img/${productName}.jpg`);
console.log(productInstance)
//    allProducts.push(productInstance);
}
}
createProducts()
console.log(allProducts)

function renderProducts() {
    if(clickCtr == maxClicks){
        endVoting();
        return;
    }

    if(workingProducts.length<=1){
        workingProducts = allProducts.slice();
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


function shuffleArray(array) {
    for (let i = array.length -1; i > 0; i-- ){ 
        const j = Math.floor(Math.random()* (i + 1));
        [array [i], array [j]] = [array[j], array[i]];
    }
}
function handleLeftProductClick() {
    leftProduct.clicks += 1;
    clickCtr += 1;
    renderProducts();
}
function handleRightProductClick() {
    rightProduct.clicks += 1;
    clickCtr += 1;
    renderProducts();
}
function handleCenterProductClick() {
    centerProduct.clicks += 1;
    clickCtr += 1;
    renderProducts();
}

function handleViewResultsClick(){
    renderResults();
}

leftProductImage.addEventListener('click', handleLeftProductClick);
rightProductImage.addEventListener('click', handleRightProductClick);
centerProductImage.addEventListener('click', handleCenterProductClick);

function endVoting(){
    leftProductImage.removeEventListener('click', handleLeftProductClick);
    centerProductImage.removeEventListener('click', handleCenterProductClick);
    rightProductImage.removeEventListener('click', handleRightProductClick);

   viewResults.hidden = false;
    viewResults.addEventListener('click', handleViewResultsClick);
}
function renderResults() {
    for (let i =0; i<allProducts.length; i++){
        const currentProduct = allProducts[i];
        const result =`${currentProduct.name} had ${currentProduct.views} views and was clicked ${currentProduct.clicks} times.`;
        const liElem = document.createElement('li');
        ulElem.appendChild(liElem);
        liElem.textContent = result;
    }
}

renderProducts();

