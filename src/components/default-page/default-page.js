import services from "../../services";
import itemHBS from "./item.hbs";
import preloader from "./../preloader/js/preloader";
import OpenAndSearcItemHbs from "./openItemcategory.hbs";
import "./return-to-top.js";
import "./return-toTop.css";
import  randomItemHBS from "./random-item.hbs";

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
function tradeCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML("beforeend", categoryLayout);
}
const defaultInfo = {
  popularInfo: null,
  computerInfo: null,
  workInfo: null,
  tradeInfo: null,
  defaultBtnClear: document.querySelector(".btn-refresh"),
};

//          CREATE DEFAULT PAGE
const defaultInfoBord = document.querySelector(".category-favorite_list");

services.ref.body.addEventListener("click", loadDefaultPage);


const itemPopular = services.getAdsLimit(10,1).then(res => {
  defaultInfo.popularInfo=res.data.ads.docs;

  popularCategory(defaultInfo.popularInfo, services.ref.popularItem);
});
const itemComputer = services.getAdsByCategory(4,10).then(res => {
  defaultInfo.computerInfo=res.data.ads.docs;
  compCategory(res.data.ads.docs, services.ref.computerCategory);
});
const itemPasTime = services.getAdsByCategory(6,10).then(res => {
  defaultInfo.workInfo=res.data.ads.docs;
  worksCategory(res.data.ads.docs, services.ref.pastimeCategory);
});
const itemTrade = services.getAdsByCategory(8,10).then(res => {
  defaultInfo.tradeInfo=res.data.ads.docs;
  tradeCategory(res.data.ads.docs, services.ref.exchangeCategory);
});
const ItemTransport = services.getAdsByCategory(2,10).then(res => {
  defaultInfo.tradeInfo=res.data.ads.docs;
  tradeCategory(res.data.ads.docs, services.ref.transportCategory);
});
const Itembisness = services.getAdsByCategory(5,10).then(res => {
  defaultInfo.tradeInfo=res.data.ads.docs;
  tradeCategory(res.data.ads.docs, services.ref.businessCategory);
});
const ItemWOrk = services.getAdsByCategory(3,10).then(res => {
  defaultInfo.tradeInfo=res.data.ads.docs;
  tradeCategory(res.data.ads.docs, services.ref.workCategory);
});
const Itemrealestate = services.getAdsByCategory(1,10).then(res => {
  defaultInfo.tradeInfo=res.data.ads.docs;
  tradeCategory(res.data.ads.docs, services.ref.realEstateCategory);
});
const ItemFree = services.getAdsByCategory(7,10).then(res => {
  defaultInfo.tradeInfo=res.data.ads.docs;
  tradeCategory(res.data.ads.docs, services.ref.freeCategory);
});


////////////// CLOSE CREATE PAGE

function loadDefaultPage(e) {
  if (e.target.id == "logo-btn" ||e.target.id == "btn_refresh-desktop"|| e.target.id=="btn_refresh"|| e.target.id=="searchBackToMain") {
    defaultInfoBord.style.display = "block";
    services.ref.allCategoryView.innerHTML = "";
    document.querySelector(".products-button").style.display = "none";
    document.querySelector("#menu__toggle").checked = false;
    document.querySelector(".search-bar__input").value="";
  }
}

document.querySelector(".button-popularAll").addEventListener("click", handlClickPopupal);
document.addEventListener("click", handlClickPopupal2);

function allCategoryViewCreate(element){
  const categoryLayout = OpenAndSearcItemHbs(element);
  services.ref.allCategoryView.insertAdjacentHTML("beforeend", categoryLayout);
}
//create More popular list
async function handlClickPopupal(e) {
  e.preventDefault();
  if (e.target.className === "button-popularAll") {
     services.ref.allCategoryView.innerHTML = "";
    let favoritCategory = [];
    let page = 1;
    const limit = 8;
    //Creating Load More Button
    let loadMoreBtn = document.querySelector(".products-button__load");
    document.querySelector(".products-button").style.display = "block";
    preloader.show();
    await services.getAdsLimit(limit, page).then(res => {
      favoritCategory = res.data.ads.docs;
      loadMoreBtn.addEventListener("click", showMoreAds);
      allCategoryViewCreate(favoritCategory);
    });
    services.ref.mainTable.style.display = "none";
    preloader.hide();
    async function showMoreAds() {
      e.preventDefault();
      page++;
      preloader.show();
      await services.getAdsLimit(limit, page).then(res => {
         favoritCategory = res.data.ads.docs;
          if (favoritCategory.length<1) {
          document.querySelector(".products-button").style.display = "none";
        } else {
          allCategoryViewCreate(favoritCategory);
        }
      });
      services.ref.mainTable.style.display = "none";
      preloader.hide();
    }
  }
}
// close popular fun

//Add More for all categories
async function handlClickPopupal2(e) {
  e.preventDefault();
  if (
    e.target.classList == "button-category-view"||
    e.target.classList == "category__list-item-label") {
 services.ref.allCategoryView.innerHTML = "";
  let itemsFromCategory = [];
    let page = 1;
    const limit = 8;
    const category = e.target.id;

    //Creating Load More Button
    const loadMoreBtn = document.querySelector(".products-button__load");
    document.querySelector(".products-button").style.display = "block";

    preloader.show();

    await services.getAdsByCategory(category, limit, page).then(res => {
      itemsFromCategory = res.data.ads.docs;
      loadMoreBtn.addEventListener("click", showMoreAds2);
      allCategoryViewCreate(itemsFromCategory);
    });
    services.ref.mainTable.style.display = "none";
    preloader.hide();
    //Show More Ads
    async function showMoreAds2(e) {
      e.preventDefault();
      page++;
      preloader.show();
      await services.getAdsByCategory(category, limit, page).then(res => {
        itemsFromCategory = res.data.ads.docs;
        if (itemsFromCategory.length <1) {
          document.querySelector(".products-button").style.display = "none";
        } else {
          allCategoryViewCreate(itemsFromCategory);
        }
      });
      services.ref.mainTable.style.display = "none";
      preloader.hide();
    }
  }
}
