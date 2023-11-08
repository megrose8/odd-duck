'use strict';

let workingProducts = [];
const productNames= ['bag','boots', 'banana', 'bathroom', 'breakfast', 'bubblegum','chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
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


function createProducts(){
    for (let i = 0; i < productNames.length; i++){
    const productName = productNames[i];
    const productInstance = new Products(productName, `./img/${productName}.jpg`);
// console.log(productInstance)
}
}
createProducts()
console.log(allProducts)

const usedProducts= [];

function renderProducts() {
    console.log('render products', allProducts)
    if(clickCtr == maxClicks){
        endVoting();
        return;
    }
    if(workingProducts.length<=3){ 
        workingProducts = allProducts.slice();
        console.log(workingProducts);
        shuffleArray(workingProducts);
        // avoidRepeats(workingProducts);
        // console.log(usedProducts)
        // console.log(workingProducts)
        //add function to remove previously seen items//
    }

    leftProduct = workingProducts.pop();
    usedProducts.push(leftProduct);
    rightProduct = workingProducts.pop();
    usedProducts.push(rightProduct)
    centerProduct = workingProducts.pop();
    usedProducts.push(centerProduct)


    leftProduct.views += 1;
    rightProduct.views += 1;
    centerProduct.views += 1;

    leftProductImage.setAttribute('src', leftProduct.src);
    rightProductImage.setAttribute('src', rightProduct.src);
    centerProductImage.setAttribute('src', centerProduct.src);

}

//array creation, adding on insurance that random photos do not repeat: 

let shuffledArray = [];

function shuffleArray(array) {
    for (let i = array.length -1; i > 0; i-- ){ 
        const j = Math.floor(Math.random()* (i + 1));
        [array [i], array [j]] = [array[j], array[i]];
    }
}
function avoidRepeats(array){
    // if (array.length ===0){
    //     array = allProducts;
        // shuffleArray(array);
    // }
    const currentProduct = array.pop();

    if (usedProducts.includes(currentProduct)){
        array.unshift(currentProduct);
        return array;
    } else {
        usedProducts.push(currentProduct);
        console.log('hello')
        return currentProduct
    }
    }
    if (workingProducts.length <= 5){
       usedProducts.pop();
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
    console.log(centerProductImage)
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
    renderChart();
}

function renderChart(){
let productNames = [];
let productViews = [];
let productClicks = [];

for (let i =0; i< allProducts.length; i++){
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
}
// return{
//     productNames,
//     productViews,
//     productClicks,
// };

const data = {
    labels: productNames ,
    datasets: [
        {
      label: 'Product Name',
      data: productNames,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1,
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
      borderWidth: 1,
    },
    {
    label: 'Clicks',
    data: productClicks,
    backgroundColor: [
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgb(255, 159, 64)'
    ],
    borderWidth: 1,
        },
    ]
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
  const myChart = new Chart(canvasChart, config);
}

renderProducts();
