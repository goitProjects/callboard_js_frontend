import "./components/startPage";
import services from "./services";
import itemHBS from "./item.hbs";

const ref={
    btntabletFilter: document.querySelector(".tablet-filter"),
    btnSearch: document.querySelector(".tablet-filter"),
    buttonReg: document.querySelector(".registration-button"),
    buttonLogin: document.querySelector(".registration-enter"),
    imgLogo: document.querySelector(".logo"),
    tabletFilter: document.querySelector(".navigation-form"),
    tabletFilter: document.querySelector(".tablet-filter"),
    btnAddPromo: document.querySelector(".navigation-promo"),
    filterUl: document.querySelector(".navigation-filter__list"),
    popularItem: document.querySelector(".products-collection-popular"),
    computerCategory: document.querySelector(".navigation-promo"),
    pastimeCategory: document.querySelector(".navigation-promo"),
    exchangeCategory: document.querySelector(".navigation-promo"),
    transportCategory: document.querySelector(".navigation-promo"),
    businessCategory: document.querySelector(".navigation-promo"),
};



  
  
  function firstCategory(categoryArr) {
    //   const makeup = menu.map(menu => menuItem(menu)).join('');
  const categoryLayout =itemHBS(categoryArr)
      ref.body.insertAdjacentHTML('beforeend', categoryLayout);
    }


let item = services.getAdsByCategory(2).then(res => {
    console.log(res.data.ads.docs);
    
    firstCategory(res.data.ads.docs);
})

// services.getAdsByCategory(2).then(console.log)
