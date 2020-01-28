import services from "../../services";
import searchBar from ".";
import SearchHBS from "./search.hbs";
import showPreloader from "../preloader/js/preloader";
import PNotify from 'pnotify/dist/es/PNotify';

export default {
  refsearch: {
    form: document.getElementById("search_bar"),
    input: document.getElementById("search_input"),
    inputDesktop: document.getElementById("search_input-desktop"),
    btn: document.getElementById("search_button-search"),
    list: document.getElementById("search_list"),
    clear: document.getElementById("btn_refresh"),
    clearDesktop: document.getElementById("btn_refresh-desktop"),
    radioBlock: document.getElementById("search_radio-block"),
    catList: document.getElementById("category__list"),
    mainTable: document.querySelector(".category-favorite_list"),
    ListCategorySearch: null,
    catListDesktop: document.getElementById("category__list-desktop"),
    mainTable: document.querySelector(".category-favorite_list"),
    searchBarMobile: document.getElementById("search-bar-mobile"),
    searchBarDesktop: document.getElementById("search-bar-desktop")
  },

  async renderSearchBarForm() {
    const insideSearchBarHTMLcode = ` 
    <form class="search-bar__form" action="" id="search_bar">
<input class="search-bar__input" type="search" id="search_input" placeholder="Я ищу ..."
  autocomplete="off" />
<input class="search-bar__button" type="submit" value="" id="search_button-search" />
</form> `;
    if (window.innerWidth < 1200) {
      searchBar.refsearch.searchBarMobile.innerHTML = insideSearchBarHTMLcode;
      
    } else {
      searchBar.refsearch.searchBarDesktop.innerHTML = insideSearchBarHTMLcode;
    }
  },

  async getBoardCategories() {
    // Получаем от сервера все категории и отрисовываем их на главной странице
    const allCategories = await services.getAllAds();
    searchBar.refsearch.ListCategorySearch = allCategories;
    searchBar.refsearch.catList.innerHTML = "";
    searchBar.refsearch.catListDesktop.innerHTML = "";
    allCategories.categories.map(el => {
      if (window.innerWidth < 1200) {
        searchBar.refsearch.catList.insertAdjacentHTML(
          "beforeend",
          ` <li class="category__list-item">
          <input class="category__list-item-radio visually-hidden" type="radio" id="${el._id}" name="checkCategory" >
          <label class="category__list-item-label" for="${el._id}">${el.category}</label>
          </li> `
        );
      } else {
        searchBar.refsearch.catListDesktop.insertAdjacentHTML(
          "beforeend",
          ` <li class="category__list-item">
          <input class="category__list-item-radio visually-hidden" type="radio" id="${el._id}" name="checkCategory" >
          <label class="category__list-item-label" for="${el._id}">${el.category}</label>
          </li> `
        );
      }
    });
  },

  async getSearchResult(e) {  
    // Делаем проверку, есть ли активный чекбокс. Если нет - ищем по всем
    // объявлениям. Если есть - определяем id категории и ищем по ней
    e.preventDefault();

    if(document.querySelector("#search_input").value<1){ 
      PNotify.error({
      title: 'Oops!',
      text: 'You need enter your search title'})
      setTimeout(closePhotyfy,1000);
      function closePhotyfy(){
      PNotify.closeAll()}
       }
      else
      {
    showPreloader.show();
    document.querySelector("#menu__toggle").checked = false;
    if (e.target.classList == "search-bar__form") {
      const radioButtons = document.querySelectorAll(
        ".category__list-item-radio"
      );
      let flag = true;
      let idCatogory = null;
      let count = [];
      for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
          idCatogory = radioButtons[i].id;
          flag = false;
        }
      }
      // Реализация поиска по ключевому слову среди всех объявлений
      async function searchByAllAds() {
        const allAds = await services.getAdsLimit(10, 1);
        const adsArray = allAds.data.ads.docs;
        const filterArr = [];
        searchBar.refsearch.mainTable.style.display = "none";
        const inputValue = document
          .querySelector("#search_input")
          .value.toLowerCase();
        adsArray.filter(el => {
          const titleName = el.title.toLowerCase();
          if (titleName.includes(inputValue)) {
           filterArr.push(el);
          }
        });
        console.log(filterArr);
        if(filterArr.length>0){
           searchBar.refsearch.list.insertAdjacentHTML(
            "beforeend",
            createSearchElement(filterArr)
          );}else{
            searchBar.refsearch.list.innerHTML=`<p class="searchNotFound">По вашему запросу ничего не найдено!</p>
            <button class="button-popularAll btnRefreshSearch" id="searchBackToMain">Вернутся на главную страницу.</button>`
          }
        showPreloader.hide();
      }

      function createSearchElement(el) {
        return SearchHBS(el);
      }
      // реализация поиска по ключевому слову в выбранной категории
      const searchByCategories = async () => {
        const allAds = await services.getAdsByCategory(idCatogory, 100);
        const allTitles = allAds.data.ads.docs;
        const inputValue = document
          .querySelector("#search_input")
          .value.toLowerCase();
        allTitles.map(el => {
          searchBar.refsearch.mainTable.style.display = "none";
          const titleName = el.title.toLowerCase();
          if (titleName.includes(inputValue)) {
            searchBar.refsearch.list.insertAdjacentHTML(
              "beforeend",
              createSearchElement(el)
            );
          }
        });
        // searchBar.refsearch.btn.disabled = false;
        showPreloader.hide();
      };
      if (flag) {
        // начинаем поиск по всем категориям
        searchByAllAds();
      } else {
        // начинаем поиск по выбранной категории
        searchByCategories();
      }
    }}
  },

  // Очищаем результаты поиска и деактивируем чекбоксы
  async clearSearchResult(e){
    e.preventDefault();
    const deActivateRadioBtn = document.getElementsByName("checkCategory");
    deActivateRadioBtn.forEach(el => (el.checked = false));
    const searchBarInput = document.getElementById("search_input");
    searchBarInput.value = "";
    searchBar.refsearch.list.innerHTML = "";
  }
}

// refsearch.checkboxCategory = searchBar.getBoardCategories()
