import axios from "axios";
axios.defaults.baseURL = "https://dashads.goit.co.ua";

export default {
  image: [],
  getImage(img){
   return this.image = img
  },
  userData: null,
  token: null,
  ads: null,
  favorites: null,
  isAuth: false,
  categories: null,
  
  async getAllAds() {
    // Получить все объявления
    // services.getAllAds().then(console.log)

    try {
      const data = await axios.get("/api/v1/ads/all");
      return data.data.ads;
    } catch (e) {
      throw e;
    }
  },

  async getUserAds(id) {
    // Получить все объявления пользователя
    // services.getUserAds('5e05dcdf553b9a09a2923408').then(console.log)

    try {
      const data = await axios.get(`/api/v1/ads/${id}`);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async getNextPageInCategory(catId, page) {
    // Получить объявления следующей страницы
    // services.getNextPageInCategory(1, 2).then(console.log)

    try {
      const data = await axios.get(
        `/api/v1/ads//all?category=${catId}&page=${page}`
      );
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async getAdsLimit(limit, page) {
    // Изменить лимит количества объявлений на одной странице
    // services.getAdsLimit(20, 1).then(console.log)
    try {
      const data = await axios.get(
        `/api/v1/ads/all?limit=${limit}&page=${page}`
      );
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async getAdsByCategory(categoryId, limit) {
    // Получить объявления выбранной категории
    // services.getAdsByCategory(2).then(console.log)

    try {
      const data = await axios.get(`/api/v1/ads//all?category=${categoryId}&limit=${limit}`);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async postRegisterNewUser(user) {
    // Регистрация нового пользователя
    // services.postRegisterNewUser({ email: "em@ss.ua", password: "111111", name: "Ted"}).then(console.log)

    try {
      const data = await axios.post("/api/v1/auth/register", user);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async postLoginUser(user) {
    // Логин пользователя
    // services.postLoginUser({ email: "em@ss.ua", password: "111111"}).then(console.log)

    try {
      const data = await axios.post("/api/v1/auth/login", user);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async postLogoutUser() {
    // Логаут пользователя
    // services.postLogoutUser({ email: "em@ss.ua", password: "111111"},{headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjViZWE2MmFhNzhiNjUxNzdmZjUwMCIsImlhdCI6MTU3OTUzMjcyN30.b8ReEjHn-KbHsls0cvm8GauQOr6sEqqcjZxD1KfqtzI"}}).then(console.log)

    try {
      const data = await axios.post("/api/v1/auth/logout", { headers: { Authorization: this.token } });
      console.log('logout', data)
      // return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async postAddNewAd(adsData, opt) {
    // Добавить новое объявление
    // services
    //   .postAddNewAd(
    //     {
    //         images: [],
    //         title: "Title",
    //         category: 1,
    //         price: 1000,
    //         phone: "+380000000000",
    //         description: "Lorem Ipsum pooooooop of the printing and typesetting"
    //     },
    //     {
    //       headers: {
    //         Authorization:
    //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjViZWE2MmFhNzhiNjUxNzdmZjUwMCIsImlhdCI6MTU3OTUzNDkzOX0._ZUC5CkNlmkqFcADbOMECx65yUCYCLNUwV37Q36466k"
    //       }
    //     }
    //   )
    //   .then(console.log);

    try {
      const data = await axios.post("/api/v1/ads", adsData, opt);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async deleteAdById(id, opt) {
    // Удалить текущее объявление
    // services.deleteAdById("5e25cdd58b632d7de6b49b6e", { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjViZWE2MmFhNzhiNjUxNzdmZjUwMCIsImlhdCI6MTU3OTUzNTgwNH0.yiMB3n6pM5u2W_AsBVtXHQOk8EyZh831Y1Gncw_6vfg" }}).then(console.log)

    try {
      const data = await axios.delete(`/api/v1/ads/${id}`, opt);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  ref:{
    btntabletFilter: document.querySelector(".tablet-filter"),
    btnSearch: document.querySelector(".tablet-filter"),
    buttonReg: document.querySelector(".registration-button"),
    buttonLogin: document.querySelector(".registration-enter"),
    logout: document.querySelector('.exit'),
    imgLogo: document.querySelector(".logo"),
    navForm: document.querySelector(".navigation-form"),
    tabletFilter: document.querySelector(".tablet-filter"),
    btnAddPromo: document.querySelector(".navigation-promo"),
    filterUl: document.querySelector(".navigation-filter__list"),
    mainCatalog: document.querySelector(".mainBord"),
    popularItem: document.querySelector(".products-collection-popular-list"),
    computerCategory: document.querySelector(".products-collection-computer-list"),
    pastimeCategory: document.querySelector(".products-collection-pastime-list"),
    exchangeCategory: document.querySelector(".products-collection-exchange-list"),
    // transportCategory: document.querySelector(".products-collection-transport-list"),
    // businessCategory: document.querySelector(".products-collection-business-list"),
    // workCategory: document.querySelector(".products-collection-work-list"),
    // realEstateCategory: document.querySelector(".products-collection-realestate-list"),
    // freeCategory: document.querySelector(".products-collection-giveFree-list"),

  }
  // addCategory(){

  // },
  // deleteElem(){

  // }
};


