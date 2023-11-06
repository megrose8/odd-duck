'use strict';

let workingProducts = [];
const allProducts= [];
const leftProductImage = document.querySelector('section img:first-child');
const centerProductImage = document.querySelector('section img:nth-child(2)');
const rightProductImage = document.querySelector('section img:nth-child(3)');
let clickCtr = 0;
const maxClicks = 25;
const viewResults = document.querySelector('button');
let leftProductInstance = null;
let centerProductInstance = null;
let rightProductInstance = null;
const ulElem = document.querySelector('ul');


function Products (name, src, views, clicks) {
    this.name = name;
    this.src = src;
    this.views = 0;
    this.clicks = 0;
}

let bag = new Products ('Bag', './img/bag.jpg');
let banana = new Products ('Banana', './img/banana.jpg');
let bathroom = new Products ('Bathroom', './img/bathroom.jpg');
let boots = new Products ('Boots', './img/boots.jpg');
let breakfast = new Products ('Breakfast', './img/breakfast.jpg');
let bubblegum= new Products ('Bubblegum', './img/bubblegum.jpg');
let chair = new Products ('Chair', './img/chair.jpg');
let cthulhu = new Products ('Cthulhu', './img/cthulhu.jpg');
let dogDuck = new Products ('Dog Duck', './img/dog-duck.jpg');
let dragon = new Products ('Dragon', './img/dragon.jpg');
let pen = new Products ('Pen', './img/pen.jpg');
let petSweep = new Products ('Pet Sweep', './img/pet-sweep.jpg');
let scissors = new Products ('Scissors', './img/scissors.jpg');
let shark = new Products ('Shark', './img/shark.jpg');
let sweep = new Products ('Sweep', './img/sweep.png');
let tauntaun = new Products ('Taun Taun', './img/tauntaun.jpg');
let unicorn = new Products ('Unicorn', './img/unicorn.jpg');
let waterCan = new Products ('Water Can', './img/water-can.jpg');
let wineGlass = new Products ('Wine Glass', './img/wine-glass.jpg');



allProducts.push(bag);
allProducts.push(banana);
allProducts.push(bathroom);
allProducts.push(boots);
allProducts.push(breakfast);
allProducts.push(bubblegum);
allProducts.push(chair);
allProducts.push(cthulhu);
allProducts.push(dogDuck);
allProducts.push(dragon);
allProducts.push(pen);
allProducts.push(petSweep);
allProducts.push(scissors);
allProducts.push(shark);
allProducts.push(sweep);
allProducts.push(tauntaun);
allProducts.push(unicorn);
allProducts.push(waterCan);
allProducts.push(wineGlass);

function renderProducts() {
    if(clickCtr == maxClicks){
        viewResults.addEventListener('click', handleViewResultsClick);

        leftProductImage.removeEventListener('click', handleLeftProductClick);
        centerProductImage.removeEventListener('click', handleCenterProductClick);
        rightProductImage.removeEventListener('click', handleRightProductClick);
    }

    if(workingProducts.length<=1){
        workingProducts = allProducts.slice();
        shuffleArray(workingProducts);
    }

    leftProductInstance = workingProducts.pop();
    leftProductImage.setAttribute('src', leftProductInstance.src);
    
    rightProductInstance = workingProducts.pop();
    rightProductImage.setAttribute('src', rightProductInstance.src);

    centerProductInstance = workingProducts.pop();
    centerProductImage.setAttribute('src', centerProductInstance.src);

    leftProductInstance.views += 1;
    rightProductInstance.views += 1;
    centerProductInstance.views += 1
}

function shuffleArray(array) {
    for (let i = array.length -1; i > 0; i-- ){ 
        const j = Math.floor(Math.random()* (i + 1));
        [array [i], array [j]] = [array[j], array[i]];
    }
}
function handleLeftProductClick() {
    leftProductInstance.clicks += 1;
    clickCtr += 1;
    renderProducts();
}
function handleRightProductClick() {
    rightProductInstance.clicks += 1;
    clickCtr += 1;
    renderProducts();
}
function handleCenterProductClick() {
    centerProductInstance.clicks += 1;
    clickCtr += 1;
    renderProducts();
}
function handleViewResultsClick(){
    renderResults();
}

leftProductImage.addEventListener('click', handleLeftProductClick);
rightProductImage.addEventListener('click', handleRightProductClick);
centerProductImage.addEventListener('click', handleCenterProductClick);

renderProducts();

function renderResults() {
    for (let i =0; i<allProducts.length; i++){
        const currentProduct = allProducts[i];
        const result =`${currentProduct.name} had ${currentProduct.views} views and was clicked ${currentProduct.clicks} times.`;
        const liElem = document.createElement('li');
        ulElem.appendChild(liElem);
        liElem.textContent = result;
    }
}

