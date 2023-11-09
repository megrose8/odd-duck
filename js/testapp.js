// function renderChart() {

//   const productNames = [];
//   const productLikes = [];
//   const productViews = [];

//   for (let i = 0; i < allProducts.length; i++) {
//     const currentProduct = allProducts[i];
//     const productName = currentProduct.name;
//     const productLikeCount = currentProduct.clicks;
//     const productViewCount = currentProduct.views;

// productNames.push(productName);
// productClicks.push(productClickCount)
// productViews.push(productViewCount);
//   }
// const data = {
//   labels: productNames,
//   datasets: [{
//     label: 'Clicks',
//     data: productClicks,
//     backgroundColor: [
//       'rgba(255, 99, 132, 0.2)'
//     ],
//     borderColor: [
//       'rgb(255, 99, 132)'
//     ],
//     borderWidth: 1
//   },
//   {
//     label: 'Views',
//     data: productViews,
//     backgroundColor: [
//       'rgba(255, 159, 64, 0.2)'
//     ],
//     borderColor: [
//       'rgb(255, 159, 64)'
//     ],
//     borderWidth: 1
//   }]
// };

// const config = {
//   type: 'bar',
//   data: data,
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   },
// };

// let canvasChart = document.getElementById('myChart');
// const myChart = new Chart(canvasChart, config);
// }