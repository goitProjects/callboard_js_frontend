import services from "../../services";
import itemHBS from "./item.hbs";

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
function tradeCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
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
});
const itemComputer = services.getAdsByCategory(4).then(res => {
  compCategory(res.data.ads.docs, services.ref.computerCategory);
});

const itemWorks = services.getAdsByCategory(3).then(res => {
  worksCategory(res.data.ads.docs, services.ref.pastimeCategory);
});
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
>>>>>>> 6bc09222e93c3c69656f6eaf56b9c6b111bd9b07


