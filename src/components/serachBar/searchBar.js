import services from "../../services";
import searchBar from ".";

export default {
  refs: {
    form: document.getElementById("search_form"),
    input: document.getElementById("search_input"),
    btn: document.getElementById("search_button"),
    list: document.getElementById("search_list"),
    clear: document.getElementById("search_clear"),
    radioBlock: document.getElementById("search_radio-block")
  },

  async getBoardCategories() {
    // Получаем от сервера все категории и отрисовываем их на главной странице

    const allCategories = await services.getAllAds();

    allCategories.categories.map(el => {
      this.refs.radioBlock.insertAdjacentHTML(
        "beforeend",
        `<input class="search_radio" type="radio" id="${el._id}" name="checkCategory" >`
      );
      this.refs.radioBlock.insertAdjacentHTML(
        "beforeend",
        `<label class="search_label" for="${el._id}">${el.category}</label>`
      );
    });
    console.log(this.refs.form);
  },

  async getSearchResult(e) {
    // Делаем проверку, есть ли активный чекбокс. Если нет - ищем по всем
    // объявлениям. Если есть - определяем id категории и ищем по ней

    e.preventDefault();
    this.refs.btn.disabled = true;
    this.refs.list.innerHTML = "";
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
      const allAds = await services.getAdsLimit(999, 1);
      const adsArray = allAds.data.ads.docs;

      adsArray.filter(el => {
        const titleName = el.title.toLowerCase();
        const inputValue = this.refs.input.value;
        if (titleName.includes(inputValue)) {
          const newLi = document.createElement("li");
          newLi.className = "search_list-item";
          newLi.dataset.id = el._id;
          this.refs.list.appendChild(newLi);
          newLi.insertAdjacentHTML("beforeend", el.title);
          count.push(el);
        }
      });
      this.refs.btn.disabled = false;
    };

    // реализация поиска по ключевому слову в выбранной категории
    const searchByCategories = async () => {
      const allAds = await services.getAdsByCategory(idCatogory, 150);
      const allTitles = allAds.data.ads.docs;

      allTitles.map(el => {
        const titleName = el.title.toLowerCase();

        if (titleName.includes(inputValue) && checkedCategory === el.category) {
          const newLi = document.createElement("li");
          newLi.className = "search_list-item";
          newLi.dataset.id = el._id;
          refs.list.appendChild(newLi);
          newLi.insertAdjacentHTML("beforeend", el.title);
          count.push(el);
        }
      });
      this.refs.btn.disabled = false;
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
    searchBar.refs.input.value = "";
    searchBar.refs.list.innerHTML = "";
  }
};