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
function tradeCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
function realEstateCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
function pastimeCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}

const itemPopular = services.getAllAds().then(res => {
  popularCategory(res.docs, services.ref.popularItem);
});
const itemComputer = services.getAdsByCategory(4).then(res => {
  compCategory(res.data.ads.docs, services.ref.computerCategory);
});

const itemWorks = services.getAdsByCategory(3).then(res => {
  worksCategory(res.data.ads.docs, services.ref.pastimeCategory);
});
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


