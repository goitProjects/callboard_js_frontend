import services from "../../services";

export const searchByAllAds = async () => {
  const refs = {
    form: document.getElementById("search_form"),
    input: document.getElementById("search_input"),
    btn: document.getElementById("search_button"),
    list: document.getElementById("search_list")
  };

  const getAllAds = await services.getAllAds();
  const quantityAllAds = getAllAds.totalDocs;

  const allAds = await services.getAdsLimit(10, 1);
  const allTitles = allAds.data.ads.docs;

  refs.form.addEventListener("submit", getSearchResult);

  function getSearchResult(e) {
    e.preventDefault();
    refs.list.innerHTML = "";
    filterSearchResult();
  }

  function filterSearchResult() {
    allTitles.filter(el => {
      const titleName = el.title.toLowerCase();
      const inputValue = refs.input.value;

      if (titleName.includes(inputValue)) {
        const newLi = document.createElement("li");
        newLi.className = "search_list-item";
        newLi.dataset.id = el._id;
        refs.list.appendChild(newLi);
        newLi.insertAdjacentHTML("beforeend", el.title);
      }
    });
  }
};

// searchByAllAds();

export const searchByCategories = async () => {
  const refs = {
    form: document.getElementById("search_form"),
    input: document.getElementById("search_input"),
    btn: document.getElementById("search_button"),
    list: document.getElementById("search_list")
  };

  const getAllAds = await services.getAllAds();
  const quantityAllAds = getAllAds.totalDocs;

  // ---------------- checkbox ---------------
  const name = "checkCategory";
  const findChecked = document.querySelector(
    'input[name="' + name + '"]:checked'
  );
  const checkedCategory = Number(findChecked.id);

  // ------------------------------

  const allAds = await services.getAdsByCategory(checkedCategory, 10);
  const allTitles = allAds.data.ads.docs;

  refs.form.addEventListener("submit", getSearchResult);

  function getSearchResult(e) {
    e.preventDefault();
    refs.list.innerHTML = "";
    filterSearchResult();
  }

  function filterSearchResult() {
    allTitles.map(el => {
      const titleName = el.title.toLowerCase();
      const inputValue = "title";

      if (titleName.includes(inputValue) && checkedCategory === el.category) {
        const newLi = document.createElement("li");
        newLi.className = "search_list-item";
        newLi.dataset.id = el._id;
        refs.list.appendChild(newLi);
        newLi.insertAdjacentHTML("beforeend", el.title);
      }
    });
  }
};

searchByCategories();
