import services from "../../services";

export default {
  async getBoardCategories() {
    // Получаем от сервера все категории и отрисовываем их на главной странице

    console.log("Начинаю загрузку категорий");
    const allCategories = await services.getAllAds();

    allCategories.categories.map(el => {
      services.srch.form.insertAdjacentHTML(
        "beforeend",
        `<input type="radio" id="${el._id}" name="checkCategory" >`
      );
      services.srch.form.insertAdjacentHTML(
        "beforeend",
        `<label for="${el._id}">${el.category}</label>`
      );
    });

    console.log("Категории загружены");
  },

  async getSearchResult(e) {
    // Делаем проверку, есть ли активный чекбокс. Если нет - ищем по всем
    // объявлениям. Если есть - определяем id категории и ищем по ней

    e.preventDefault();
    services.srch.btn.disabled = true;
    services.srch.list.innerHTML = "";
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

    const searchByAllAds = async () => {
      // Реализация поиска по ключевому слову среди всех объявлений

      const allAds = await services.getAdsLimit(999, 1);
      const adsArray = allAds.data.ads.docs;

      adsArray.filter(el => {
        const titleName = el.title.toLowerCase();
        const inputValue = services.srch.input.value;
        if (titleName.includes(inputValue)) {
          const newLi = document.createElement("li");
          newLi.className = "search_list-item";
          newLi.dataset.id = el._id;
          services.srch.list.appendChild(newLi);
          newLi.insertAdjacentHTML("beforeend", el.title);
          count.push(el);
        }
      });
      services.srch.btn.disabled = false;
      services.srch.list.insertAdjacentHTML("beforebegin", `Результат поиска: ${count.length} совпадений`)
      console.log('Результат поиска: ', count.length, ' совпадений');
    };

    const searchByCategories = async () => {
      // реализация поиска по ключевому слову в выбранной категории

      console.log("Начинаю выполение поиска по выбранной категории");
      const allAds = await services.getAdsByCategory(idCatogory, 150);
      const allTitles = allAds.data.ads.docs;
      let count = [];

      allTitles.map(el => {
        const titleName = el.title.toLowerCase();

        if (titleName.includes(inputValue) && checkedCategory === el.category) {
          const newLi = document.createElement("li");
          newLi.className = "search_list-item";
          newLi.dataset.id = el._id;
          refs.list.appendChild(newLi);
          newLi.insertAdjacentHTML("beforeend", el.title);
          count.push(el);
          console.log('Результат поиска: ', count)
        }
      });
      console.log('Результат поиска: ', count.length, ' совпадений');
      services.srch.btn.disabled = false;
    };

    if (flag) {
      // начинаем поиск по всем категориям
      searchByAllAds();
    } else if (flag) {
      // начинаем поиск по выбранной категории
      searchByCategories();
    }
  },

  async clearSearchResult() {
    // Очищаем результаты поиска и деактивируем чекбоксы
    const deActivateRadioBtn = document.getElementsByName('checkCategory');
    deActivateRadioBtn.checked = false;
  }
};
