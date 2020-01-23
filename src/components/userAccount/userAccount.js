import services from "../../services";
// import axios from "axios";
import fav from "./favorites.json";
import adds from "./ads.json";
import favHbs from "./userAccount_fav.hbs";
import addsHbs from "./userAccount_add.hbs";

// console.log(favHbs);
// console.log(addsHbs);
// console.log(fav);
// console.log(adds);

function invokeFavorites() {
  document
    .querySelector(".user__acc-fav-section")
    .insertAdjacentHTML("beforeend", favHbs(fav));
  //   return favHbs(fav);
}
invokeFavorites();
// console.log(invokeFavorites());

function invokeAdvertisements() {
  document
    .querySelector(".user__acc-myadd-section")
    .insertAdjacentHTML("beforeend", addsHbs(adds));
  //   return addsHbs(adds);
}
invokeAdvertisements();
// console.log(invokeAdvertisements());

const refs = {
  listOfFavourites: document.querySelector(".user__acc-fav-section"),
  listOfAdvertisments: document.querySelector(".user__acc-myadd-section"),

  overlayLogin: document.querySelector(".auth-modal-overlay-login"),
  overlayRegister: document.querySelector(".auth-modal-overlay-register"),
  authModalLogin: document.querySelector(".auth-modal-login"),
  authModalRegister: document.querySelector(".auth-modal-register"),
  authModalRegister: document.querySelector(".auth-modal-register")
};
services.refs.btnAddPromo.addEventListener("click", showLoginModal);
// refs.authModalLogin.addEventListener("click", login);

function showLoginModal(e) {
  refs.overlayLogin.classList.remove("hide");
  refs.overlayLogin.classList.add("show");
}

// services.refs.buttonReg.addEventListener("click", showRegisterModal);
// refs.authModalRegister.addEventListener("click", register);
// refs.authModalLogin.addEventListener("click", registerFromModal);

// services.refs.logout.addEventListener("click", logoutFromAcc);
// refs.overlayLogin.addEventListener("click", closeModal);
// refs.overlayRegister.addEventListener("click", closeModal);

// Логин пользователя
// const accout = { email: "em@ss.ua", password: "111111"};
// const fasdfa =  services.postLoginUser(accout).then(console.log)

// --------------------------- favorites ------------
// получение favorites:  axios.get(`https://dashads.goit.co.ua/api/user/favorites, {
// headers: { Authorization: token }})

// запись favorites: axios.put(`https://dashads.goit.co.ua/api/user/favorite/${id}`, {
//         headers: { Authorization: token }
//       });

// удаление favorites: axios.delete(`https://dashads.goit.co.ua/api/user/favorite/${id}`, {
//         headers: { Authorization: token }
//       });

// ---------------------------  получение своих обьявлений user ------------

// получение all ads: axios.get(`https://dashads.goit.co.ua/ads`, {
//         headers: { Authorization: token }
//       })

// const tokenAcc = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjViZWE2MmFhNzhiNjUxNzdmZjUwMCIsImlhdCI6MTU3OTc3NTA0OH0.KFJUoWxQ9uuIQQElIw2wp7QCgT4f-LGeaVEovEyPaiU';

// const test =  axios.get(`https://dashads.goit.co.ua/api/user/favorites/{headers:{Authorization: ${tokenAcc} }}`).then(console.log)
