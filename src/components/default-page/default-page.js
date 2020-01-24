import services from '../../services.js';
import itemHBS from './item.hbs';
import preloader from './../preloader/js/preloader';
function popularCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML('beforeend', categoryLayout);
}
function compCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML('beforeend', categoryLayout);
}
function worksCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML('beforeend', categoryLayout);
}
function tradeCategory(categoryArr, domElement) {
  const categoryLayout = itemHBS(categoryArr);
  domElement.insertAdjacentHTML('beforeend', categoryLayout);
}
const defaultInfo = {
  popularInfo: null,
  computerInfo: null,
  workInfo: null,
  tradeInfo: null,
  defaultBtnClear: document.querySelector('.btn-refresh'),
  defaultLogoLoader: document.querySelectorAll('.logo')
};

const itemPopular = services.getAdsLimit(4, 1).then(res => {
  defaultInfo.popularInfo = res.data.ads.docs;
  popularCategory(defaultInfo.popularInfo, services.ref.popularItem);
});
const itemComputer = services.getAdsByCategory(4, 4, 1).then(res => {
  defaultInfo.computerInfo = res.data.ads.docs;
  compCategory(res.data.ads.docs, services.ref.computerCategory);
});
const itemWorks = services.getAdsByCategory(3, 4, 1).then(res => {
  defaultInfo.workInfo = res.data.ads.docs;
  worksCategory(res.data.ads.docs, services.ref.pastimeCategory);
});
const itemTrade = services.getAdsByCategory(8, 4, 1).then(res => {
  defaultInfo.tradeInfo = res.data.ads.docs;
  tradeCategory(res.data.ads.docs, services.ref.exchangeCategory);
});
const defaultInfoBord = document.querySelector('.category-favorite_list');

document
  .getElementById('btn_refresh')
  .addEventListener('click', loadDefaultPage);
// document.getElementById('btn-logo').addEventListener('click', loadDefaultPage);

function loadDefaultPage(e) {
  defaultInfoBord.style.display = 'block';
}

document
  .querySelector('.button-popularAll')
  .addEventListener('click', handlClickPopupal2);
function allCategoryViewCreate(element) {
  const categoryLayout = itemHBS(element);
  services.ref.allCategoryView.insertAdjacentHTML('beforeend', categoryLayout);
}
//create More popular list
async function handlClickPopupal(e) {
  let favoritCategory = [];
  let page = 1;
  const limit = 8;

  //Creating Load More Button
  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.setAttribute('class', 'default-page__load-more-btn');
  loadMoreBtn.innerHTML = 'Load More';
  const pageList = document.getElementById('search_list');
  pageList.after(loadMoreBtn);

  preloader.show();
  await services.getAdsLimit(limit, page).then(res => {
    favoritCategory = res.data.ads.docs;

    loadMoreBtn.addEventListener('click', showMoreAds);
    allCategoryViewCreate(favoritCategory);
  });
  services.ref.mainTable.style.display = 'none';
  preloader.hide();

  async function showMoreAds() {
    page++;
    preloader.show();
    await services.getAdsLimit(limit, page).then(res => {
      favoritCategory = res.data.ads.docs;
      
      if (favoritCategory.length === 0) {
        loadMoreBtn.remove();
      } else {
        allCategoryViewCreate(favoritCategory);
      }
      
    });
    //console.log(favoritCategory);
      
    services.ref.mainTable.style.display = 'none';
    preloader.hide();
  }
}
// close popular fun

//Add More for all categories
async function handlClickPopupal2(e) {
  let itemsFromCategory = [];
  let page = 1;
  const limit = 8;
  const category = 1;

  //Creating Load More Button
  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.setAttribute('class', 'default-page__load-more-btn');
  loadMoreBtn.innerHTML = 'Load More';
  const pageList = document.getElementById('search_list');
  pageList.after(loadMoreBtn);

  preloader.show();

  await services.getAdsByCategory(category, limit, page).then(res => {
    itemsFromCategory = res.data.ads.docs;

    loadMoreBtn.addEventListener('click', showMoreAds2);
    allCategoryViewCreate(itemsFromCategory);
  });

  services.ref.mainTable.style.display = 'none';
  preloader.hide();

  //Show More Ads
  async function showMoreAds2() {
    page++;
    preloader.show();
    await services.getAdsByCategory(category, limit, page).then(res => {
      itemsFromCategory = res.data.ads.docs;
      
      if (itemsFromCategory.length === 0) {
        loadMoreBtn.remove();
      } else {
        allCategoryViewCreate(itemsFromCategory);
      }
      
    });
    
      
    services.ref.mainTable.style.display = 'none';
    preloader.hide();
  }

}




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