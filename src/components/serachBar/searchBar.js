import services from "../../services";
import searchBar from ".";
import SearchHBS from "./search.hbs";
import showPreloader from "../preloader/js/preloader";


export default {
  refsearch: {
    form: document.getElementById("search_bar"),
    // input: document.getElementById("search_input"),
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
    searchBar.refsearch.ListCategorySearch= allCategories
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

    const searchBarInput = document.getElementById("search_input");

    e.preventDefault();
    // searchBar.refsearch.btn.disabled = true;
    searchBar.refsearch.list.innerHTML = "";
    const radioButtons = document.getElementsByName("checkCategory");
    let flag = false;
    let idCatogory = null;

    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        idCatogory = i;
        flag = false;
      } else {
        flag = true;
      }
    }

    // Реализация поиска по ключевому слову среди всех объявлений
    const searchByAllAds = async () => {
      const allAds = await services.getAdsLimit(10, 1);
      const adsArray = allAds.data.ads.docs;
      searchBar.refsearch.mainTable.style.display = "none";
      adsArray.filter(el => {
        const titleName = el.title.toLowerCase();
        const inputValue = searchBarInput.value;
        if (titleName.includes(inputValue)) {
          // const liAdd = itemHBS(el);
          // searchBar.refsearch.list.insertAdjacentHTML("beforeend", liAdd)
          const newLi = document.createElement("li");
          newLi.className = "search_list-item";
          newLi.dataset.id = el._id;
          searchBar.refsearch.list.appendChild(newLi);
          newLi.insertAdjacentHTML("beforeend", el.title);
        }
      });
      // searchBar.refsearch.btn.disabled = false;
  
    };

    function createSearchElement(el) {
      return SearchHBS(el);
    }
    // реализация поиска по ключевому слову в выбранной категории
    const searchByCategories = async () => {
      const allAds = await services.getAdsByCategory(idCatogory, 150);
      const allTitles = allAds.data.ads.docs;
      allTitles.map(el => {
        const titleName = el.title.toLowerCase();
        searchBar.refsearch.mainTable.style.display = "none";
        if (titleName.includes(inputValue) && checkedCategory === el.category) {
          const newLi = document.createElement("li");
          newLi.className = "search_list-item";
          newLi.dataset.id = el._id;
          refsearch.list.appendChild(newLi);
          newLi.insertAdjacentHTML("beforeend", el.title);
        }
      });
      // searchBar.refsearch.btn.disabled = false;
    };

    if (flag) {
      // начинаем поиск по всем категориям
      searchByAllAds();
    } else if (flag) {
      // начинаем поиск по выбранной категории
      searchByCategories();
    }
  },

  // Очищаем результаты поиска и деактивируем чекбоксы
  async clearSearchResult(e) {
    e.preventDefault();
    const deActivateRadioBtn = document.getElementsByName("checkCategory");
    deActivateRadioBtn.forEach(el => (el.checked = false));
    searchBar.refsearch.input.value = "";
    searchBar.refsearch.list.innerHTML = "";
  }
};
// refsearch.checkboxCategory = searchBar.getBoardCategories()
