import services from "../../services.js";
import itemHBS from "./item.hbs";
import preloader from "./../preloader/js/preloader";






function popularCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
function compCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
function worksCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
<<<<<<< HEAD
=======
<<<<<<< HEAD
function transportCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
function BisCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
function FreeCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
=======
>>>>>>> 6bc09222e93c3c69656f6eaf56b9c6b111bd9b07
>>>>>>> userAccountFix
function tradeCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
<<<<<<< HEAD

const defaultInfo={
popularInfo: null,
computerInfo:null,
workInfo:null,
tradeInfo:null,
defaultBtnClear: document.querySelector('.btn-refresh'),
defaultLogoLoader: document.querySelectorAll(".logo")
};


const itemPopular = services.getAdsLimit(4,1).then(res => {
  defaultInfo.popularInfo=res.data.ads.docs;
  popularCategory(defaultInfo.popularInfo, services.ref.popularItem);
=======
<<<<<<< HEAD
function realEstateCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
function pastimeCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}

const itemPopular = services.getAllAds().then(res => {
  console.log(res);
  console.log(res.categories[1].category);
  popularCategory(res.docs, services.ref.popularItem);
=======

const itemPopular = services.getAdsLimit(4,1).then(res => {
  console.log(res)
  popularCategory(res.data.ads.docs, services.ref.popularItem);
>>>>>>> 6bc09222e93c3c69656f6eaf56b9c6b111bd9b07
>>>>>>> userAccountFix
});
const itemComputer = services.getAdsByCategory(4,4).then(res => {
  defaultInfo.computerInfo=res.data.ads.docs;
  compCategory(res.data.ads.docs, services.ref.computerCategory);
});
const itemWorks = services.getAdsByCategory(3,4).then(res => {
  defaultInfo.workInfo=res.data.ads.docs;
  worksCategory(res.data.ads.docs, services.ref.pastimeCategory);
});
<<<<<<< HEAD
const itemTrade = services.getAdsByCategory(8,4).then(res => {
  defaultInfo.tradeInfo=res.data.ads.docs;
  tradeCategory(res.data.ads.docs, services.ref.exchangeCategory);
});

const defaultInfoBord =  document.querySelector('.category-favorite_list');


document.getElementById('btn_refresh').addEventListener("click",loadDefaultPage);
document.getElementById("logo-btn").addEventListener("click", loadDefaultPage);

function loadDefaultPage(e){
  defaultInfoBord.style.display = "block";
}


document.querySelector(".button-popularAll").addEventListener('click',handlClickPopupal);
function allCategoryViewCreate(element) {
  const categoryLayout = itemHBS(element);
  services.ref.allCategoryView.insertAdjacentHTML("beforeend", categoryLayout);
}


async function handlClickPopupal (e){
  preloader.show();
await services.getAdsLimit(1,1).then(res => {
 const  favoritCategory = res.data.ads.docs;
 allCategoryViewCreate(favoritCategory)})
    services.ref.mainTable.style.display= "none"
    preloader.hide();
}

=======
<<<<<<< HEAD
const itemTransport = services.getAdsByCategory(2).then(res => {
  transportCategory(res.data.ads.docs, services.ref.transportCategory);
});
const itembisness = services.getAdsByCategory(5).then(res => {
  BisCategory(res.data.ads.docs, services.ref.businessCategory);
});
const itemFree = services.getAdsByCategory(7).then(res => {
  FreeCategory(res.data.ads.docs, services.ref.freeCategory);
});
const itemrealestate = services.getAdsByCategory(1).then(res => {
  realEstateCategory(res.data.ads.docs, services.ref.realEstateCategory);
});
const itemTrade = services.getAdsByCategory(8).then(res => {
  tradeCategory(res.data.ads.docs, services.ref.exchangeCategory);
});
const itemPasTime = services.getAdsByCategory(6).then(res => {
  pastimeCategory(res.data.ads.docs, services.ref.pastimeCategory);
});
=======
const itemTrade = services.getAdsByCategory(8).then(res => {
  tradeCategory(res.data.ads.docs, services.ref.exchangeCategory);
});






>>>>>>> userAccountFix

// function transportCategory(categoryArr, domElement) {
//   const categoryLayout = itemHBS(categoryArr);
//   domElement.insertAdjacentHTML("beforeend", categoryLayout);
// }
// function BisCategory(categoryArr, domElement) {
//   const categoryLayout = itemHBS(categoryArr);
//   domElement.insertAdjacentHTML("beforeend", categoryLayout);
// }
// function FreeCategory(categoryArr, domElement) {
//   const categoryLayout = itemHBS(categoryArr);
//   domElement.insertAdjacentHTML("beforeend", categoryLayout);
// }

// function realEstateCategory(categoryArr, domElement) {
//   const categoryLayout = itemHBS(categoryArr);
//   domElement.insertAdjacentHTML("beforeend", categoryLayout);
// }
// function pastimeCategory(categoryArr, domElement) {
//   const categoryLayout = itemHBS(categoryArr);
//   domElement.insertAdjacentHTML("beforeend", categoryLayout);
// }
// const itemTransport = services.getAdsByCategory(2).then(res => {
//   transportCategory(res.data.ads.docs, services.ref.transportCategory);
// });
// const itembisness = services.getAdsByCategory(5).then(res => {
//   BisCategory(res.data.ads.docs, services.ref.businessCategory);
// });
// const itemFree = services.getAdsByCategory(7).then(res => {
//   FreeCategory(res.data.ads.docs, services.ref.freeCategory);
// });
// const itemrealestate = services.getAdsByCategory(1).then(res => {
//   realEstateCategory(res.data.ads.docs, services.ref.realEstateCategory);
// });

// const itemPasTime = services.getAdsByCategory(6).then(res => {
//   pastimeCategory(res.data.ads.docs, services.ref.pastimeCategory);
// });
<<<<<<< HEAD
=======
>>>>>>> 6bc09222e93c3c69656f6eaf56b9c6b111bd9b07
>>>>>>> userAccountFix


