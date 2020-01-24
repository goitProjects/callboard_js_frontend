import services from "../../services";
import searchBar from ".";
import SearchHBS from "./search.hbs";
import showPreloader from "../preloader/js/preloader";


export default {
  refsearch: {
    form: document.getElementById("search_bar"),
    input: document.getElementById("search_input"),
    btn: document.getElementById("search_button-search"),
    list: document.getElementById("search_list"),
    clear: document.getElementById("btn_refresh"),
    radioBlock: document.getElementById("search_radio-block"),
    catList: document.getElementById("category__list"),
    mainTable: document.querySelector(".category-favorite_list"),
    ListCategorySearch: null,
  },

  async getBoardCategories() {
    // Получаем от сервера все категории и отрисовываем их на главной странице
    const allCategories = await services.getAllAds();
    searchBar.refsearch.ListCategorySearch= allCategories
    allCategories.categories.map(el => {
      searchBar.refsearch.catList.insertAdjacentHTML(
        "beforeend",
        ` <li class="category__list-item">
        <input class="category__list-item-radio visually-hidden" type="radio" id="${el._id}" name="checkCategory" >
        <label class="category__list-item-label" for="${el._id}">${el.category}</label>
        </li> `
      );
    });
  },

  async getSearchResult(e) {
    // Делаем проверку, есть ли активный чекбокс. Если нет - ищем по всем
    // объявлениям. Если есть - определяем id категории и ищем по ней
    e.preventDefault();
    searchBar.refsearch.btn.disabled = true;
    showPreloader.show();
    const radioButtons = document.getElementsByName("checkCategory");
    let flag = false;
    let idCatogory = null;
    let count = [];

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
        const inputValue = searchBar.refsearch.input.value.toLowerCase();
        if (titleName.includes(inputValue)) {
          searchBar.refsearch.list.insertAdjacentHTML(
            "beforeend",
            createSearchElement(el)
          );
          // const newLi = document.createElement("li");
          // newLi.className = "search_list-item";
          // newLi.dataset.id = el._id;
          // searchBar.refsearch.list.appendChild(newLi);
          // newLi.insertAdjacentHTML("beforeend", el.title);
          // count.push(el);
        }
      });
      showPreloader.hide();
      searchBar.refsearch.btn.disabled = false;
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
          console.log(el);
          console.log(createSearchElement(el));
          searchBar.refsearch.list.insertAdjacentHTML(
            "beforeend",
            createSearchElement(el)
          );
          // const newLi = document.createElement("li");
          // newLi.className = "search_list-item";
          // newLi.dataset.id = el._id;
          // refsearch.list.appendChild(newLi);
          // newLi.insertAdjacentHTML("beforeend", el.title);
          // count.push(el);
        }
      });
      showPreloader.hide();
      searchBar.refsearch.btn.disabled = false;
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
